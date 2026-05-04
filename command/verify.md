---
description: Verify implementation matches SPEC.md — tests, Success Criteria, spec drift
---

Invoke the `vibespec:verify` skill to verify that the current implementation matches the spec.

This command activates the verify skill which:

1. Runs the full test suite
2. Cross-references each Success Criterion against actual tests
3. Assigns PASS/FAIL verdicts with evidence
4. Detects spec drift (implementation ≠ specification)
5. Adds Amendments to SPEC.md if drift found (never overwrites)
6. Generates .vibespec/VERIFICATION.md

Does not modify code. If verification fails, reports gaps and suggests fixes.

Usage: `/verify`