---
description: Move to next batch or archive completed feature, suggest next feature
---

Invoke the `vibespec:iterate` skill to move to the next batch or archive a completed feature.

This command activates the iterate skill which:

1. Assesses current state — which batches are done, which remain
2. If remaining batches: suggests `/build` for the next batch
3. If feature complete: archives SPEC.md + VERIFICATION.md + PLAN.md to .vibespec/archive/
4. Reads the Features list from context.md and suggests the next feature
5. Allows reordering, adding, or replacing features in the backlog

To restore a previous feature: `/iterate --restore 001`
To force archive even with incomplete SCs: `/iterate --force-archive`

Usage: `/iterate`