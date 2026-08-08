# Persona Codex Ingestion Guide

**Document ID:** TAI-PC-INGEST-001 · **Version:** 1.2 · **Classification:** Confidential — Internal Engineering
**Scope:** How to load all four persona volumes into the application as a single, queryable registry that the Tenured Agent reads at session initialization.

| Volume | Namespace | Count | Engagement Mode | ID Prefixes |
|---|---|---|---|---|
| **TAI-PC-001** Technical Persona Codex | `TECH` | 100 | `CHALLENGER` | `P_ARCH`, `P_ORCH`, `P_STRAT`, `P_GUARD`, `P_CREAT`, `P_LEDG`, `P_DATA`, `P_SRE`, `P_SEC`, `P_ENT` |
| **TAI-PC-002** Non-Tech Persona Codex | `NONTECH` | 100 | `EVALUATOR` | `P_CLIN`, `P_FIN`, `P_LEG`, `P_NRG`, `P_EDU`, `P_DEF`, `P_LOG`, `P_HR`, `P_URB`, `P_STR` |
| **TAI-PC-003** Academic Codex, Part I | `ACADEMIC` | 100 | `JOURNEY` | `S_COMP`, `S_ECON`, `S_CLIN`, `S_GOV`, `S_NRG`, `S_URB`, `S_COG`, `S_LOG`, `S_MED`, `S_EDU` |
| **TAI-PC-003-II** Academic Codex, Part II | `ACADEMIC` | 80 | `JOURNEY` | `S_SOC`, `S_ENG`, `S_HIS`, `S_JOU`, `S_PHI`, `S_EDU2`, `S_MGT`, `S_WRI` |

**Total: 380 configurations across three namespaces and three engagement modes.**

---

## 1. The Core Problem

The four codices were authored to three different schemas, and sequence numbers repeat across volumes (both enterprise codices number 001–100; the academic codex runs 001–180 across its two parts). They cannot be concatenated as-is.

| | CHALLENGER (TECH) | EVALUATOR (NONTECH) | JOURNEY (ACADEMIC I + II) |
|---|---|---|---|
| **Model** | Drops a candidate into a broken world | Reviews AI output as a skeptical operator | Describes how a *student* builds a Passport over time |
| **Fields** | Profile · Hard-Gate · Proving Ground · Chaos Engine | Focus · System Prompt · Approval/Refusal/Output | Archetype (Major/Minor/Passion) · Drive · Augmentation Strategy · Tier Injection |
| **Scoring** | Standard Triple-Threat | Standard Triple-Threat | **Standard for Part I STEM; recalibrated for non-technical tiers (see §5)** |

Resolve this with a **namespace field**, a **`global_key`**, and an **`engagement_mode`** discriminator. Prefixes never overlap across volumes, so `namespace + persona_id` is globally unique.

---

## 2. Unified Registry Schema

Every persona normalizes to one record. Mode-specific fields live in a typed `config` block; a `scoring_profile` block (§5) governs how the marks are computed.

