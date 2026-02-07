# UK Insurance Regulatory Monitoring Pipeline  
**Agentic Regulatory Interpretation and Escalation using Ascend**

---

## Overview

UK insurance firms must continuously monitor regulatory publications from the Financial Conduct Authority (FCA) and the Prudential Regulation Authority (PRA) to identify enforceable obligations and take timely action. This process is typically manual, slow, and difficult to audit—particularly under the FCA’s Consumer Duty regime.

This project demonstrates a **deployed, scheduled, agentic data pipeline** built in Ascend that:
- Ingests UK insurance regulatory publications
- Extracts structured regulatory obligations using an AI agent
- Quantifies regulatory impact in a defensible, auditable way
- Automatically escalates high-impact obligations via email alerts

The pipeline is deliberately scoped to **UK insurance regulation only** and is designed to be realistic, production-minded, and audit-ready.

---

## Problem Statement

UK insurers face three recurring challenges:
1. Regulatory publications are narrative and difficult to interpret consistently  
2. Manual monitoring introduces delays and missed obligations  
3. There is often weak lineage from regulation to internal action during audits  

This pipeline addresses these issues by converting regulatory text into structured obligations and autonomously escalating material regulatory change.

---

## Data Sources

### Regulatory Sources (Read Connectors)

Only obligation-bearing UK publications are processed:

- **FCA**
  - Policy Statements
  - Handbook updates
  - Dear CEO letters
  - Consumer Duty publications

- **PRA**
  - Supervisory Statements
  - Policy Statements

The following are explicitly excluded to reduce noise:
- Speeches
- Blogs
- Press commentary
- International or EU regulation

---

### Internal Reference Data (Snowflake)

Internal data is used to contextualise and score obligations:

- Controls library (regulatory topic → internal control)
- SMF ownership mappings
- Product and business scope (UK insurance context)

This allows regulatory impact to be assessed against the firm’s actual operating model.

---

## Pipeline Architecture

The pipeline is deployed as an Ascend flow named:

'uk_insurance_regulatory_monitoring'

### Core Components

1. **Scheduled Trigger**
   - Runs daily at **06:30 UK time (Europe/London)**

2. **Read Connectors**
   - FCA publications
   - PRA publications

3. **Normalisation & Chunking Transforms**
   - Deduplication
   - Extraction of obligation-bearing sections (e.g. “Firms must…”)

4. **Agentic Interpretation**
   - Converts regulatory text into structured obligations

5. **Impact Scoring**
   - Quantifies regulatory impact on a 0–100 scale

6. **Write Connector**
   - Persists obligations and scores to Snowflake for audit and reporting

---

## Agentic Features

### UK Regulatory Interpretation Agent

A custom agent built using Ascend’s Otto AI, constrained by rules to:

- Operate on UK regulation only
- Preserve FCA and PRA intent without advisory interpretation
- Output structured JSON obligations
- Include verbatim citations
- Avoid inference where information is unclear

This ensures outputs are suitable for audit and supervisory review.

---

### Automated Escalation

An Ascend automation named:

'daily_uk_insurance_regulatory_monitoring'

Coordinates execution and escalation:

- **Timer sensor** runs daily at 06:30 UK time  
- **Event trigger** listens for successful flow completion  
- **Email action** sends alerts for obligations with `impact_score >= 70`

Each alert includes:
- Regulator (FCA / PRA)
- Instrument type
- Obligation summary
- Impact score
- Effective date
- Consumer Duty flag
- SMF owner
- Source URL

---

## Impact Scoring Methodology (Artefact 2)

Regulatory impact is quantified using a deterministic 0–100 scoring model combining:

- Regulatory severity
- Scope of applicability
- Implementation urgency
- Control coverage gaps
- Consumer Duty or prudential risk indicators

**Consumer Duty obligations** are weighted highest (80–100).  
A threshold of **70** distinguishes obligations requiring operational action from those that are informational.

📄 See:  
**Artefact 2 – Impact Scoring Methodology: UK Insurance Regulatory Obligations (Quantified, Defensible, Auditable)**

---

## Data Model & Lineage (Artefact 1)

The data model ensures full traceability from source regulation to escalation.

Key entities:
- Regulatory publications (FCA / PRA)
- Extracted regulatory obligations
- Impact scores and prioritisation flags
- Internal controls and SMF ownership

📄 See:  
**Artefact 1 – Entity Relationship Diagram: UK Insurance Regulatory Monitoring Pipeline**

---

## What I Learned

- Agentic AI is most valuable in regulated environments when tightly constrained
- Governance and explainability matter more than free-form generation
- The real operational value comes from **decision-making and escalation**, not summarisation
- Ascend and Otto significantly reduced time from idea to deployed pipeline while maintaining audit discipline

---

## Demo Artefacts Included

- Ascend Dataflow graph (scheduled deployment)
- Custom agent / rules configuration
- Entity Relationship Diagram (Artefact 1)
- Impact Scoring Methodology (Artefact 2)
- Example extracted obligation
- Example automated email alert

---

## Repository Structure (Suggested)

/
├── README.md
├── images/
│ ├── ascend_dataflow.png
│ ├── automation_config.png
│ ├── example_email_alert.png
│ └── obligation_example.png
├── docs/
│ ├── ERD_uk_regulatory_monitoring.png
│ └── Impact_Scoring_Methodology.pdf


---

## Notes

- This project is intentionally scoped to UK insurance regulation
- All outputs are designed to be audit-ready
- ServiceNow integration was replaced with email alerting due to connectivity constraints while preserving agentic behaviour

---


