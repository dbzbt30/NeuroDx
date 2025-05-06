Section A – Product Vision (≤ 150 words)
NeuroLocal is a mobile‑first, point‑of‑care web app that turns bedside neuro‑exam findings into instantaneous, probabilistic lesion‑localisation and dynamic differential diagnoses. In ≤ 7 taps, residents and emergency clinicians receive:

the most likely neuro‑axis level (cortex → NMJ) with confidence bars;

ranked disease list with red‑flag alerts;

micro‑explanations linking each physical finding to the updated probabilities.
By marrying Bayesian updating with human‑centred UX, NeuroLocal shortens diagnostic reasoning time from minutes to seconds, reduces cognitive load, and teaches while it works—empowering clinicians to treat faster and learn deeper.

flowchart TD
    Start([Start<br/>"What triggered neuro consult?"])
    Start --> HX{Red‑flag clues?<br/>(trauma, fever, CA, anticoag?)}
    HX -->|Yes| Emerg[Emergent pathway<br/>→ imaging/LP hooks<br/>+ safety checklist]
    HX -->|No| GCS[Glasgow Coma Scale / Orientation]
    GCS --> LOC{↓ LOC?}
    LOC -->|Yes| Cortex[↳ Supratentorial lesion<br/>→ ask focal motor/sens]
    LOC -->|No| CNs[Cranial nerves I–XII screen]
    CNs --> CNFind{Single vs Multiple CNs?}
    CNFind -->|Single| CNLevel[Map nucleus/fasicle<br/>side ↔ CN]
    CNFind -->|Multiple| Brainstem[↳ Crossed signs? → Level medulla‑midbrain]
    CNs --> PNSCheck{Peripheral pattern?}
    PNSCheck -->|Yes| LMN[LMN signs<br/>→ Nerve root vs Plexus vs Nerve]
    CNs --> Motor[Motor Tone & Power]
    Motor --> UMN{UMN signs?}
    UMN -->|Yes| Cord[Cord level? → Dermatomal sensory + DTR pattern]
    UMN -->|No| Sens[Sensory Modalities]
    Sens --> Patchy{Stocking‑glove / dermatomal?}
    Patchy -->|Stocking| PolyNeuropathy[↳ Polyneuropathy list]
    Patchy -->|Dermatome| Radiculopathy
    Sens --> Cereb[Cerebellar / Gait / Romberg]
    Cereb -->|Ataxia + dysmetria| Cerebellum
    Cereb -->|Romberg + proprioceptive loss| DCML
    %% Exit nodes
    Cortex & CNLevel & Brainstem & Cord & LMN & PolyNeuropathy & Radiculopathy & Cerebellum & DCML --> Result([Output:<br/>Lesion site + Ranked DDx<br/>+ confidence interval])


flowchart LR
    A[🧠  Home / “Start Neuro Exam”] --> B[Step 1: Red‑flags chips<br/>☑ Trauma ☑ Fever …]
    B --> C[Step 2: Glasgow Coma Scale<br/>▲ / ▼ steppers]
    C --> D[Live DDx bar (updates)]
    D --> E[Step 3: Cranial Nerve Quick‑Pick<br/>Grid of XII toggle‑chips]
    E --> F[Step 4: Motor & Reflex sliders<br/>0–5 strength, +/‑ Babinski]
    F --> G[Step 5: Sensory modal switches<br/>LT | Pin | Vib | Prop]
    G --> H[Summary screen<br/>• Lesion map image<br/>• DDx list w/ probs<br/>• Red‑flag alerts<br/>• “Share PDF” button]
    style D fill:#eef,stroke:#55f,stroke‑width:2px
    click H "#"

Section D – DDx Algorithm & Data Schema

init_prior = load_prior_probs()        # Pre‑valence by setting
for finding in user_inputs_sequential():
    LR_pos, LR_neg = lookup_LRs(finding)      # literature table
    if finding.present:
        posterior = bayes(init_prior, LR_pos)
    else:
        posterior = bayes(init_prior, LR_neg)
    init_prior = normalize(posterior)
# Determine lesion level via deterministic rules + highest‑prob categories
lesion_site = infer_site(user_inputs, rules_engine)
return lesion_site, ranked(posterior), CI(posterior)

Key Tables (PostgreSQL)

| Table             | Fields                                                             |
| ----------------- | ------------------------------------------------------------------ |
| `diseases`        | `id`, `name`, `category`, `site`, `icd10`                          |
| `findings`        | `id`, `name`, `type`, `laterality`, `lr_pos`, `lr_neg`, `citation` |
| `disease_finding` | `disease_id`, `finding_id`, `strength`                             |
| `sessions`        | `session_uuid`, `timestamp`, `encrypted_answers`, `result_blob`    |

Section E – Technical Architecture & API

| Layer                                             | Tech                                      | Reason                                          |
| ------------------------------------------------- | ----------------------------------------- | ----------------------------------------------- |
| **Front‑end**                                     | React 18 + TypeScript, Vite, Tailwind CSS | PWA speed, design consistency                   |
| **State**                                         | Zustand (lightweight)                     | Simple global store, works offline              |
| **Offline**                                       | Dexie wrapper over IndexedDB              | Saves sessions in trauma bays                   |
| **Back‑end**                                      | Fastify (Node 20)                         | Low‑latency JSON API                            |
| **DB**                                            | PostgreSQL + pgvector (optional)          | Relational LRs; vector search for similar cases |
| **ML Service**                                    | Python/Flask micro‑service (Docker)       | Future: GPT‑4o explanation engine               |
| **Auth**                                          | Magic‑link (Clerk) + JWT                  | Passwordless, HIPAA/PIPEDA compliant            |
| **Hosting**                                       | Fly.io (edge)                             | Global low latency                              |
| **CI/CD**                                         | GitHub Actions → Fly deploy               | Auto‑tests on PR; canary releases               |
| **API Contracts (OpenAPI)**                       |                                           |                                                 |
| `POST /session` → create draft                    |                                           |                                                 |
| `PATCH /session/{id}` → stream posterior updates  |                                           |                                                 |
| `GET /diseases?site={brainstem}` → reference list |                                           |                                                 |
| All endpoints require `Authorization: Bearer`     |                                           |                                                 |
Security: row‑level tenancy, AES‑256 at rest, TLS 1.3 in transit, audit logs immutable (Supabase Vault).



