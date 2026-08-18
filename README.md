<div align="center">

# 🏭 WarehouseIQ 2.0

### *Autonomous Decision Intelligence & Warehouse Operations Platform*

[![Next.js 15](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-33%20Passed-emerald?style=for-the-badge&logo=vitest&logoColor=white)](#-automated-testing--validation)

<br />

> **WarehouseIQ is not a warehouse management system — it is a Decision Intelligence Platform that thinks before it acts.**
> 
> Traditional WMS systems log what happened in the past. WarehouseIQ predicts upcoming risks, simulates multi-variable operational scenarios, optimizes landed resolution costs, and assists managers in executing autonomous, SLA-preserving decisions before bottlenecks occur.

<br />

[Architecture](#-system-architecture--decision-flow) · [High-Impact Features](#-high-impact-feature-breakdown) · [What-If Simulator](#-what-if-simulation-engine) · [Testing Suite](#-automated-testing--validation) · [Demo Walkthrough](#-3-5-minute-judge-demo-workflow) · [Setup Guide](#-quick-start)

</div>

---

<br />

## 🎯 Chosen Vertical & Problem Statement

### **Vertical:** Autonomous Supply Chain Operations & Decision Intelligence
### **Target Personas:** 
- **Warehouse Operations Directors & Logistics VPs:** Require cross-facility visibility, risk prediction, and automated cost optimization.
- **Facility Shift Supervisors:** Require dynamic workforce rebalancing and bottleneck diagnostics.
- **Fulfillment Floor Pickers & Operators:** Require streamlined, priority-ordered pick queues with zero cognitive overload.

### **The Real-World Problem:**
Traditional warehouse management is fundamentally **reactive**:
1. Stock runs out $\to$ orders stall $\to$ customer SLAs are breached $\to$ financial penalties occur.
2. Inbound quality defects are discovered late on packing lines rather than at conveyor intake.
3. Shift supervisors make static worker assignments, causing idle pickers in low-demand aisles and massive queues at packing stations.
4. Managers lack the capability to stress-test scenarios (e.g. *"What happens if flash sale demand spikes by +30% during a severe weather storm?"*).

---

## 🧠 System Architecture & Decision Flow

WarehouseIQ 2.0 operates on a continuous, closed-loop decision pipeline:

```text
REAL-WORLD EVENTS
        ↓
REAL-TIME EVENT ENGINE (Anomalies & Sensor Stream)
        ↓
DATA + ML PREDICTIONS (Demand velocity, Stockout horizons, Weather radar)
        ↓
RISK DETECTION (Congestion, SLA breach probabilities)
        ↓
DECISION ENGINE (3-Level Shortage Cascade)
        ↓
WHAT-IF SIMULATION (/decision-center/simulator)
        ↓
EXPLAINABLE AI RECOMMENDATION (Why, Evidence, Landed Cost, ROI)
        ↓
MANAGER APPROVAL (/approvals)
        ↓
EXECUTION & STATE MUTATION (Inter-hub transfer, Auto-reorder, Staff rebalance)
        ↓
IMMUTABLE AUDIT LOG (/audit)
        ↓
LEARNING / ANALYTICS
```

---

## 🧩 High-Impact Feature Breakdown

### 1. ⚡ Real-Time Event Intelligence Stream
- Detects demand spikes, approaching stockouts, picking bottlenecks, and transit weather alerts across 4 distributed warehouse facilities.
- Dynamic animated header ticker providing instantaneous operational situational awareness.

### 2. 🔮 What-If Operations Simulator (`/decision-center/simulator`)
- Interactive parameter sliders for:
  - Demand variation ($\pm 50\%$)
  - Additional order surges ($0 - 2,000$)
  - Inventory damage / shrinkage loss ($0 - 50\%$)
  - Supplier lead-time delays ($0 - 14$ days)
  - Available workforce capacity ($\pm 50\%$)
  - Extreme weather disruptions
- Compares **Baseline vs. Simulated** state (Fulfillment SLA %, Stockout SKUs, Delayed Orders, Workload %, Required Headcount, and Total Cost).
- **Strict Non-Mutation Guarantee:** All simulations execute in memory and never alter production records.

### 3. 🧠 3-Level Inventory Shortage Decision Cascade
When an inventory shortage threatens customer SLA, WarehouseIQ evaluates:
- **Level 1 — Cross-Hub Inventory Transfer:** Scans sibling hubs (Hub West-02, Hub Central-01, Hub South-04), calculates transit time and freight cost, preserving 100% on-time delivery.
- **Level 2 — Substitution & Supplier Escalation:** Matches verified product alternatives or triggers emergency Purchase Orders with tier-1 suppliers (lead time $< 24$h).
- **Level 3 — Impact-Minimized Delay & Courtesy Credit:** Applies customer-tier weighting and split-shipments as an absolute final resort.

### 4. 💰 Multi-Option Landed Cost Optimization Engine
Deterministic calculation for major resolutions:
$$\text{Total Cost} = \text{Transfer} + \text{Storage} + \text{Labor} + \text{Supplier} + \text{Delay Penalty} + \text{Customer Impact}$$

### 5. 🚚 Delivery Risk Probability Engine
Calculates deterministic late probability scores ($0 - 100\%$) based on deadline proximity, customer tier penalties, conveyor congestion, carrier performance history, and adverse transit weather.

### 6. 👷 Dynamic Workforce Optimization & SLA Routing
Rebalances pickers and packers across specialized storage zones in real time based on active queue depth and worker efficiency scores.

### 7. 🗺️ 2D Digital Warehouse Twin (`/warehouse`)
Interactive floor plan featuring:
- Live heatmaps: 🟢 Normal, 🟡 Warning, 🟠 High Congestion, 🔴 Critical Bottleneck.
- Interactive zone inspector displaying telemetry, active order queues, assigned workers, and AI spatial directives.

### 8. 📷 Computer Vision Damage Inspection (`/damage-inspection`)
Simulated optical intake scanner detecting:
- Torn packaging, liquid leakage, dents, missing labels, and crushed boxes.
- Automated quarantine workflows and GS1 barcode reprint dispatch.

### 9. 🛡️ Manager Approval Center (`/approvals`) & Cryptographic Audit Trail
Centralized console enforcing human-in-the-loop governance for all high-impact actions with complete immutable history tracking.

---

## 🤖 Intelligence & AI Classification Matrix

| Capability | Implementation Type | Description |
| :--- | :--- | :--- |
| **Shortage Cascade** | **Deterministic Service** | Algorithmic 3-level evaluation of inventory, distance, and SLA constraints. |
| **What-If Simulation** | **Deterministic Model** | Mathematical simulation of capacity, demand shocks, and labor requirements. |
| **Landed Cost Engine** | **Deterministic Service** | Multi-variable accounting formula comparing financial trade-offs. |
| **Delivery Risk Scoring**| **Predictive Scoring Engine** | Risk factor aggregation based on historical carrier latency and real-time queues. |
| **AI Copilot & Explanations** | **AI / LLM Assisted** | OpenRouter / Gemini LLM interface providing contextual natural language reasoning. |
| **Vision Defect Triage**| **Simulated Vision Pipeline**| Optical sorting simulation detecting package defect bounding boxes. |

---

## 🧪 Automated Testing & Validation

WarehouseIQ 2.0 includes a comprehensive test suite covering unit calculations, cascade scenarios, security guards, and edge cases.

```bash
npm test
```

### **Test Results:**
```text
======================================================
🧪 WAREHOUSEIQ 2.0 — AUTOMATED TEST SUITE
======================================================

📌 1. Inventory Calculations & Stock Health          [3/3 Passed]
📌 2. Order Priority Scoring & SLA Queue Management  [3/3 Passed]
📌 3. Three-Level Shortage Decision Cascade          [4/4 Passed]
📌 4. What-If Simulation Engine & Non-Mutation       [4/4 Passed]
📌 5. Delivery Risk Probability Engine               [2/2 Passed]
📌 6. Multi-Option Landed Cost Optimization          [2/2 Passed]
📌 7. Dynamic Workforce Optimization & SLA Routing  [2/2 Passed]
📌 8. Manager Approvals & Cryptographic Audit Log    [2/2 Passed]
📌 9. Role-Based Access Control (RBAC) & Security    [3/3 Passed]
📌 10. Real-Time Event Intelligence Stream           [2/2 Passed]
📌 11. Supplier & Computer Vision Damage Inspection  [3/3 Passed]
📌 12. Edge Cases, Zero Stock & Boundary Scenarios   [3/3 Passed]

======================================================
🏁 TOTAL: 33 EXECUTED, 33 PASSED, 0 FAILED (39ms)
======================================================
```

---

## ♿ Accessibility & Universal Design (WCAG 2.1 AA)

- **Keyboard Navigation:** Full Tab/Shift+Tab support, visible focus rings (`focus-visible:ring-2 focus-visible:ring-indigo-500`), and Escape key dialog dismissals.
- **Color-Independent Status Indicators:** Every status badge combines clear symbolic glyphs (`🔴 Critical`, `🟠 High`, `🟡 Warning`, `🟢 Normal`) with descriptive text and ARIA labels.
- **Semantic HTML:** Replaced ad-hoc clickable divs with semantic `<button>`, `<a>`, `<nav>`, `<main>`, and `<section>` elements.
- **Screen Reader Support:** Explicit `aria-label`, `role="region"`, `role="status"`, and `<label htmlFor="...">` associations across forms and search inputs.
- **Reduced Motion:** Integrated `@media (prefers-reduced-motion: reduce)` rules to eliminate distracting animations for motion-sensitive users.

---

## 🔒 Security & Role-Based Access Control (RBAC)

| Role | Console Scope | Decision Approvals | What-If Simulator | Damage Inspection |
| :--- | :--- | :--- | :--- | :--- |
| **MANAGER** | Full Single-Hub Management Suite | ✅ Yes | ✅ Yes | ✅ Yes |
| **SUPERVISOR**| Floor Operations & Workforce Roster | ✅ Assigned Scope | ❌ Read-Only | ✅ Yes |
| **PICKER** | Assigned Pick Waves & Barcode Scanner | ❌ Restricted | ❌ Restricted | ❌ Restricted |
| **PACKER** | Packing Station Queue & Labeling | ❌ Restricted | ❌ Restricted | ❌ Restricted |

---

## 🎬 3–5 Minute Judge Demo Workflow

1. **Step 1 — Executive Command Center (`/`):** View real-time KPIs, active anomaly ticker, and order throughput across 4 distributed warehouse hubs.
2. **Step 2 — Inspect Critical Anomaly:** Notice the alert: *"DEMAND SPIKE: High-Performance Wireless Headphones (+47% velocity in 4h). Stockout predicted in 9 hours."*
3. **Step 3 — Autonomous Decision Center (`/decision-center`):** Inspect the Level 1 resolution: *"Transfer 120 units from Hub West-02 (Los Angeles) $\to$ Hub East-01 (New York)"*. Review mathematical explainability (why, evidence, transit time, ₹15,600 savings).
4. **Step 4 — What-If Operations Simulator (`/decision-center/simulator`):** Adjust demand surge to $+50\%$ and reduce workforce by $-20\%$. Observe live delta impact (fulfillment drop from $96.4\%$ to $74.2\%$, cost increase of $+₹68,000$) and inspect AI preventative mitigation steps.
5. **Step 5 — Manager Approval Center (`/approvals`):** Click **"Approve & Execute"** on the pending transfer decision.
6. **Step 6 — Immutable Audit Trail (`/approvals?tab=audit`):** Verify the newly recorded cryptographic audit log containing timestamp, actor, previous state, and new state.
7. **Step 7 — 2D Digital Warehouse Twin (`/warehouse`):** Click on *Zone B (High Value)* to view real-time queue congestion, active pickers, and temperature telemetry.
8. **Step 8 — AI Operational Copilot (`/ai-assistant`):** Ask *"Why did you recommend transferring from Hub West-02?"* and observe data-backed explanation.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- PostgreSQL database (or Supabase/Neon PostgreSQL instance)

### Installation
```bash
# 1. Clone repository
git clone https://github.com/yvsns-hub/Ware-House-Intelligence-platform.git
cd Ware-House-Intelligence-platform

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Generate Prisma Client & Seed Database
npm run prisma:generate
npm run prisma:seed

# 5. Run Automated Tests
npm test

# 6. Start Development Server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📦 Repository Compliance

- **Repository Size:** $< 10$ MB (Active tracked footprint $\approx 0.94$ MB).
- **Git Branches:** Strictly maintained on a single, clean `main` branch.
- **Zero Hardcoded Secrets:** Strictly authenticated via `.env.example` templates.

---

<div align="center">
<b>WarehouseIQ 2.0 — Built with Precision for the Decision Intelligence Hackathon</b>
</div>
