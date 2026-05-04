---
name: vibespec-iterate
description: Move to the next batch or archive a completed feature. Updates context.md features list, archives to .vibespec/archive/, suggests next feature.
---

# iterate — Siguiente batch, siguiente feature

Version: 1.0.0

## Trigger

This skill MANDATORILY activates when:
- User invokes `/iterate` command
- User says "next", "next batch", "next feature", "what's next", "archive this", or similar
- `/build` finishes all batches of a feature
- `/verify` reports READY on the final batch

DO NOT activate when verification has not been run or reports NOT READY. In that case, suggest fixing gaps first.

## Philosophy

Iterate is the bridge between features. It closes one chapter and opens the next, ensuring nothing is left hanging. It keeps the project moving forward by connecting each completed feature to the next one in the backlog, while allowing the user to adjust priorities based on what they've learned.

This skill respects the anti-waterfall principle: after each feature, the user can reorder, add, remove, or replace what comes next. The Features list in context.md is directional, not contractual.

## Steps

### Step 1: Assess current state

1. Read `SPEC.md` from the project root.
2. Read `.vibespec/VERIFICATION.md` if it exists.
3. Read `.vibespec/context.md`.
4. Check the batch status in SPEC.md:
   - Are all batches complete (all SCs marked `[x]`)?
   - Or are there remaining batches?

### Step 2: Feature still has remaining batches

If SPEC.md has incomplete batches:

1. Show the user:
   - Completed: [list of batches and SCs that are done]
   - Remaining: [list of batches and SCs still to do]
2. Ask: "¿Continuas con Batch N o prefieres ajustar algo?"

If they continue:
- Update PLAN.md with the tasks for the next batch
- Suggest: `/build` to start the next batch

If they want to adjust:
- Let them modify SPEC.md (add SCs, reorder batches, add Amendments)
- Then suggest: `/build` to start the next batch with the updated spec

### Step 3: Feature is complete — Archive

If ALL batches in SPEC.md have all SCs marked `[x]`:

1. Create archive directory:
   ```
   .vibespec/archive/[NNN]-[feature-slug]/
   ```
   Where NNN is the next sequential number and feature-slug is derived from the SPEC.md title.

2. Move into the archive:
   - `SPEC.md` → `.vibespec/archive/[NNN]-[feature-slug]/SPEC.md`
   - `.vibespec/VERIFICATION.md` → `.vibespec/archive/[NNN]-[feature-slug]/VERIFICATION.md`
   - `.vibespec/PLAN.md` → `.vibespec/archive/[NNN]-[feature-slug]/PLAN.md` (if exists)

3. Remove SPEC.md from the project root (it's been archived).

4. Tell the user: "Feature '[name]' archivada en `.vibespec/archive/[NNN]-[slug]/`. SPEC.md limpiado de la raíz."

### Step 4: Next feature

1. Read the Features list from `.vibespec/context.md`.
2. Show the user the current list:
   ```
   Features (ordenadas por prioridad):
   1. reading-list — ✅ completada
   2. book-reviews — Añadir reviews y ratings
   3. pasarela-pago — Integrar Stripe para checkout
   4. ??? — Por decidir
   ```
3. Ask: "La siguiente feature es '[next feature]'. ¿Continuas con esa, quieres reordenar, o añadir algo nuevo?"

If they continue:
- Suggest: `/spec` to create the SPEC.md for the next feature

If they reorder:
- Update the Features list in context.md
- Then suggest: `/spec` for the new top feature

If they add something new:
- Add it to the Features list in context.md at the appropriate position
- Then suggest: `/spec` for the feature they want to start

If they're done for now:
- "Proyecto en pausa. Ejecuta `/spec` cuando quieras empezar la siguiente feature."

### Step 5: Restore a previous feature (optional)

If the user says "go back to" or "restore" a feature:

1. Show available archives:
   ```
   .vibespec/archive/
   ├── 001-reading-list/
   ├── 002-carrito-compra/
   └── 003-pasarela-pago/
   ```
2. Copy the archived SPEC.md back to the project root:
   ```
   .vibespec/archive/001-reading-list/SPEC.md → ./SPEC.md
   ```
3. Ask: "SPEC.md de '[feature name]' restaurado. ¿Quieres continuar desde donde lo dejaste o reespecificar?"

If continuing:
- Unarchive PLAN.md and VERIFICATION.md too
- Suggest: `/build` to continue from the next unfinished batch

If re-specifying:
- Clear the archived SCs and batches (or start fresh)
- Suggest: `/spec` to rewrite the spec based on new learnings

## Important rules

1. NEVER archive a feature that has incomplete or failing Success Criteria. Always suggest `/verify` first.
2. NEVER delete archived features. The archive is the project's history — it shows what was built, when, and how it was verified.
3. ALWAYS update context.md's Features list when priorities change. That list is the source of truth for what comes next.
4. ALWAYS leave the project root clean after archiving — no stale SPEC.md, no stale PLAN.md.
5. ALWAYS suggest `/spec` for the next feature rather than auto-generating it. Spec creation requires human thought.
6. NEVER auto-reorder the Features list. The user decides priorities.