```jsonc
{
  "namespace": "TECH | NONTECH | ACADEMIC",   // required
  "persona_id": "S_SOC_01",                    // native ID from source codex
  "global_key": "ACADEMIC:S_SOC_01",           // namespace + persona_id — unique PK
  "seq": 101,                                  // sequence within its codex (academic runs 1-180)
  "name": "Civic Infrastructure Demographer",
  "tier": 11,
  "tier_label": "Sociology & Anthropological Sciences",
  "tier_group": "LIBERAL_ARTS_HUMANITIES",     // academic only; else null
  "engagement_mode": "CHALLENGER | EVALUATOR | JOURNEY",
  "primary_metric": "AICI",
  "entropy_level": "EXTREME | HIGH | MEDIUM | VARIABLE | LOW",
  "scoring_profile": "STANDARD | NONTECH_ORCHESTRATION",   // see §5
  "config": {
    // engagement_mode = CHALLENGER (TECH)
    "profile": "...", "hard_gate": { "AIBS": 0.9, "AIOI": 0.1 },
    "proving_ground": "...", "chaos_engine": { "name": "...", "setting": "..." },

    // engagement_mode = EVALUATOR (NONTECH)
    "focus": "...", "system_prompt": "You are the...",
    "interaction_rules": { "approval_threshold": "...", "refusal_condition": "...", "output_constraint": "..." },
    "evaluation_criteria": "...",

    // engagement_mode = JOURNEY (ACADEMIC)
    "archetype_discipline": "Sociology Major / Urban Studies Minor / Civic Data Passion",
    "core_academic_drive": "...",
    "platform_augmentation_strategy": "...",
    "tier_injection": {                        // shared by all 10 archetypes in the domain
      "role": "Forensic Demographer & Civic Hardware Auditor",
      "behavioral_rules": "...",
      "runs_under": "UNIVERSAL_BASE_PROMPT"
    }
  }
}
```

**Field derivation notes**
- `hard_gate` weights are normalized floats summing to 1.0 (`AIBS (90%) · AIOI (10%)` -> `{ "AIBS": 0.9, "AIOI": 0.1 }`).
- `tier_group` applies only to ACADEMIC: `STEM_APPLIED` (Part I, Tiers I-X), `LIBERAL_ARTS_HUMANITIES` (Part II, Tiers XI-XV), `ENTERPRISE_ORCHESTRATION` (Part II, Tiers XVI-XVIII).
- `tier_injection` is a **domain-level** object: all ten archetypes in a JOURNEY tier share one injection. Store it once per tier and reference it, or denormalize onto each record — but keep it identical within a tier.
- `entropy_level` — JOURNEY personas default to `MEDIUM`; they are progression-driven, not injection-driven, though their tier injection still arms a Feasibility Filter failure.

---

## 3. Ingestion Steps

1. **Parse each volume to records.** Set `namespace`, `engagement_mode`, and `scoring_profile` per volume. For ACADEMIC, set `tier_group` and attach the shared `tier_injection`.
2. **Validate cardinality.** Assert 100 / 100 / 100 / 80 per volume; 10 per tier; every `persona_id` prefix belongs to its volume's allowed set. Reject the batch on any miss.
3. **Assign `global_key`** as `{namespace}:{persona_id}`; enforce a unique constraint.
4. **Load into the Persona Registry.** Index on `global_key` (PK), `namespace`, `tier`, `primary_metric`, `scoring_profile`.
5. **Sign the registry.** Compute a `Registry_Signature` (hash of the sorted record set) for load-time verification (§4).

---

## 4. Runtime — How the Agent Consumes It

Session context resolves through the initialization function, keyed on the namespaced global key:

```
ProvingGroundContext = f(global_key, Entropy_Threshold, Registry_Signature)
```

- **CHALLENGER** -> instantiate a Proving Ground: load `proving_ground`, arm the `chaos_engine`, grade telemetry against `hard_gate` weights.
- **EVALUATOR** -> instantiate a review posture: inject `system_prompt` as the Agent's persona, gate output through `approval_threshold` / `refusal_condition` / `output_constraint`.
- **JOURNEY** -> instantiate a student onboarding path: load the domain `tier_injection` beneath the Universal Base Prompt as the Proving Ground evaluator, then use `core_academic_drive` to seed the Forge baseline and `platform_augmentation_strategy` to sequence the learning loop. Apply the record's `scoring_profile` (§5).

Modes are composable: an EVALUATOR pre-review can gate a CHALLENGER build session, and a JOURNEY path culminates in CHALLENGER Hard-Gates — all scoring into the same Triple-Threat Vector defined in **TAI-SC-001**.

---

## 5. The Non-Technical Scoring Override

