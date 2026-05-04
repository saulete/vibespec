---
name: vibespec-spec
description: Define a new feature with Working Backwards and falsifiable Success Criteria. Creates context.md and SPEC.md.
---

# spec — Piensa antes de codificar

Version: 1.0.0

## Trigger

This skill MANDATORILY activates when:
- User wants to start a new feature or project
- User says "let's spec this", "write a spec", "define this feature", " Working Backwards", or similar
- No SPEC.md exists in the project root
- User asks "what should I build?" or "how should I approach this?"
- User invokes `/spec` command

DO NOT activate when a SPEC.md already exists and the user wants to build. In that case, suggest `/build` instead.

## Philosophy

The spec skill is the quality gate of VibeSpec. Its purpose is to enforce Working Backwards thinking BEFORE any code is written. It does not generate specs automatically — it forces the user to think through what they want and express it in falsifiable terms.

This skill NEVER invents metrics. NEVER fills in gaps with assumptions. If information is missing, it says so and asks the user to provide it.

## Steps

### Step 1: Check context

Read `.vibespec/context.md` if it exists. If it does NOT exist:

1. Ask the user:
   - "¿Qué estás construyendo? Describe el producto en 2-3 frases."
   - "¿Qué stack usas? (lenguaje, framework, base de datos, etc.)"
   - "¿Qué convenciones sigues? (linting, testing, commit format, etc.)"
   - "¿Qué features tienes en mente? Lista en orden de prioridad, puede incluir ???"

2. Write `.vibespec/context.md` with the responses.

If context.md EXISTS:
- Read it and use it as background for the spec.
- Check the Features list. If SPEC.md does not exist, suggest the next feature in the list.

### Step 2: Working Backwards questioning

Ask the user about the feature they want to build. Use these prompts in order:

1. **Outcome**: "When this feature is done, what will the user be able to do that they can't do now?"
2. **Evidence**: "How will you know it works? What can you observe or measure?"
3. **Audience**: "Who is this for? Be specific — not 'everyone', but a concrete type of user."
4. **Scope boundary**: "What is explicitly NOT in this feature? What are you saying no to?"

DO NOT proceed to Step 3 until the user has answered all four questions with concrete, non-vague information.

**Red flags to push back on:**
- "Mejorar UX" → "¿Qué significa mejorar? ¿Qué puede observar un usuario diferente?"
- "Hacerlo más rápido" → "¿Más rápido que qué? ¿Cuál es el baseline y el target?"
- "Funcionalidad completa" → "¿Qué significa completo? ¿Qué queda fuera?"
- "Como [competidor]" → "¿Qué hace [competidor] que quieres tú? ¿Qué no quieres?"

### Step 3: Falsifiable Success Criteria

Convert the user's answers into Success Criteria. Each criterion MUST be:

1. **Observable**: You can see it, measure it, or test it
2. **Specific**: No ambiguity in what "done" means
3. **Falsifiable**: A test can pass or fail — no partial credit

Format: `- [ ] SC-NN: [description] ([baseline] → [target])`

Examples:
- GOOD: `SC-01: Classificador detecta queries ambiguas con ≥90% precisión (50 queries test: 25 ambiguas, 25 específicas)`
- BAD: `SC-01: Mejorar la búsqueda` (not falsifiable)
- BAD: `SC-02: Hacerlo rápido` (not observable without a number)
- GOOD: `SC-02: Facetas se generan en <200ms p99 (actual: 350ms → target: <200ms)`

**CRITICAL RULE**: If you cannot write a test for a Success Criterion, the criterion is not falsifiable. Tell the user: "No puedo escribir un test que verifique esto. ¿Puedes reformularlo para que sea observable y medible?"

### Step 4: Anti-waterfall batches

Organize the Success Criteria into batches. Each batch MUST:

1. **Deliver value independently**: The batch works without needing the next batch
2. **Be end-to-end**: Not "infra first, UI later" — each batch should go from backend to user-visible result
3. **Be small enough to complete in 1-3 days**: If a batch has more than 5 Success Criteria, consider splitting it

Ask the user:
- "Batch 1 delivers [value]. Batch 2 delivers [value]. Can each batch work on its own?"
- "Is there a batch that's just infrastructure with no user-visible result? If yes, merge it with the next batch."

### Step 5: Write SPEC.md

Write SPEC.md in the project root with this exact structure:

```markdown
# Feature: [name]

## Working Backwards
[2-3 sentences: when this is done, the user can... and we know it works because...]

## For Whom
[1-2 specific user types — not "everyone"]

## Success Criteria (falsifiable)
- [ ] SC-01: [description] ([baseline] → [target])
- [ ] SC-02: [description] ([baseline] → [target])

## Out of Scope
- [What you're NOT doing and why]

## Batches (anti-waterfall)
### Batch 1: [name that describes the value delivered]
- Implements: SC-01, SC-02
### Batch 2: [name that describes the value delivered]
- Implements: SC-03, SC-04

## Amendments
[Leave empty — this section auto-populates when spec drifts from implementation]
```

DO NOT add sections beyond these. SPEC.md must stay focused and scannable.

### Step 6: Handoff

After writing SPEC.md, tell the user:

"SPEC.md creado. Siguiente paso: `/build` para implementar Batch 1 con TDD."

If context.md was created in Step 1, also remind the user: "He creado `.vibespec/context.md` con la información del proyecto. Revísalo y ajusta las features o convenciones si hace falta."

## Important rules

1. NEVER write code during this skill. This skill is 100% about thinking and defining.
2. NEVER invent metrics or baselines. If the user doesn't know, write `[⚠️ Definir: baseline]` and ask them to find out.
3. NEVER skip the falsifiable test. Every Success Criterion must pass the "can I write a test for this?" check.
4. NEVER create batches that are infrastructure-only without user-visible value.
5. ALWAYS write SPEC.md in the project root, not inside `.vibespec/`.
6. ALWAYS use Spanish for the document structure headers if the user communicates in Spanish, but keep SC-IDs and technical terms in English.