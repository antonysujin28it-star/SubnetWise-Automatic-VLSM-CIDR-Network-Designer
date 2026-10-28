/**
 * SubnetWise — Network Validation Engine
 * Exhaustively checks input validity, subnet boundaries, overlaps,
 * base network containment, gateway sanity, and edge cases.
 */

const {
  ipToInt,
  intToIp,
  isValidIp,
  isValidCidr,
  cidrToMaskInt,
  calculateSubnetDetails
} = require('./ipv4');

/**
 * Validate a network design specification and its calculated subnets.
 * Returns an array of diagnostic items with status: 'valid' | 'warning' | 'error'
 */
function validateNetworkDesign(baseIp, baseCidr, requirements, calculatedResult = null) {
  const diagnostics = [];

  // 1. Validate Base IP Format
  if (!baseIp || typeof baseIp !== 'string' || !isValidIp(baseIp)) {
    diagnostics.push({
      id: 'base-ip-format',
      type: 'error',
      title: 'Invalid Base IPv4 Address',
      message: `The address "${baseIp || ''}" is not a valid dotted-decimal IPv4 address (e.g. 192.168.10.0). Each octet must be between 0 and 255.`,
      field: 'baseIp'
    });
    return {
      isValid: false,
      hasErrors: true,
      hasWarnings: false,
      diagnostics
    };
  }

  // 2. Validate Base CIDR
  const cidrNum = Number(baseCidr);
  if (!isValidCidr(cidrNum)) {
    diagnostics.push({
      id: 'base-cidr-range',
      type: 'error',
      title: 'Invalid CIDR Prefix',
      message: `CIDR prefix /${baseCidr} is invalid. Supported CIDR prefix length is from /8 to /30.`,
      field: 'baseCidr'
    });
    return {
      isValid: false,
      hasErrors: true,
      hasWarnings: false,
      diagnostics
    };
  }

  // 3. Base Subnet Boundary Check
  const baseDetails = calculateSubnetDetails(baseIp, cidrNum);
  if (baseIp.trim() !== baseDetails.network) {
    diagnostics.push({
      id: 'base-ip-boundary-warning',
      type: 'warning',
      title: 'Base IP is a Host Address, Not a Network Boundary',
      message: `The entered IP "${baseIp}" is inside network ${baseDetails.network}/${cidrNum}. The network boundary has been automatically aligned to ${baseDetails.network}.`,
      field: 'baseIp'
    });
  } else {
    diagnostics.push({
      id: 'base-ip-boundary-valid',
      type: 'valid',
      title: 'Valid Base Network Boundary',
      message: `Base network ${baseDetails.network}/${cidrNum} is a correctly aligned network address with ${baseDetails.totalAddresses} total addresses (${baseDetails.usableHosts} usable).`
    });
  }

  // 4. Requirements presence and count
  if (!requirements || !Array.isArray(requirements) || requirements.length === 0) {
    diagnostics.push({
      id: 'reqs-empty',
      type: 'error',
      title: 'No Network Requirements Defined',
      message: 'You must specify at least one department or network requirement to calculate a VLSM allocation.'
    });
    return {
      isValid: false,
      hasErrors: true,
      hasWarnings: diagnostics.some(d => d.type === 'warning'),
      diagnostics
    };
  }

  if (requirements.length > 50) {
    diagnostics.push({
      id: 'reqs-max-exceeded',
      type: 'error',
      title: 'Maximum Requirements Exceeded',
      message: `You entered ${requirements.length} requirements. The maximum allowed is 50.`
    });
  }

  // 5. Duplicate requirement names
  const nameMap = new Map();
  for (let i = 0; i < requirements.length; i++) {
    const r = requirements[i];
    const rawName = (r.name || '').trim();
    if (!rawName) {
      diagnostics.push({
        id: `req-name-empty-${i}`,
        type: 'error',
        title: `Unnamed Requirement #${i + 1}`,
        message: `Requirement row #${i + 1} does not have a department/subnet name.`
      });
    } else {
      const lower = rawName.toLowerCase();
      if (nameMap.has(lower)) {
        diagnostics.push({
          id: `req-name-duplicate-${i}`,
          type: 'warning',
          title: `Duplicate Department Name: "${rawName}"`,
          message: `Multiple requirements share the name "${rawName}". Distinct names are recommended to avoid confusion in routing tables.`
        });
      } else {
        nameMap.set(lower, true);
      }
    }

    // 6. Host requirements validation
    const hosts = Number(r.requiredHosts);
    if (isNaN(hosts) || hosts < 1) {
      diagnostics.push({
        id: `req-hosts-invalid-${i}`,
        type: 'error',
        title: `Invalid Host Count for "${r.name || 'Row ' + (i + 1)}"`,
        message: `Required host count must be a positive integer >= 1 (got: ${r.requiredHosts}).`
      });
    } else if (hosts > baseDetails.usableHosts) {
      diagnostics.push({
        id: `req-hosts-oversized-${i}`,
        type: 'error',
        title: `Requirement Exceeds Entire Network Capacity`,
        message: `"${r.name}" requires ${hosts} hosts, but the entire base network ${baseDetails.network}/${cidrNum} only provides ${baseDetails.usableHosts} usable hosts.`
      });
    }
  }

  // If calculation failed or has overflow
  if (calculatedResult) {
    if (!calculatedResult.success && calculatedResult.hasOverflow) {
      diagnostics.push({
        id: 'network-overflow',
        type: 'error',
        title: 'Insufficient Address Space (Network Overflow)',
        message: calculatedResult.error || `Total requested hosts exceed base network capacity by ${calculatedResult.totalShortfall || 'multiple'} addresses.`
      });
    }

    if (calculatedResult.subnets && calculatedResult.subnets.length > 0) {
      const subnets = calculatedResult.subnets;

      // 7. Check Subnets Inside Base Network
      const baseNetInt = baseDetails.networkInt;
      const baseBcastInt = baseDetails.broadcastInt;

      let allInside = true;
      for (const sub of subnets) {
        if (sub.networkInt < baseNetInt || sub.broadcastInt > baseBcastInt) {
          allInside = false;
          diagnostics.push({
            id: `subnet-outside-base-${sub.id}`,
            type: 'error',
            title: `Subnet "${sub.name}" Lies Outside Base Network`,
            message: `Subnet ${sub.network}/${sub.cidr} (${sub.network} - ${sub.broadcast}) falls outside base network ${baseDetails.network}/${cidrNum}.`
          });
        }
      }
      if (allInside) {
        diagnostics.push({
          id: 'subnets-containment-valid',
          type: 'valid',
          title: 'Base Network Containment Verified',
          message: `All ${subnets.length} subnets are strictly contained within base network range ${baseDetails.network} - ${baseDetails.broadcast}.`
        });
      }

      // 8. Check Overlapping Subnets
      let overlapFound = false;
      for (let i = 0; i < subnets.length; i++) {
        for (let j = i + 1; j < subnets.length; j++) {
          const s1 = subnets[i];
          const s2 = subnets[j];
          if (!(s1.broadcastInt < s2.networkInt || s2.broadcastInt < s1.networkInt)) {
            overlapFound = true;
            diagnostics.push({
              id: `overlap-${s1.id}-${s2.id}`,
              type: 'error',
              title: `Overlapping Subnets Detected`,
              message: `Subnet "${s1.name}" (${s1.network}/${s1.cidr}) overlaps with "${s2.name}" (${s2.network}/${s2.cidr}).`
            });
          }
        }
      }
      if (!overlapFound) {
        diagnostics.push({
          id: 'subnets-overlap-valid',
          type: 'valid',
          title: 'No Overlapping Subnets',
          message: 'Zero collisions: Every allocated subnet occupies a mutually exclusive range of IPv4 addresses.'
        });
      }

      // 9. Check Subnet Boundary Alignment
      let boundaryError = false;
      for (const sub of subnets) {
        if (sub.networkInt % sub.totalAddresses !== 0) {
          boundaryError = true;
          diagnostics.push({
            id: `boundary-alignment-${sub.id}`,
            type: 'error',
            title: `Subnet Boundary Misalignment in "${sub.name}"`,
            message: `Subnet ${sub.network}/${sub.cidr} is not aligned to a multiple of its block size (${sub.totalAddresses}).`
          });
        }
      }
      if (!boundaryError) {
        diagnostics.push({
          id: 'subnets-boundary-valid',
          type: 'valid',
          title: 'Strict Subnet Boundary Alignment',
          message: 'All generated subnets adhere to strict binary power-of-two address boundaries.'
        });
      }

      // 10. Check Gateway Sanity
      let gatewayErrors = false;
      for (const sub of subnets) {
        const gw = sub.gateway;
        if (gw) {
          if (!isValidIp(gw)) {
            gatewayErrors = true;
            diagnostics.push({
              id: `gw-invalid-${sub.id}`,
              type: 'error',
              title: `Invalid Gateway Address for "${sub.name}"`,
              message: `Gateway "${gw}" is not a valid IPv4 address.`
            });
          } else {
            const gwInt = ipToInt(gw);
            if (gwInt === sub.networkInt) {
              gatewayErrors = true;
              diagnostics.push({
                id: `gw-is-network-${sub.id}`,
                type: 'error',
                title: `Gateway Collision with Network Address in "${sub.name}"`,
                message: `Gateway ${gw} cannot be identical to the Subnet Network address (${sub.network}).`
              });
            } else if (gwInt === sub.broadcastInt) {
              gatewayErrors = true;
              diagnostics.push({
                id: `gw-is-broadcast-${sub.id}`,
                type: 'error',
                title: `Gateway Collision with Broadcast Address in "${sub.name}"`,
                message: `Gateway ${gw} cannot be identical to the Subnet Broadcast address (${sub.broadcast}).`
              });
            } else if (gwInt < sub.networkInt || gwInt > sub.broadcastInt) {
              gatewayErrors = true;
              diagnostics.push({
                id: `gw-outside-${sub.id}`,
                type: 'error',
                title: `Gateway Outside Subnet Range in "${sub.name}"`,
                message: `Gateway ${gw} is outside the allocated range for ${sub.name} (${sub.network} - ${sub.broadcast}).`
              });
            }
          }
        }
      }
      if (!gatewayErrors) {
        diagnostics.push({
          id: 'gateway-sanity-valid',
          type: 'valid',
          title: 'Gateway Address Sanity Verified',
          message: 'All configured gateways fall strictly within usable host ranges and do not collide with network or broadcast addresses.'
        });
      }
    }
  }

  const hasErrors = diagnostics.some(d => d.type === 'error');
  const hasWarnings = diagnostics.some(d => d.type === 'warning');

  return {
    isValid: !hasErrors,
    hasErrors,
    hasWarnings,
    summary: hasErrors
      ? 'Validation Failed: Please resolve critical errors before deploying this address plan.'
      : hasWarnings
        ? 'Validation Passed with Warnings: Subnets are mathematically valid, but review advisory notes.'
        : 'All Validation Checks Passed: Addressing plan is completely sound and ready for deployment.',
    diagnostics
  };
}

module.exports = {
  validateNetworkDesign
};
