/**
 * SubnetWise — VLSM Calculation Engine
 * Implements mathematically accurate Variable Length Subnet Masking allocation,
 * subnet boundary alignment, free-space decomposition, and efficiency metrics.
 */

const {
  ipToInt,
  intToIp,
  isValidIp,
  isValidCidr,
  cidrToMask,
  cidrToWildcard,
  calculateSubnetDetails,
  formatBinaryWithSeparator
} = require('./ipv4');

/**
 * Calculate the smallest subnet prefix length capable of accommodating H hosts.
 * Standard IPv4 requires 2 overhead addresses (Network and Broadcast).
 * Usable hosts = 2^b - 2 >= H, where b >= 2 (prefix <= 30).
 */
function getRequiredPrefix(requiredHosts) {
  if (requiredHosts < 1) {
    throw new Error('Host requirement must be at least 1');
  }
  
  // Find host bits b such that (2^b - 2) >= requiredHosts
  let hostBits = 2; // minimum host bits for /30 (2 usable hosts)
  while ((2 ** hostBits - 2) < requiredHosts) {
    hostBits++;
    if (hostBits > 24) {
      throw new Error(`Host requirement ${requiredHosts} exceeds maximum supported subnet size (/8)`);
    }
  }

  const cidr = 32 - hostBits;
  const totalAddresses = 2 ** hostBits;
  const usableHosts = totalAddresses - 2;

  return {
    cidr,
    hostBits,
    totalAddresses,
    usableHosts
  };
}

/**
 * Decompose an arbitrary IP range [startInt, endInt] into standard aligned CIDR blocks.
 */
function decomposeRangeToCidrs(startInt, endInt) {
  const blocks = [];
  let current = startInt;

  while (current <= endInt) {
    const remaining = endInt - current + 1;
    // Find maximum power of 2 that divides current (boundary alignment)
    // and is <= remaining
    let maxBlockSize = 1;
    while (maxBlockSize * 2 <= remaining && (current % (maxBlockSize * 2) === 0)) {
      maxBlockSize *= 2;
    }

    const hostBits = Math.log2(maxBlockSize);
    const cidr = 32 - hostBits;
    const blockEnd = current + maxBlockSize - 1;

    blocks.push({
      network: intToIp(current),
      networkInt: current,
      broadcast: intToIp(blockEnd),
      broadcastInt: blockEnd,
      cidr,
      totalAddresses: maxBlockSize,
      usableHosts: maxBlockSize >= 4 ? maxBlockSize - 2 : 0
    });

    current = blockEnd + 1;
  }

  return blocks;
}

/**
 * Perform VLSM calculation for a given base network and requirements list.
 * 
 * @param {string} baseIp - e.g. "192.168.10.0"
 * @param {number} baseCidr - e.g. 24
 * @param {Array<{id?: string, name: string, requiredHosts: number, priority?: string, description?: string}>} requirements
 * @param {object} options - e.g. { gatewayPosition: 'first' | 'last' }
 */
