# SubnetWise — Automatic VLSM/CIDR Network Designer

**SubnetWise** is a high-precision academic Computer Networks mini-project and developer utility designed to automatically synthesize IPv4 addressing architectures using **CIDR (Classless Inter-Domain Routing)**, subnetting, and **VLSM (Variable Length Subnet Masking)**.

Designed with a modern, minimal light aesthetic inspired by developer tools like Figma and Linear, SubnetWise replaces manual, error-prone binary subnet calculations with an automated engine, real-time boundary verification, interactive proportional address space visualization, and human-readable architectural explanations.

---

## 🌟 Key Features

### 1. Dynamic VLSM Allocation Engine
- **Mathematical Accuracy:** Computes minimal power-of-two host bit requirements:
  $$\text{usable hosts} = 2^b - 2 \ge H \implies \text{Prefix } P = 32 - b$$
- **Automatic Descending Sorting:** Orders requirements by descending host requirements to ensure optimal binary packing without boundary fragmentation.
- **Strict Boundary Alignment:** Verifies that every subnet's network address is an integer multiple of its block size ($2^b$).
- **Free Space Deconstruction:** Identifies and decomposes unallocated address pools into valid CIDR blocks.
- **Overflow & Shortfall Detection:** Gracefully handles over-allocation, reporting exact missing addresses and prefix recommendations.

### 2. Proportional Address Space Visualizer
- A continuous horizontal address bar visually partitioned by subnet capacity:
  - **CSE (/25)** occupies **50%** of a /24 network
  - **ECE (/26)** occupies **25%**
  - **Admin (/27)** occupies **12.5%**
  - **Server Room (/28)** occupies **6.25%**
  - **Free Space (/28)** occupies **6.25%**
- Interactive hover tooltips and one-click deep inspector modals.

### 3. Bit-Level Binary Breakdown
- Educational 32-bit binary octet visualization separating **Network Bits** from **Host Bits** with a distinct boundary demarcation.
- Built specifically for Computer Networks lab viva exams.

### 4. Comprehensive Validation Suite
- Real-time diagnostic verification checking:
  - Dotted-decimal IPv4 syntax and octet ranges (0–255)
  - CIDR prefix validity (/8 through /30)
  - Base network boundary alignment
  - Host requirement feasibility
  - Subnet containment within the base network
  - Mutual exclusion (zero subnet collisions or overlaps)
  - Gateway host sanity (preventing network or broadcast assignment)

### 5. Educational Comparison: VLSM vs Fixed Subnetting
- Automatically calculates the addresses required if all departments were forced to use a fixed subnet size (e.g., /25).
- Visually and numerically reports addresses saved and percentage reduction.

### 6. "Explain Design" Walkthrough
- Generates dynamic, step-by-step mathematical reasoning tailored to the active network design.

### 7. Production Address Plan & Export
- Configurable default gateways (First Usable Host or Last Usable Host).
- One-click **CSV export** and print-ready document view.

### 8. Persistence & History
- Built-in **SQLite database** (`subnetwise.db`) stores projects, requirements, and calculation snapshots with support for duplicating, reopening, and deleting designs.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended; compatible with Node 24 and Electron Node runtimes)

### Running the Application

1. **Launch the server:**
   ```bash
   node server.js
   ```
   *(Or double-click `start.bat` on Windows)*

2. **Open in browser:**
   ```text
   http://localhost:3000
   ```

3. **Run the Automated Test Suite:**
   ```bash
   node src/tests/test-engine.js
   ```

---

## 🎓 Viva / Academic Demo Walkthrough

Follow this demonstration flow during your Computer Networks lab evaluation:

1. **Open Dashboard:** Observe the pre-loaded **College Network** topology (`192.168.10.0/24`).
2. **Review Top Metrics:**
   - Base Network: `192.168.10.0/24` (256 Total Addresses, 254 Usable)
   - Demanded Hosts: 185
   - Allocated Capacity: 232 Usable
   - Overall Efficiency: ~79.7%
3. **Inspect the Address Space Bar:**
   - Hover over **CSE (/25)**: observe 128 total addresses (192.168.10.0 – 192.168.10.127).
   - Hover over **ECE (/26)**: observe 64 total addresses (192.168.10.128 – 192.168.10.191).
   - Hover over **Admin (/27)**: observe 32 total addresses (192.168.10.192 – 192.168.10.223).
   - Hover over **Server Room (/28)**: observe 16 total addresses (192.168.10.224 – 192.168.10.239).
   - Hover over **Free Space**: observe 16 remaining unallocated addresses (192.168.10.240/28).
4. **Click "CSE":**
   - Review Subnet Mask (`255.255.255.128`), Wildcard Mask (`0.0.0.127`), Gateway (`192.168.10.1`), Usable Range (`192.168.10.1 - 192.168.10.126`), and the 32-bit binary diagram.
5. **Open Validation Page:**
   - Show the 8 passed diagnostic verification checks proving zero overlap, valid gateways, and strict containment.
6. **Click "Explain Design":**
   - Present the mathematical reasoning explaining why $2^7-2=126 \ge 100$ yielded /25, $2^6-2=62 \ge 50$ yielded /26, etc.
7. **Export Address Plan:**
   - Download the clean CSV addressing spreadsheet.

---

## 📁 Project Architecture

```
cn-project/
├── node.cmd                  # Local Node execution shim
├── package.json              # Project metadata & test scripts
├── server.js                 # Native HTTP server + REST API + Static Server
├── start.bat                 # One-click Windows launch script
├── subnetwise.db             # Local SQLite database
├── src/
│   ├── engine/
│   │   ├── ipv4.js           # 32-bit bitwise math, masks, classes, binary
│   │   ├── vlsm.js           # VLSM allocation, boundary alignment, gaps
│   │   ├── validation.js     # Exhaustive 10-point network validation suite
│   │   └── explanation.js    # Dynamic mathematical reasoning engine
│   ├── db/
│   │   └── database.js       # SQLite persistence, schema, and demo presets
│   └── tests/
│       └── test-engine.js    # Automated unit tests
└── public/
    ├── index.html            # Main Single-Page Application HTML
    ├── css/
    │   └── styles.css        # Clean, light developer-tool styling
    ├── vendor/               # Offline-capable local vendor bundles
    │   ├── react.min.js
    │   ├── react-dom.min.js
    │   ├── htm.js
    │   └── tailwind.js
    └── js/
        ├── icons.js          # SVG Outline icon set
        ├── api.js            # Frontend REST API client
        ├── components/       # Reusable UI widgets (AddressBar, Binary, Modals)
        ├── views/            # 9 Core Screens (Dashboard, Designer, Calculators...)
        └── app.js            # State orchestrator & router
```

---

## 📜 License
MIT License. Developed for Academic Computer Networks & Engineering Curricula.
