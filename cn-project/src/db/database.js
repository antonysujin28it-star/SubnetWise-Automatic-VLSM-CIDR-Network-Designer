/**
 * SubnetWise — SQLite Database Service
 * Provides schema initialization, migrations, CRUD operations, and preset seeding.
 */

const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const { calculateVLSM } = require('../engine/vlsm');

const DB_PATH = path.join(__dirname, '..', '..', 'subnetwise.db');

let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH);
    initSchema(dbInstance);
  }
  return dbInstance;
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      baseNetwork TEXT NOT NULL,
      cidr INTEGER NOT NULL,
      gatewayConvention TEXT DEFAULT 'first',
      description TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS requirements (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      name TEXT NOT NULL,
      requiredHosts INTEGER NOT NULL,
      priority TEXT DEFAULT 'Medium',
      description TEXT DEFAULT '',
      sortOrder INTEGER DEFAULT 0,
      FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subnets (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      requirementId TEXT,
      name TEXT NOT NULL,
      network TEXT NOT NULL,
      cidr INTEGER NOT NULL,
      subnetMask TEXT NOT NULL,
      wildcardMask TEXT NOT NULL,
      gateway TEXT NOT NULL,
      firstHost TEXT NOT NULL,
      lastHost TEXT NOT NULL,
      broadcast TEXT NOT NULL,
      totalAddresses INTEGER NOT NULL,
      usableHosts INTEGER NOT NULL,
      wastedHosts INTEGER NOT NULL,
      efficiency REAL NOT NULL,
      FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  seedPresetsIfEmpty(db);
}

function seedPresetsIfEmpty(db) {
  const countRow = db.prepare('SELECT count(*) as count FROM projects').get();
  if (countRow && countRow.count > 0) {
    return;
  }

  const now = new Date().toISOString();

  // Preset 1: College Network
  createProjectWithRequirements(db, {
    id: 'proj-college-net',
    name: 'College Network',
    baseNetwork: '192.168.10.0',
    cidr: 24,
    description: 'Academic campus allocation: CSE, ECE, Admin, and Server Room.',
    requirements: [
      { id: 'req-cse', name: 'CSE', requiredHosts: 100, priority: 'High', description: 'Computer Science & Engineering Labs' },
      { id: 'req-ece', name: 'ECE', requiredHosts: 50, priority: 'High', description: 'Electronics & Communication Labs' },
      { id: 'req-admin', name: 'Admin', requiredHosts: 25, priority: 'Medium', description: 'Administrative Staff & Dean Offices' },
      { id: 'req-server', name: 'Server Room', requiredHosts: 10, priority: 'Critical', description: 'Internal Campus Servers & Storage' }
    ]
  }, now);

  // Preset 2: Small Office
  createProjectWithRequirements(db, {
    id: 'proj-small-office',
    name: 'Small Office',
    baseNetwork: '192.168.1.0',
    cidr: 24,
    description: 'Corporate corporate office division across departments.',
    requirements: [
      { id: 'req-so-dev', name: 'Development', requiredHosts: 60, priority: 'High', description: 'Software engineering workstations' },
      { id: 'req-so-mgmt', name: 'Management', requiredHosts: 30, priority: 'Medium', description: 'Executive & finance teams' },
      { id: 'req-so-hr', name: 'HR', requiredHosts: 15, priority: 'Low', description: 'Human resources and legal staff' },
      { id: 'req-so-srv', name: 'Servers', requiredHosts: 10, priority: 'Critical', description: 'Active Directory and file servers' }
    ]
  }, now);

  // Preset 3: Data Center
  createProjectWithRequirements(db, {
    id: 'proj-datacenter',
    name: 'Data Center',
    baseNetwork: '10.0.0.0',
    cidr: 23,
    description: 'High-density multi-tier application infrastructure.',
    requirements: [
      { id: 'req-dc-app', name: 'Application', requiredHosts: 120, priority: 'High', description: 'App server clusters and worker nodes' },
      { id: 'req-dc-db', name: 'Database', requiredHosts: 60, priority: 'Critical', description: 'Primary & replica SQL databases' },
      { id: 'req-dc-mgmt', name: 'Management', requiredHosts: 20, priority: 'Medium', description: 'Bastion host and VPN access' },
      { id: 'req-dc-mon', name: 'Monitoring', requiredHosts: 10, priority: 'Low', description: 'Prometheus & logging collectors' }
    ]
  }, now);
}

function createProjectWithRequirements(db, projData, timestamp = new Date().toISOString()) {
  const insertProj = db.prepare(`
    INSERT INTO projects (id, name, baseNetwork, cidr, gatewayConvention, description, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProj.run(
    projData.id,
    projData.name,
    projData.baseNetwork,
    Number(projData.cidr),
    projData.gatewayConvention || 'first',
    projData.description || '',
    timestamp,
    timestamp
  );

  const insertReq = db.prepare(`
    INSERT INTO requirements (id, projectId, name, requiredHosts, priority, description, sortOrder)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const reqs = projData.requirements || [];
  for (let i = 0; i < reqs.length; i++) {
    const r = reqs[i];
    insertReq.run(
      r.id || `req-${Date.now()}-${i}`,
      projData.id,
      r.name,
      Number(r.requiredHosts),
      r.priority || 'Medium',
      r.description || '',
      i
    );
  }

  // Calculate and store subnets
  recalculateAndStoreSubnets(db, projData.id);
}

function recalculateAndStoreSubnets(db, projectId) {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
  if (!project) return null;

  const reqRows = db.prepare('SELECT * FROM requirements WHERE projectId = ? ORDER BY sortOrder ASC').all(projectId);

  const calcResult = calculateVLSM(
    project.baseNetwork,
    project.cidr,
    reqRows,
    { gatewayPosition: project.gatewayConvention || 'first' }
  );

  // Clear existing subnets for this project
  db.prepare('DELETE FROM subnets WHERE projectId = ?').run(projectId);

  if (calcResult.success && calcResult.subnets) {
    const insertSubnet = db.prepare(`
      INSERT INTO subnets (
        id, projectId, requirementId, name, network, cidr, subnetMask,
        wildcardMask, gateway, firstHost, lastHost, broadcast,
        totalAddresses, usableHosts, wastedHosts, efficiency
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let sIdx = 0;
    for (const s of calcResult.subnets) {
      sIdx++;
      insertSubnet.run(
        `${projectId}-sub-${sIdx}`,
        projectId,
        s.requirementId,
        s.name,
        s.network,
        s.cidr,
        s.subnetMask,
        s.wildcardMask,
        s.gateway,
        s.firstHost,
        s.lastHost,
        s.broadcast,
        s.totalAddresses,
        s.usableHosts,
        s.wastedHosts,
        s.efficiency
      );
    }
  }

  return calcResult;
}

// Database API helper functions
const dbService = {
  getProjects() {
    const db = getDb();
    const projects = db.prepare('SELECT * FROM projects ORDER BY updatedAt DESC').all();
    return projects.map(p => {
      const subnets = db.prepare('SELECT * FROM subnets WHERE projectId = ?').all(p.id);
      const reqs = db.prepare('SELECT * FROM requirements WHERE projectId = ? ORDER BY sortOrder ASC').all(p.id);
      
      const totalReq = reqs.reduce((sum, r) => sum + r.requiredHosts, 0);
      const totalCap = subnets.reduce((sum, s) => sum + s.usableHosts, 0);
      const efficiency = totalCap > 0 ? Number(((totalReq / totalCap) * 100).toFixed(1)) : 0;

      return {
        ...p,
        subnetsCount: subnets.length,
        requirementsCount: reqs.length,
        totalRequestedHosts: totalReq,
        totalAllocatedCapacity: totalCap,
        efficiency
      };
    });
  },

  getProject(id) {
    const db = getDb();
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    if (!project) return null;

    const requirements = db.prepare('SELECT * FROM requirements WHERE projectId = ? ORDER BY sortOrder ASC').all(id);
    const subnets = db.prepare('SELECT * FROM subnets WHERE projectId = ?').all(id);

    return {
      project,
      requirements,
      subnets
    };
  },

  saveProject(data) {
    const db = getDb();
    const now = new Date().toISOString();
    const id = data.id || `proj-${Date.now()}`;

    const existing = db.prepare('SELECT id FROM projects WHERE id = ?').get(id);
    if (existing) {
      db.prepare(`
        UPDATE projects
        SET name = ?, baseNetwork = ?, cidr = ?, gatewayConvention = ?, description = ?, updatedAt = ?
        WHERE id = ?
      `).run(
        data.name,
        data.baseNetwork,
        Number(data.cidr),
        data.gatewayConvention || 'first',
        data.description || '',
        now,
        id
      );

      // Replace requirements
      db.prepare('DELETE FROM requirements WHERE projectId = ?').run(id);
    } else {
      db.prepare(`
        INSERT INTO projects (id, name, baseNetwork, cidr, gatewayConvention, description, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        data.name,
        data.baseNetwork,
        Number(data.cidr),
        data.gatewayConvention || 'first',
        data.description || '',
        now,
        now
      );
    }

    const insertReq = db.prepare(`
      INSERT INTO requirements (id, projectId, name, requiredHosts, priority, description, sortOrder)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const reqs = data.requirements || [];
    for (let i = 0; i < reqs.length; i++) {
      const r = reqs[i];
      insertReq.run(
        r.id || `req-${Date.now()}-${i}`,
        id,
        r.name,
        Number(r.requiredHosts),
        r.priority || 'Medium',
        r.description || '',
        i
      );
    }

    const calcResult = recalculateAndStoreSubnets(db, id);

    return {
      success: true,
      projectId: id,
      calcResult
    };
  },

  duplicateProject(id) {
    const db = getDb();
    const orig = this.getProject(id);
    if (!orig) return null;

    const newId = `proj-${Date.now()}`;
    const newName = `${orig.project.name} (Copy)`;

    return this.saveProject({
      id: newId,
      name: newName,
      baseNetwork: orig.project.baseNetwork,
      cidr: orig.project.cidr,
      gatewayConvention: orig.project.gatewayConvention,
      description: orig.project.description,
      requirements: orig.requirements.map(r => ({
        name: r.name,
        requiredHosts: r.requiredHosts,
        priority: r.priority,
        description: r.description
      }))
    });
  },

  deleteProject(id) {
    const db = getDb();
    db.prepare('DELETE FROM subnets WHERE projectId = ?').run(id);
    db.prepare('DELETE FROM requirements WHERE projectId = ?').run(id);
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    return { success: true };
  },

  getSettings() {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM settings').all();
    const settings = {
      defaultGatewayConvention: 'first',
      showBinaryDots: true,
      autoCalculate: true
    };
    for (const r of rows) {
      try {
        settings[r.key] = JSON.parse(r.value);
      } catch {
        settings[r.key] = r.value;
      }
    }
    return settings;
  },

  saveSetting(key, value) {
    const db = getDb();
    const serialized = JSON.stringify(value);
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, serialized);
    return { success: true };
  }
};

module.exports = {
  getDb,
  dbService
};
