---
description: Define a new feature with Working Backwards and falsifiable Success Criteria
---

Invoke the `vibespec:spec` skill to define a new feature with Working Backwards and falsifiable Success Criteria.

This command activates the spec skill which:

1. Checks for `.vibespec/context.md` — creates it if missing
2. Guides you through Working Backwards questioning
3. Forces falsifiable Success Criteria (if you can't test it, it's not a criterion)
4. Proposes anti-waterfall batches
5. Writes SPEC.md to the project root

If a SPEC.md already exists, this command will ask whether to archive the current feature first (via `/iterate`) or replace it.

Usage: `/spec`