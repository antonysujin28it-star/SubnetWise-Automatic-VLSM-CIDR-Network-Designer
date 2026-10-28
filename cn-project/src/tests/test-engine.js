/**
 * SubnetWise — Automated Test Suite
 * Tests IPv4 math, VLSM calculations, boundary alignments, edge cases,
 * validation rules, and SQLite database persistence.
 */

const assert = require('assert');
const { calculateSubnetDetails, ipToInt, intToIp, isValidIp, isValidCidr, formatBinaryWithSeparator } = require('../engine/ipv4');
const { calculateVLSM, getRequiredPrefix } = require('../engine/vlsm');
const { validateNetworkDesign } = require('../engine/validation');
const { generateNetworkExplanation } = require('../engine/explanation');
const { dbService } = require('../db/database');

console.log('🧪 Starting SubnetWise Engine Tests...\n');

// 1. IPv4 Mathematics Tests
console.log('Test 1: IPv4 Address and Subnet Mask Calculations');
const sub24 = calculateSubnetDetails('192.168.10.0', 24);
assert.strictEqual(sub24.network, '192.168.10.0');
assert.strictEqual(sub24.subnetMask, '255.255.255.0');
assert.strictEqual(sub24.wildcardMask, '0.0.0.255');
assert.strictEqual(sub24.totalAddresses, 256);
assert.strictEqual(sub24.usableHosts, 254);
assert.strictEqual(sub24.firstHost, '192.168.10.1');
assert.strictEqual(sub24.lastHost, '192.168.10.254');
assert.strictEqual(sub24.broadcast, '192.168.10.255');
assert.strictEqual(sub24.ipClass, 'C');
console.log('  ✓ /24 subnet details computed accurately');

// 2. Prefix & Capacity Tests (Section 8 & 26)
console.log('Test 2: Host Requirement to Prefix Mapping & Edge Cases');
assert.strictEqual(getRequiredPrefix(1).cidr, 30, '1 host requires /30 (2 usable hosts)');
assert.strictEqual(getRequiredPrefix(2).cidr, 30, '2 hosts require /30 (2 usable hosts)');
assert.strictEqual(getRequiredPrefix(10).cidr, 28, '10 hosts require /28 (14 usable hosts)');
assert.strictEqual(getRequiredPrefix(25).cidr, 27, '25 hosts require /27 (30 usable hosts)');
assert.strictEqual(getRequiredPrefix(50).cidr, 26, '50 hosts require /26 (62 usable hosts)');
assert.strictEqual(getRequiredPrefix(62).cidr, 26, '62 hosts exactly match /26 capacity');
assert.strictEqual(getRequiredPrefix(63).cidr, 25, '63 hosts must bump up to /25 (126 usable hosts)');
assert.strictEqual(getRequiredPrefix(100).cidr, 25, '100 hosts require /25 (126 usable hosts)');
assert.strictEqual(getRequiredPrefix(126).cidr, 25, '126 hosts exactly match /25 capacity');
assert.strictEqual(getRequiredPrefix(127).cidr, 24, '127 hosts must bump up to /24 (254 usable hosts)');
console.log('  ✓ Prefix mapping and edge cases verified');

// 3. Main Project Requirement Flow: College Network (192.168.10.0/24)
console.log('Test 3: College Network VLSM Allocation');
const collegeReqs = [
  { name: 'CSE', requiredHosts: 100 },
  { name: 'ECE', requiredHosts: 50 },
  { name: 'Admin', requiredHosts: 25 },
  { name: 'Server Room', requiredHosts: 10 }
];

const collegeResult = calculateVLSM('192.168.10.0', 24, collegeReqs);
assert.strictEqual(collegeResult.success, true);
assert.strictEqual(collegeResult.subnets.length, 4);

const cse = collegeResult.subnets.find(s => s.name === 'CSE');
assert.strictEqual(cse.network, '192.168.10.0');
assert.strictEqual(cse.cidr, 25);
assert.strictEqual(cse.usableHosts, 126);
assert.strictEqual(cse.totalAddresses, 128);
assert.strictEqual(cse.broadcast, '192.168.10.127');
assert.strictEqual(cse.firstHost, '192.168.10.1');
assert.strictEqual(cse.lastHost, '192.168.10.126');
assert.strictEqual(cse.wastedHosts, 26);

