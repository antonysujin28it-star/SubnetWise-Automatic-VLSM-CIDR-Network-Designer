/**
 * SubnetWise — Backend Server
 * Native Node.js HTTP server + SQLite database integration + REST API + Static Asset Server
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');

const { calculateSubnetDetails, isValidIp, isValidCidr } = require('./src/engine/ipv4');
const { calculateVLSM } = require('./src/engine/vlsm');
const { validateNetworkDesign } = require('./src/engine/validation');
const { generateNetworkExplanation } = require('./src/engine/explanation');
const { dbService } = require('./src/db/database');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // 2MB limit
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Helper to generate CSV
function generateAddressPlanCsv(subnets, baseNetwork) {
  const headers = [
    'Department / Subnet',
    'Required Hosts',
    'Network Address',
    'CIDR Prefix',
    'Subnet Mask',
    'Gateway',
    'First Usable Host',
    'Last Usable Host',
    'Broadcast Address',
    'Total Addresses',
    'Usable Hosts',
    'Wasted Addresses',
    'Efficiency (%)'
  ];

  const rows = subnets.map(s => [
    `"${(s.name || '').replace(/"/g, '""')}"`,
    s.requiredHosts,
    s.network,
    `/${s.cidr}`,
    s.subnetMask,
    s.gateway || s.firstHost,
    s.firstHost,
    s.lastHost,
    s.broadcast,
    s.totalAddresses,
    s.usableHosts,
    s.wastedHosts,
    `${s.efficiency}%`
  ]);

  let csv = `# SubnetWise Address Plan\n# Base Network: ${baseNetwork.network}/${baseNetwork.cidr}\n`;
  csv += headers.join(',') + '\n';
  rows.forEach(r => {
    csv += r.join(',') + '\n';
  });

  return csv;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  try {
    // API Routes
    if (pathname.startsWith('/api/')) {
      // 1. Calculate VLSM
      if (pathname === '/api/vlsm/calculate' && method === 'POST') {
        const body = await parseBody(req);
        const { baseIp, baseCidr, requirements, options } = body;
        const result = calculateVLSM(baseIp, baseCidr, requirements, options);
        return sendJson(res, 200, result);
      }

      // 2. Calculate Single Subnet (CIDR Calculator)
      if (pathname === '/api/cidr/calculate' && method === 'POST') {
        const body = await parseBody(req);
        const { ip, cidr } = body;
        if (!isValidIp(ip)) {
          return sendJson(res, 400, { error: `Invalid IPv4 address: ${ip}` });
        }
        if (!isValidCidr(cidr)) {
          return sendJson(res, 400, { error: `Invalid CIDR prefix: /${cidr}` });
        }
        const result = calculateSubnetDetails(ip, cidr);
        return sendJson(res, 200, { success: true, details: result });
      }

      // 3. Validate Network Design
      if (pathname === '/api/validate' && method === 'POST') {
        const body = await parseBody(req);
        const { baseIp, baseCidr, requirements, calculatedResult } = body;
        const validation = validateNetworkDesign(baseIp, baseCidr, requirements, calculatedResult);
        return sendJson(res, 200, validation);
      }

      // 4. Explain Design
      if (pathname === '/api/explain' && method === 'POST') {
        const body = await parseBody(req);
        const explanation = generateNetworkExplanation(body.calculationResult);
        return sendJson(res, 200, { success: true, explanation });
      }

      // 5. CSV Export
      if (pathname === '/api/export/csv' && method === 'POST') {
        const body = await parseBody(req);
        const { subnets, baseNetwork } = body;
        if (!subnets || !baseNetwork) {
          return sendJson(res, 400, { error: 'Missing subnets or base network information' });
        }
        const csv = generateAddressPlanCsv(subnets, baseNetwork);
        res.writeHead(200, {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="subnetwise-${baseNetwork.network.replace(/\./g, '_')}_${baseNetwork.cidr}.csv"`
        });
        res.end(csv);
        return;
      }

      // 6. Projects CRUD
      if (pathname === '/api/projects' && method === 'GET') {
        const projects = dbService.getProjects();
        return sendJson(res, 200, { success: true, projects });
      }

      if (pathname === '/api/projects' && method === 'POST') {
        const body = await parseBody(req);
        const saved = dbService.saveProject(body);
        return sendJson(res, 200, saved);
      }

      const projMatch = pathname.match(/^\/api\/projects\/([a-zA-Z0-9_-]+)$/);
      if (projMatch) {
        const projId = projMatch[1];
        if (method === 'GET') {
          const proj = dbService.getProject(projId);
          if (!proj) return sendJson(res, 404, { error: 'Project not found' });
          return sendJson(res, 200, { success: true, data: proj });
        }
        if (method === 'DELETE') {
          const del = dbService.deleteProject(projId);
          return sendJson(res, 200, del);
        }
      }

      const dupMatch = pathname.match(/^\/api\/projects\/([a-zA-Z0-9_-]+)\/duplicate$/);
      if (dupMatch && method === 'POST') {
        const projId = dupMatch[1];
        const dup = dbService.duplicateProject(projId);
        if (!dup) return sendJson(res, 404, { error: 'Project not found' });
        return sendJson(res, 200, dup);
      }

      // 7. Settings
      if (pathname === '/api/settings' && method === 'GET') {
        const settings = dbService.getSettings();
        return sendJson(res, 200, { success: true, settings });
      }

      if (pathname === '/api/settings' && method === 'POST') {
        const body = await parseBody(req);
        for (const [k, v] of Object.entries(body)) {
          dbService.saveSetting(k, v);
        }
        return sendJson(res, 200, { success: true });
      }

      return sendJson(res, 404, { error: `Endpoint not found: ${pathname}` });
    }

    // Static Asset Serving
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403);
      res.end('Access Denied');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html for SPA client-side routes
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        fs.readFile(indexPath, (readErr, content) => {
          if (readErr) {
            res.writeHead(404);
            res.end('File Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
          }
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500);
          res.end('Server Error reading file');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    });

  } catch (err) {
    console.error('Request error:', err);
    sendJson(res, 500, { error: err.message || 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 SubnetWise Server running at http://localhost:${PORT}`);
});