**New in v1.2.** Academic Part II introduces a recalibrated scoring matrix for the non-technical tiers. The engine must apply it via the `scoring_profile` field — do **not** score these personas with the standard Triple-Threat rubric. **One invariant holds across every profile and every volume: AICI is always the same base-competency mark from the Score Compendium and is never redefined.** The override affects only AIOI (reinterpreted) and AIBS (excluded).

| `scoring_profile` | Applies To | Mark Behavior |
|---|---|---|
| `STANDARD` | All TECH · all NONTECH · ACADEMIC Part I STEM tiers | AICI / AIOI / AIBS computed per the Score Compendium. |
| `NONTECH_ORCHESTRATION` | ACADEMIC Part II, Tiers XI-XVIII (all Humanities & Enterprise Orchestration) | See rules below. |

Under `NONTECH_ORCHESTRATION`:

1. **AICI is unchanged.** It remains the canonical base-competency mark defined in the Score Compendium — the ability to use AI as a cognitive partner, safely, ethically, and with precision. The recalibration does **not** redefine AICI as physical anchoring. The physical-world framing of these tiers is an **evaluation lens applied by the tier injection during the session** (`config.tier_injection`), not a change to what the mark measures. Store it there, never in the AICI definition.
2. **AIOI** is read as an **Organizational / project-management** index — orchestrating multi-agent systems, overseeing AI workflows, handling project logistics. It is **not** the developer-orchestration reading used in the enterprise codices. This is the only mark whose *interpretation* changes under this profile.
3. **AIOI-ED** receives all routing for Tier XVI (Educational Careers) and any record flagged `educator_profile = true` in Tiers XI, XV, and XVIII.
4. **AIBS is excluded** from the baseline. Set it to `null` / opt-in — never a zero or a penalty. A record under this profile that surfaces an AIBS gap in a recruiter view is a scoring bug.

```jsonc
// example flag block on a NONTECH_ORCHESTRATION record
"scoring_profile": "NONTECH_ORCHESTRATION",
"mark_rules": {
  "AICI": "standard_base_competency",   // SAME as Score Compendium — do not redefine
  "AIOI": "orchestration_project_mgmt", // the only reinterpreted mark
  "AIOI_ED": "route_if_educator_or_tier_XVI",
  "AIBS": "excluded_optin"              // never render as 0 in a Passport
},
"evaluation_lens": "physical_world_constraint"  // applied by tier_injection at session time, NOT a mark redefinition
```

---

## 6. Migration Checklist

- [ ] Add `namespace`, `engagement_mode`, `tier_group`, and `scoring_profile` columns to the Persona Registry.
- [ ] Backfill existing PC-001 rows: `namespace=TECH`, `engagement_mode=CHALLENGER`, `scoring_profile=STANDARD`.
- [ ] Load PC-002: `namespace=NONTECH`, `engagement_mode=EVALUATOR`, `scoring_profile=STANDARD`.
- [ ] Load PC-003 Part I: `namespace=ACADEMIC`, `engagement_mode=JOURNEY`, `tier_group=STEM_APPLIED`, `scoring_profile=STANDARD`.
- [ ] Load PC-003 Part II: `namespace=ACADEMIC`, `engagement_mode=JOURNEY`, `tier_group` in {LIBERAL_ARTS_HUMANITIES, ENTERPRISE_ORCHESTRATION}, `scoring_profile=NONTECH_ORCHESTRATION`.
- [ ] Store the 18 `tier_injection` objects once per academic tier; reference from member records.
- [ ] Enforce unique constraint on `global_key`.
- [ ] Update session-init to key on `global_key`, not bare `persona_id`.
- [ ] Implement the `NONTECH_ORCHESTRATION` branch in the scoring engine; assert AIBS is never rendered as `0` for these records.
- [ ] Publish `Registry_Signature` to the Sovereign Ledger anchor per **TAI-PAT-010**.

---

*Companion documents: TAI-SC-001 (Score Compendium) · TAI-PC-001 · TAI-PC-002 · TAI-PC-003 · TAI-PC-003-II · Tenured Agent Core Context Initialization Guide v2.0.*
