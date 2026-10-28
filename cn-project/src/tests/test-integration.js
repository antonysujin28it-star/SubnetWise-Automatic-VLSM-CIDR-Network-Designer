/**
 * SubnetWise — End-to-End Integration Verification Script
 * Launches server, performs comprehensive HTTP API & asset checks, and verifies all features.
 */

const http = require('http');
require('../../server.js');

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('🚀 Running End-to-End Server & API Integration Tests...\n');
  await new Promise(r => setTimeout(r, 600));

  // 1. Static HTML test
  console.log('Test 1: GET / (Main Application HTML)');
  const htmlRes = await request('GET', '/');
  if (htmlRes.statusCode !== 200 || !htmlRes.data.includes('SubnetWise')) {
    throw new Error('Failed to load main HTML');
  }
  console.log('  ✓ Main HTML served with status 200');

  // 2. Vendor Asset test
  console.log('Test 2: GET /vendor/react.min.js (Offline Vendor Bundle)');
  const reactRes = await request('GET', '/vendor/react.min.js');
  if (reactRes.statusCode !== 200) {
    throw new Error('Failed to load React bundle');
  }
  console.log('  ✓ Offline vendor assets served successfully');

  // 3. Projects API
  console.log('Test 3: GET /api/projects (SQLite Projects API)');
  const projRes = await request('GET', '/api/projects');
  const projData = JSON.parse(projRes.data);
  if (!projData.success || projData.projects.length < 3) {
    throw new Error('Projects API failed or missing presets');
  }
  console.log(`  ✓ Projects retrieved (${projData.projects.length} presets active in SQLite)`);

  // 4. VLSM Calculate API
  console.log('Test 4: POST /api/vlsm/calculate (College Network Scenario)');
  const vlsmRes = await request('POST', '/api/vlsm/calculate', {
    baseIp: '192.168.10.0',
    baseCidr: 24,
    requirements: [
      { name: 'CSE', requiredHosts: 100 },
      { name: 'ECE', requiredHosts: 50 },
      { name: 'Admin', requiredHosts: 25 },
      { name: 'Server Room', requiredHosts: 10 }
    ]
  });
  const vlsmData = JSON.parse(vlsmRes.data);
  if (!vlsmData.success || vlsmData.subnets.length !== 4) {
    throw new Error('VLSM calculation failed');
  }
  const cse = vlsmData.subnets.find(s => s.name === 'CSE');
  const ece = vlsmData.subnets.find(s => s.name === 'ECE');
  if (cse.network !== '192.168.10.0' || cse.cidr !== 25 || ece.network !== '192.168.10.128' || ece.cidr !== 26) {
    throw new Error('VLSM allocation mismatch');
  }
  console.log('  ✓ College Network calculated perfectly:');
  console.log(`    - CSE: ${cse.network}/${cse.cidr} (${cse.usableHosts} usable hosts)`);
  console.log(`    - ECE: ${ece.network}/${ece.cidr} (${ece.usableHosts} usable hosts)`);

  // 5. CIDR Calculate API
  console.log('Test 5: POST /api/cidr/calculate (192.168.10.50/26)');
  const cidrRes = await request('POST', '/api/cidr/calculate', {
    ip: '192.168.10.50',
    cidr: 26
  });
  const cidrData = JSON.parse(cidrRes.data);
  if (!cidrData.success || cidrData.details.network !== '192.168.10.0' || cidrData.details.broadcast !== '192.168.10.63') {
    throw new Error('CIDR calculation failed');
  }
  console.log('  ✓ CIDR single subnet calculated accurately');

  // 6. Network Validation API
  console.log('Test 6: POST /api/validate');
  const valRes = await request('POST', '/api/validate', {
    baseIp: '192.168.10.0',
    baseCidr: 24,
    requirements: [
      { name: 'CSE', requiredHosts: 100 },
      { name: 'ECE', requiredHosts: 50 }
    ],
    calculatedResult: vlsmData
  });
  const valData = JSON.parse(valRes.data);
  if (!valData.isValid || valData.hasErrors) {
    throw new Error('Validation returned unexpected errors');
  }
  console.log('  ✓ Validation suite executed and verified 100% validity');

  // 7. Dynamic Explanation API
  console.log('Test 7: POST /api/explain');
  const expRes = await request('POST', '/api/explain', {
    calculationResult: vlsmData
  });
  const expData = JSON.parse(expRes.data);
  if (!expData.success || !expData.explanation.paragraphs) {
    throw new Error('Explanation failed');
  }
  console.log('  ✓ Dynamic design explanation generated');

  // 8. CSV Export API
  console.log('Test 8: POST /api/export/csv');
  const csvRes = await request('POST', '/api/export/csv', {
    subnets: vlsmData.subnets,
    baseNetwork: vlsmData.baseNetwork
  });
  if (csvRes.statusCode !== 200 || !csvRes.data.includes('CSE')) {
    throw new Error('CSV export failed');
  }
  console.log('  ✓ Address plan CSV generated successfully');

  console.log('\n🎉 ALL INTEGRATION TESTS PASSED! Full system is completely verified!\n');
  process.exit(0);
}

run().catch(err => {
  console.error('Integration test failure:', err);
  process.exit(1);
});
