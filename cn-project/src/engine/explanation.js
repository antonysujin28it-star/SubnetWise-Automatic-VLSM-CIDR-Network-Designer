/**
 * SubnetWise — Dynamic Network Design Explanation Engine
 * Generates an educational, technical, step-by-step prose explanation
 * based on the actual calculated numbers. Perfect for lab viva presentations.
 */

function generateNetworkExplanation(calculationResult) {
  if (!calculationResult || !calculationResult.success) {
    if (calculationResult && calculationResult.hasOverflow) {
      return {
        title: 'Network Design Analysis — Overflow Error',
        paragraphs: [
          `The base network provided could not satisfy all requested host allocations.`,
          calculationResult.error,
          `To fix this design, allocate a larger base network (e.g. decrease the CIDR prefix) or reduce the number of requested hosts.`
        ],
        steps: []
      };
    }
    return {
      title: 'No Network Design',
      paragraphs: ['Perform a calculation first to generate an architectural explanation.'],
      steps: []
    };
  }

  const base = calculationResult.baseNetwork;
  const subnets = calculationResult.subnets;
  const metrics = calculationResult.metrics;
  const freeBlocks = calculationResult.freeBlocks;
  const comparison = calculationResult.comparison;

  const paragraphs = [];
  const steps = [];

  // Paragraph 1: Overview
  paragraphs.push(
    `The base network ${base.network}/${base.cidr} provides a contiguous pool of ${base.totalAddresses.toLocaleString()} IPv4 addresses (${base.usableHosts.toLocaleString()} usable hosts after excluding network and broadcast identifiers). To maximize address conservation and prevent routing fragmentation, Variable Length Subnet Masking (VLSM) was applied by sorting all requirements in descending order of requested hosts.`
  );

  // Step-by-step breakdown
  for (let i = 0; i < subnets.length; i++) {
    const s = subnets[i];
    const hostBits = s.hostBits;
    const formulaStr = `2^${hostBits} - 2 = ${s.usableHosts}`;
    const whyBits = `For "${s.name}", ${s.requiredHosts} hosts were requested. We need host bits 'h' such that (2^h - 2) ≥ ${s.requiredHosts}. Here, h = ${hostBits} gives ${formulaStr} usable hosts, corresponding to a /${s.cidr} prefix (Subnet Mask: ${s.subnetMask}).`;
    const boundaryStr = `Starting at address boundary ${s.network}, this block spans from ${s.network} to ${s.broadcast}. The first usable host ${s.firstHost} is designated as the default gateway, and the host range extends up to ${s.lastHost}.`;
    const wasteStr = `With ${s.requiredHosts} required hosts out of ${s.usableHosts} usable capacity, this subnet achieves ${s.efficiency}% host efficiency (${s.wastedHosts} unassigned host addresses reserved for future expansion).`;

    steps.push({
      stepNumber: i + 1,
      name: s.name,
      cidr: `/${s.cidr}`,
      network: s.network,
      broadcast: s.broadcast,
      required: s.requiredHosts,
      usable: s.usableHosts,
      efficiency: `${s.efficiency}%`,
      explanation: `${whyBits} ${boundaryStr} ${wasteStr}`
    });
  }

  // Paragraph 2: Free Space & Address Conservation
  if (freeBlocks.length > 0) {
    const freeTotal = freeBlocks.reduce((sum, f) => sum + f.totalAddresses, 0);
    const freeDesc = freeBlocks.map(f => `${f.network}/${f.cidr} (${f.totalAddresses} addresses)`).join(', ');
    paragraphs.push(
      `Following all allocations, ${freeTotal} addresses (${metrics.freeAddressesPercent}% of the base block) remain available for future subnets across block(s): ${freeDesc}. This demonstrates optimal hierarchical packing with zero overlap and zero address collision.`
    );
  } else {
    paragraphs.push(
      `All available addresses in the base network ${base.network}/${base.cidr} have been allocated across the requested subnets.`
    );
  }

  // Paragraph 3: VLSM vs Fixed Comparison
  if (comparison) {
    paragraphs.push(
      `Efficiency Analysis: Overall network efficiency is ${metrics.overallEfficiency}%, with ${metrics.totalRequestedHosts} active hosts accommodated across ${metrics.totalAllocatedCapacity} usable addresses. Compared to traditional fixed-size subnetting (which would have forced all departments into /${comparison.fixedPrefix} subnets consuming ${comparison.fixedTotalAddressesNeeded} addresses), VLSM saved ${comparison.addressesSaved} IP addresses—an improvement of ${comparison.savingsPercent}%.`
    );
  }

  return {
    title: `VLSM Addressing Architecture — ${base.network}/${base.cidr}`,
    baseNetworkSummary: `${base.network}/${base.cidr} (${base.totalAddresses} total, ${base.usableHosts} usable)`,
    totalSubnets: subnets.length,
    overallEfficiency: `${metrics.overallEfficiency}%`,
    paragraphs,
    steps
  };
}

module.exports = {
  generateNetworkExplanation
};