const ece = collegeResult.subnets.find(s => s.name === 'ECE');
assert.strictEqual(ece.network, '192.168.10.128');
assert.strictEqual(ece.cidr, 26);
assert.strictEqual(ece.usableHosts, 62);
assert.strictEqual(ece.broadcast, '192.168.10.191');
assert.strictEqual(ece.firstHost, '192.168.10.129');
assert.strictEqual(ece.lastHost, '192.168.10.190');

const admin = collegeResult.subnets.find(s => s.name === 'Admin');
assert.strictEqual(admin.network, '192.168.10.192');
assert.strictEqual(admin.cidr, 27);
assert.strictEqual(admin.usableHosts, 30);
assert.strictEqual(admin.broadcast, '192.168.10.223');
assert.strictEqual(admin.firstHost, '192.168.10.193');
assert.strictEqual(admin.lastHost, '192.168.10.222');

const server = collegeResult.subnets.find(s => s.name === 'Server Room');
assert.strictEqual(server.network, '192.168.10.224');
assert.strictEqual(server.cidr, 28);
assert.strictEqual(server.usableHosts, 14);
assert.strictEqual(server.broadcast, '192.168.10.239');
assert.strictEqual(server.firstHost, '192.168.10.225');
assert.strictEqual(server.lastHost, '192.168.10.238');

// Free space check
assert.strictEqual(collegeResult.freeBlocks.length, 1);
assert.strictEqual(collegeResult.freeBlocks[0].network, '192.168.10.240');
assert.strictEqual(collegeResult.freeBlocks[0].cidr, 28);
assert.strictEqual(collegeResult.freeBlocks[0].totalAddresses, 16);
console.log('  ✓ College Network allocated with zero overlap and exact subnets');

// 4. Overlap & Overflow Edge Cases
console.log('Test 4: Insufficient Address Space (Overflow Detection)');
const overflowReqs = [
  { name: 'Huge A', requiredHosts: 200 },
  { name: 'Huge B', requiredHosts: 100 }
];
const overflowResult = calculateVLSM('192.168.10.0', 24, overflowReqs);
assert.strictEqual(overflowResult.success, false);
assert.strictEqual(overflowResult.hasOverflow, true);
assert.ok(overflowResult.error.includes('Insufficient address space'));
console.log('  ✓ Overflow condition caught gracefully with shortfall reporting');

// 5. Binary Formatting Tests (Section 12)
console.log('Test 5: Binary Representation and Separators');
const binInfo = formatBinaryWithSeparator('192.168.10.0', 25);
assert.strictEqual(binInfo.networkBitCount, 25);
assert.strictEqual(binInfo.hostBitCount, 7);
console.log('  ✓ Binary format separated 25 network bits and 7 host bits');

// 6. Network Validation Engine Tests (Section 16)
console.log('Test 6: Validation Rule Engine');
const val = validateNetworkDesign('192.168.10.0', 24, collegeReqs, collegeResult);
assert.strictEqual(val.isValid, true);
assert.strictEqual(val.hasErrors, false);
console.log('  ✓ Validation passed for College Network allocation');

// 7. Dynamic Explanation Generator (Section 19)
console.log('Test 7: Dynamic Explanation Generator');
const explanation = generateNetworkExplanation(collegeResult);
assert.ok(explanation.paragraphs.length >= 2);
assert.strictEqual(explanation.steps.length, 4);
assert.ok(explanation.paragraphs[0].includes('192.168.10.0/24'));
assert.ok(explanation.steps[0].explanation.includes('CSE'));
console.log('  ✓ Educational explanation generated dynamically from values');

// 8. SQLite Database Persistence & Seeding (Section 22 & 23)
console.log('Test 8: SQLite Database Operations');
const projects = dbService.getProjects();
assert.ok(projects.length >= 3, 'Pre-seeded demo projects exist in SQLite');
const collegeProj = projects.find(p => p.name === 'College Network');
assert.ok(collegeProj, 'College Network exists in database');
const projectDetails = dbService.getProject(collegeProj.id);
assert.strictEqual(projectDetails.subnets.length, 4);
console.log('  ✓ SQLite database seeded and projects retrieved successfully');

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! The core engine is 100% sound!\n');