function calculateVLSM(baseIp, baseCidr, requirements, options = {}) {
  const gatewayPosition = options.gatewayPosition || 'first'; // 'first' or 'last'

  // Validate base network
  if (!isValidIp(baseIp)) {
    return {
      success: false,
      error: `Invalid base IPv4 address: "${baseIp}"`
    };
  }

  const baseCidrNum = Number(baseCidr);
  if (!isValidCidr(baseCidrNum)) {
    return {
      success: false,
      error: `CIDR prefix must be an integer between 8 and 30, got: "${baseCidr}"`
    };
  }

  if (!Array.isArray(requirements) || requirements.length === 0) {
    return {
      success: false,
      error: 'At least one requirement is needed to perform VLSM calculation.'
    };
  }

  if (requirements.length > 50) {
    return {
      success: false,
      error: 'Maximum 50 requirements allowed.'
    };
  }

  // Base network details
  const baseDetails = calculateSubnetDetails(baseIp, baseCidrNum);
  const baseNetworkInt = baseDetails.networkInt;
  const baseBroadcastInt = baseDetails.broadcastInt;
  const baseTotalAddresses = baseDetails.totalAddresses;
  const baseUsableHosts = baseDetails.usableHosts;

  // Validate requirement inputs
  const sanitizedRequirements = [];
  for (let i = 0; i < requirements.length; i++) {
    const req = requirements[i];
    const name = (req.name || `Subnet ${i + 1}`).trim();
    const hosts = Number(req.requiredHosts);
    if (isNaN(hosts) || hosts < 1) {
      return {
        success: false,
        error: `Requirement "${name}" must have at least 1 host.`
      };
    }
    sanitizedRequirements.push({
      id: req.id || `req-${i + 1}`,
      originalIndex: i,
      name,
      requiredHosts: hosts,
      priority: req.priority || 'Medium',
      description: req.description || ''
    });
  }

  // Sort requirements descending by requiredHosts (critical for VLSM optimal packing)
  const sortedRequirements = [...sanitizedRequirements].sort((a, b) => {
    if (b.requiredHosts !== a.requiredHosts) {
      return b.requiredHosts - a.requiredHosts;
    }
    return a.originalIndex - b.originalIndex;
  });

  const subnets = [];
  const freeBlocks = [];
  const visualBlocks = [];
  let currentCursor = baseNetworkInt;
  let hasOverflow = false;
  let overflowReason = null;
  let totalShortfall = 0;

  for (let i = 0; i < sortedRequirements.length; i++) {
    const req = sortedRequirements[i];
    const { cidr, hostBits, totalAddresses, usableHosts } = getRequiredPrefix(req.requiredHosts);

    // Boundary alignment: currentCursor must be a multiple of totalAddresses
    const remainder = currentCursor % totalAddresses;
    if (remainder !== 0) {
      const alignedCursor = currentCursor + (totalAddresses - remainder);
      // The gap created before alignment is free/fragmented space
      const gapSize = alignedCursor - currentCursor;
      const gapBlocks = decomposeRangeToCidrs(currentCursor, alignedCursor - 1);
      for (const gb of gapBlocks) {
        freeBlocks.push({
          ...gb,
          type: 'gap',
          label: 'Unaligned Gap'
        });
        visualBlocks.push({
          type: 'free',
          name: 'Free Space',
          network: gb.network,
          cidr: gb.cidr,
          totalAddresses: gb.totalAddresses,
          percentage: (gb.totalAddresses / baseTotalAddresses) * 100,
          details: `Unallocated gap: ${gb.network}/${gb.cidr} (${gb.totalAddresses} addresses)`
        });
      }
      currentCursor = alignedCursor;
    }

    const subnetNetworkInt = currentCursor;
    const subnetBroadcastInt = subnetNetworkInt + totalAddresses - 1;

    // Check if subnet exceeds base network boundaries
    if (subnetBroadcastInt > baseBroadcastInt) {
      hasOverflow = true;
      const availableRemaining = Math.max(0, baseBroadcastInt - currentCursor + 1);
      const needed = totalAddresses - availableRemaining;
      totalShortfall += needed;

      overflowReason = `Insufficient address space. Subnet "${req.name}" requires ${totalAddresses} addresses (/${cidr}) to satisfy ${req.requiredHosts} hosts, but only ${availableRemaining} addresses remain in base network ${baseDetails.network}/${baseDetails.cidr}.`;
      break;
    }

    const subnetNetwork = intToIp(subnetNetworkInt);
    const subnetBroadcast = intToIp(subnetBroadcastInt);
    const firstHost = intToIp(subnetNetworkInt + 1);
    const lastHost = intToIp(subnetBroadcastInt - 1);
    const gateway = gatewayPosition === 'last' ? lastHost : firstHost;
    const wastedHosts = usableHosts - req.requiredHosts;
    const efficiency = Number(((req.requiredHosts / usableHosts) * 100).toFixed(2));
    const addressEfficiency = Number(((req.requiredHosts / totalAddresses) * 100).toFixed(2));
    const subnetMask = cidrToMask(cidr);
    const wildcardMask = cidrToWildcard(cidr);
    const binaryDetails = formatBinaryWithSeparator(subnetNetwork, cidr);

    const subnetObj = {
      id: `subnet-${i + 1}`,
      requirementId: req.id,
      name: req.name,
      priority: req.priority,
      description: req.description,
      requiredHosts: req.requiredHosts,
      network: subnetNetwork,
      networkInt: subnetNetworkInt,
      cidr,
      subnetMask,
      wildcardMask,
      gateway,
      firstHost,
      lastHost,
      broadcast: subnetBroadcast,
      broadcastInt: subnetBroadcastInt,
      totalAddresses,
      usableHosts,
      wastedHosts,
      efficiency,
      addressEfficiency,
      networkBits: cidr,
      hostBits,
      binary: binaryDetails.rawBinary,
      binaryDetails,
      percentageOfBase: Number(((totalAddresses / baseTotalAddresses) * 100).toFixed(2))
    };

    subnets.push(subnetObj);

    visualBlocks.push({
      type: 'allocated',
      subnetId: subnetObj.id,
      name: req.name,
      network: subnetNetwork,
      cidr,
      broadcast: subnetBroadcast,
      totalAddresses,
      usableHosts,
      requiredHosts: req.requiredHosts,
      percentage: (totalAddresses / baseTotalAddresses) * 100,
      efficiency
    });

    currentCursor = subnetBroadcastInt + 1;
  }

  // If overflow occurred, return structured failure with diagnostics
  if (hasOverflow) {
    const totalRequestedHosts = sortedRequirements.reduce((sum, r) => sum + r.requiredHosts, 0);
    return {
      success: false,
      hasOverflow: true,
      error: overflowReason,
      totalShortfall,
      totalRequestedHosts,
      baseNetworkTotalAddresses: baseTotalAddresses,
      baseNetworkUsableHosts: baseUsableHosts,
      partialSubnets: subnets
    };
  }

  // Decompose remaining unallocated addresses at the end of the base network
  if (currentCursor <= baseBroadcastInt) {
    const remainingDecomposed = decomposeRangeToCidrs(currentCursor, baseBroadcastInt);
    for (const fb of remainingDecomposed) {
      freeBlocks.push({
        ...fb,
        type: 'free',
        label: 'Unused / Free Space'
      });
      visualBlocks.push({
        type: 'free',
        name: 'Unused',
        network: fb.network,
        cidr: fb.cidr,
        totalAddresses: fb.totalAddresses,
        usableHosts: fb.usableHosts,
        percentage: (fb.totalAddresses / baseTotalAddresses) * 100,
        details: `Available block: ${fb.network}/${fb.cidr} (${fb.totalAddresses} total addresses, ${fb.usableHosts} usable)`
      });
    }
  }

  // Aggregate metrics
  const totalRequestedHosts = subnets.reduce((sum, s) => sum + s.requiredHosts, 0);
  const totalAllocatedCapacity = subnets.reduce((sum, s) => sum + s.usableHosts, 0);
  const totalAddressesAllocated = subnets.reduce((sum, s) => sum + s.totalAddresses, 0);
  const totalWastedAddresses = totalAllocatedCapacity - totalRequestedHosts;
  const overallEfficiency = totalAllocatedCapacity > 0
    ? Number(((totalRequestedHosts / totalAllocatedCapacity) * 100).toFixed(1))
    : 0;
  const addressUtilization = Number(((totalAddressesAllocated / baseTotalAddresses) * 100).toFixed(1));
  const freeAddresses = baseTotalAddresses - totalAddressesAllocated;

  // Comparison: VLSM vs Fixed Subnetting
  const maxReq = Math.max(...subnets.map(s => s.requiredHosts));
  const fixedPrefixInfo = getRequiredPrefix(maxReq);
  const fixedAddressesPerSubnet = fixedPrefixInfo.totalAddresses;
  const fixedTotalAddressesNeeded = subnets.length * fixedAddressesPerSubnet;
  const fixedFitsInBase = fixedTotalAddressesNeeded <= baseTotalAddresses;
  const addressesSaved = fixedTotalAddressesNeeded - totalAddressesAllocated;
  const savingsPercent = fixedTotalAddressesNeeded > 0
    ? Number(((addressesSaved / fixedTotalAddressesNeeded) * 100).toFixed(1))
    : 0;

  const comparison = {
    fixedPrefix: fixedPrefixInfo.cidr,
    fixedSubnetMask: cidrToMask(fixedPrefixInfo.cidr),
    fixedAddressesPerSubnet,
    fixedTotalAddressesNeeded,
    fixedFitsInBase,
    vlsmTotalAddressesUsed: totalAddressesAllocated,
    addressesSaved,
    savingsPercent,
    explanation: fixedFitsInBase
      ? `Under fixed-size subnetting, each of the ${subnets.length} departments would be allocated a /${fixedPrefixInfo.cidr} (${fixedAddressesPerSubnet} addresses) to satisfy the largest requirement of ${maxReq} hosts, consuming ${fixedTotalAddressesNeeded} addresses. VLSM dynamically rightsizes masks, saving ${addressesSaved} IP addresses (${savingsPercent}% reduction).`
      : `Under fixed-size subnetting, allocating /${fixedPrefixInfo.cidr} (${fixedAddressesPerSubnet} addresses) for all ${subnets.length} subnets would require ${fixedTotalAddressesNeeded} addresses, which completely overflows the base /${baseCidrNum} network (only ${baseTotalAddresses} addresses). VLSM makes this network feasible by allocating smaller masks where possible.`
  };

  return {
    success: true,
    hasOverflow: false,
    baseNetwork: {
      ip: baseIp,
      cidr: baseCidrNum,
      network: baseDetails.network,
      subnetMask: baseDetails.subnetMask,
      wildcardMask: baseDetails.wildcardMask,
      broadcast: baseDetails.broadcast,
      totalAddresses: baseTotalAddresses,
      usableHosts: baseUsableHosts,
      firstHost: baseDetails.firstHost,
      lastHost: baseDetails.lastHost,
      binary: baseDetails.binary,
      ipClass: baseDetails.ipClass,
      isPrivate: baseDetails.isPrivate
    },
    subnets,
    freeBlocks,
    visualBlocks,
    metrics: {
      subnetsCount: subnets.length,
      totalRequestedHosts,
      totalAllocatedCapacity,
      totalAddressesAllocated,
      totalWastedAddresses,
      overallEfficiency,
      addressUtilization,
      freeAddresses,
      freeAddressesPercent: Number(((freeAddresses / baseTotalAddresses) * 100).toFixed(1))
    },
    comparison
  };
}

module.exports = {
  getRequiredPrefix,
  decomposeRangeToCidrs,
  calculateVLSM
};
