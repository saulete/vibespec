---
name: vibespec-verify
description: Verify that the implementation matches SPEC.md. Runs tests, checks each Success Criterion, detects spec drift, generates VERIFICATION.md.
---

# verify — Demuestra que funciona

Version: 1.0.0

## Trigger

This skill MANDATORILY activates when:
- User invokes `/verify` command
- User says "verify this", "check if it works", "validate", "prove it", or similar
- User completes a batch via `/build` and wants confirmation
- `/build` auto-invokes verification after a batch

DO NOT activate as a substitute for `/build`. If the user hasn't built anything yet, suggest `/spec` first.

## Philosophy

Verification is the moment of truth. This skill compares what was promised in SPEC.md against what actually exists in the codebase. It does not trust claims — it looks for evidence. Every Success Criterion gets a PASS or FAIL based on observable, testable proof.

This skill is adversarial by design. It assumes nothing works until proven. It is the user's ally in catching gaps before they ship.

## Steps

### Step 1: Load artifacts

1. Read `SPEC.md` from the project root.
2. Read `.vibespec/context.md` if it exists.
3. Read `.vibespec/PLAN.md` if it exists.
4. Identify which Success Criteria are marked `[x]` (claimed done) vs `[ ]` (pending) in SPEC.md.

### Step 2: Run tests

1. Detect the test runner from context.md or the project's package.json/Makefile/pyproject.toml/etc.
2. Run the full test suite.
3. Record the result: number of tests, pass/fail/skip counts.

If tests fail:
- Report the failures clearly.
- DO NOT proceed to Step 3 — verification cannot continue with failing tests.
- Suggest: "Tests failing. Fix them first, then run /verify again."

### Step 3: Verify each Success Criterion

For each Success Criterion in SPEC.md:

1. **Read the criterion text** in SPEC.md
2. **Find the corresponding test(s)** in the codebase — search for references to the SC-ID (e.g., SC-01) in test files and test descriptions
3. **Cross-reference**: Does the test actually verify what the criterion promises?
   - If the criterion says "≥90% precision" but the test only checks "returns a result" → FAIL (test is insufficient)
   - If the criterion says "<200ms p99" but the test doesn't measure latency → FAIL (no performance test)
4. **Run the specific test** if not already run
5. **Assign a verdict**:
   - **PASS**: Test exists, test passes, test verifies the criterion
   - **FAIL**: Test exists but fails, OR test doesn't properly verify the criterion
   - **SKIP**: No test found for this criterion → automatic FAIL (unverified = not done)

### Step 4: Detect spec drift

Compare the implementation against the SPEC.md:

1. Read the source code files that were created/modified for this feature
2. For each Success Criterion, check if the implementation matches what was specified:
   - Were parameters added that aren't in the spec?
   - Were behaviors implemented differently than described?
   - Were features built that aren't in any Success Criterion?
3. If drift is detected:
   - **DO NOT rewrite SPEC.md**
   - Add an Amendment to SPEC.md:
     ```
     - AMEND-NN: [commit SHA] [what changed and why] — [date]
     ```

Drift is expected and healthy — it means the implementation taught you something the spec didn't anticipate. The important thing is recording it, not hiding it.

### Step 5: Generate VERIFICATION.md

Write `.vibespec/VERIFICATION.md`:

```markdown
# Verification: [feature name]

Date: [ISO date]
Batch verified: [N] — [batch name]

## Test Results
- Total: [N] tests
- Passed: [N]
- Failed: [N]
- Skipped: [N]

## Success Criteria

| ID | Criterion | Verdict | Evidence |
|----|-----------|---------|----------|
| SC-01 | [criterion text] | PASS/FAIL | [test name or explanation] |
| SC-02 | [criterion text] | PASS/FAIL | [test name or explanation] |

## Spec Drift

| Amendment | Description | Reason |
|-----------|-------------|--------|
| AMEND-01 | [what changed] | [why] |

## Overall Verdict
[READY/NOT READY] — [summary]
```

Overall verdict:
- **READY**: All SCs in the batch have PASS, no critical drift
- **NOT READY**: Any SC has FAIL, or critical unaddressed drift

### Step 6: Report and suggest

Report the verification results to the user:

- If READY: "Batch N verificado. Todos los Success Criteria pasan. Siguiente paso: `/iterate` para continuar con el siguiente batch o archivar esta feature."
- If NOT READY: "Verification found gaps: [list FAILs]. Fix these first, then run `/verify` again."

If spec drift was detected, explain what changed and why the Amendment was added.

## Important rules

1. NEVER mark a Success Criterion as PASS without a passing test that verifies it.
2. NEVER rewrite SPEC.md to match the implementation. If the code diverged, add an Amendment.
3. NEVER skip Step 4 (spec drift). Implementation reality and specification must be reconciled, not ignored.
4. ALWAYS write VERIFICATION.md inside `.vibespec/`, not in the project root.
5. If the user asks "is it done?" and verification hasn't been run, ALWAYS suggest running `/verify` first.
6. ALWAYS be adversarial — the job is to find gaps, not to rubber-stamp.