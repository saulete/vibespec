---
description: Implement a feature batch with TDD following SPEC.md
---

Invoke the `vibespec:build` skill to implement the current batch with TDD.

This command activates the build skill which:

1. Reads SPEC.md and .vibespec/context.md
2. Identifies the active batch (first batch with unchecked SCs)
3. Creates a task breakdown in .vibespec/PLAN.md
4. Implements each task following red-green-refactor TDD cycle
5. Commits with SC-IDs for traceability
6. Auto-invokes `/verify` after completing the batch

Requires an existing SPEC.md. If none exists, suggests `/spec` first.

Usage: `/build`

To build a specific batch: `/build 2` (builds batch 2 specifically)