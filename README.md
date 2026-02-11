# UK Insurance Regulatory Monitoring Pipeline  
**Agentic Regulatory Interpretation & Escalation using Ascend**

> Ascend Hackathon Submission  
> Category: Agentic Data Pipelines  
> Jurisdiction: United Kingdom (Insurance)

https://asc-b5f5b931-1391-426c.app.ascend.io/project/default/production/flows/uk_insurance_regulatory_monitoring

---

🏆 **Hackathon Winner**

This solution was awarded 1st place in the Ascend Agentic Engineering Hackathon.  
A feature write-up highlighting the solution is available here:

[https://app.therundown.ai/guides/build-a-brand-twin-that-writes-every-post-in-your-exact-voice](https://www.ascend.io/blog/three-pipelines-three-industries-one-platform-meet-the-winners-of-our-latest-hackathon)

---

## Overview

UK insurance firms must continuously monitor regulatory publications from the Financial Conduct Authority - [FCA](https://www.fca.org.uk/) and the Prudential Regulation Authority - [PRA](https://pra.directory/). These publications are narrative, frequent, and often difficult to translate into clear, auditable actions, particularly under the FCA’s Consumer Duty regime.

This project demonstrates a **deployed, scheduled, agentic pipeline** built in Ascend that:
- Ingests UK insurance regulatory publications
- Uses an AI agent to extract enforceable obligations
- Quantifies regulatory impact in a defensible way
- Automatically escalates high-impact obligations via email alerts

The pipeline is intentionally scoped to UK insurance regulation only and designed to be production-minded and audit-ready.

![](images/production_screenshot.png)

---

## Problem Being Solved

Compliance teams must manually monitor FCA and PRA publications, interpret regulatory intent, and demonstrate traceability from regulation to internal action. This process is slow, inconsistent, and difficult to audit. The pipeline automates interpretation and escalation of regulatory change, reducing manual effort while improving auditability.

---

## Data Sources

### Regulatory Sources (Read Connectors)

The pipeline processes the following UK regulatory publications:

- **FCA**
  - Policy Statements  
  - Handbook updates   
  - Consumer Duty publications  

- **PRA**
  - Supervisory Statements  
  - Policy Statements  

Explicitly excluded:
- Speeches  
- Blogs and commentary  
- International / EU regulation  

---

### Internal Reference Data (Snowflake)

Internal reference data is used to contextualise obligations:

- Controls library (regulatory topic → control)
- SMF ownership mappings
- Product and business scope (UK insurance)

This ensures obligations are assessed against the firm’s real operating model.

![](images/snowflake_screenshot.png)

---

## Pipeline Architecture (Ascend)

The pipeline is deployed as an Ascend flow:

'uk_insurance_regulatory_monitoring'

![](images/pipeline_flow_screenshot.png)

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
  
   ![](images/process_slide.png)

---

## Agentic Features

### UK Regulatory Interpretation Agent

A custom agent built using Ascend’s Otto AI, constrained to UK regulation only, preserves FCA and PRA intent, outputs structured JSON obligations with verbatim citations, and avoids inference where information is unclear.

See full agent configuration at: [uk-regulatory-interpretation.md](artefacts/uk-regulatory-interpretation.md)

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
- Obligation summary
- Impact score
- Effective date
- Consumer Duty flag
- Source URL

![](images/email_alert_screenshot.png)

---

## Impact Scoring Methodology

[Impact Scoring Methodology: UK Insurance Regulatory Obligations](https://asc-b5f5b931-1391-426c.app.ascend.io/otto/artifact/tooluse_hOnMexGoo6Greioz1HaRSa)

Regulatory impact is quantified using a deterministic 0–100 scoring model combining:

- Regulatory severity
- Scope of applicability
- Implementation urgency
- Control coverage gaps
- Consumer Duty or prudential risk indicators

**Consumer Duty obligations** are weighted highest (80–100).  
A threshold of **70** distinguishes obligations requiring operational action from those that are informational.

![](images/scoring_screenshot.png)

---

## Data Model & Lineage

[Entity Relationship Diagram: UK Insurance Regulatory Monitoring Pipeline](https://asc-b5f5b931-1391-426c.app.ascend.io/otto/artifact/tooluse_JXEJs8PYRIV91GLtNo1xIo)

The data model ensures full traceability from source regulation to escalation.

Key entities:
- Regulatory publications (FCA / PRA)
- Extracted regulatory obligations
- Impact scores and prioritisation flags
- Internal controls and SMF ownership

![](images/erd_screenshot.png)

---

## What I Learned

- Agentic AI is most valuable in regulated environments when tightly constrained
- Governance and explainability matter more than free-form generation
- The real operational value comes from decision-making and escalation
- Ascend and Otto significantly reduced the time from idea to deployed pipeline while maintaining audit discipline

---

## Demo Artefacts Included

- Ascend Dataflow and Process Slide
- Custom agent/rules configuration
- Entity Relationship Diagram 
- Impact Scoring Methodology
- Example automated email alert

---

## Notes

- This project is intentionally scoped to UK insurance regulation
- All outputs are designed to be audit-ready
- ServiceNow integration was replaced with email alerting due to connectivity constraints while preserving agentic behaviour

---


