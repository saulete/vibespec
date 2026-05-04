---
name: vibespec-build
description: Implement a feature batch with strict TDD (red-green-refactor) following SPEC.md. Reads SPEC.md and context.md, creates PLAN.md, commits with SC-IDs.
---

# build — Construye con TDD, sin sorpresas

Version: 1.0.0

## Trigger

This skill MANDATORILY activates when:
- User invokes `/build` command
- User wants to start implementing a feature that has a SPEC.md
- User says "let's build this", "implement batch 1", "start coding", or similar
- A SPEC.md exists and the user is ready to code

DO NOT activate when no SPEC.md exists. In that case, suggest `/spec` first.

## Philosophy

Build is where discipline meets execution. The build skill enforces Test-Driven Development (TDD) as a non-negotiable practice. It reads the SPEC.md and context.md, decomposes the current batch into atomic tasks, and implements each one following the red-green-refactor cycle.

This skill does NOT skip tests. It does NOT write code before tests. It does NOT claim "done" without evidence. These are iron rules, not suggestions.

## Iron Rules

1. **NO production code without a failing test first.** If you find yourself writing implementation before a test, STOP. Write the test. Watch it fail. Then write the minimal code to make it pass.
2. **NO completion claims without fresh verification evidence.** "Should work" is not evidence. Passing tests are evidence.
3. **Delete code written before tests.** If you wrote implementation code before writing the test for it, delete the implementation, write the test, watch it fail, then rewrite the implementation.
4. **Every commit references an SC-ID.** Format: `feat: implement SC-01 [description]`

## Steps

### Step 1: Load context

1. Read `SPEC.md` from the project root.
2. Read `.vibespec/context.md` if it exists.
3. Read `.vibespec/PLAN.md` if it exists (to know which batch is active).
4. If no PLAN.md exists, identify the first incomplete batch from SPEC.md.

Determine the **active batch**: the first batch in SPEC.md that has unchecked Success Criteria.

### Step 2: Decompose into tasks

For the active batch, create a task breakdown in `.vibespec/PLAN.md`:

```markdown
# Plan: Batch N — [batch name from SPEC.md]

## Tasks
- [ ] Task 1: [description] → SC-01
  - Test: [what the test verifies]
  - Files: [expected files to create/modify]
- [ ] Task 2: [description] → SC-01
  - Test: [what the test verifies]
  - Files: [expected files to create/modify]
- [ ] Task 3: [description] → SC-02
  - Test: [what the test verifies]
  - Files: [expected files to create/modify]
```

Rules for tasks:
- Each task maps to one or more Success Criteria (not the other way around)
- Each task should take 2-5 minutes of focused implementation
- Each task has a clear test that verifies it
- Tasks are ordered by dependency — independent tasks can be noted for parallel execution

### Step 3: TDD cycle — for each task

For each task in the plan:

#### 3a. RED — Write the failing test

1. Write a test that verifies the task's objective
2. Run the test — it MUST fail (if it passes, the test is not testing anything new)
3. Commit: `test: add test for SC-NN [description]`

#### 3b. GREEN — Write minimal code to pass

1. Write the MINIMUM code to make the test pass
2. Do NOT add features the test doesn't require
3. Do NOT refactor yet
4. Run the test — it MUST pass
5. Commit: `feat: implement SC-NN [description]`

#### 3c. REFACTOR — Clean up if needed

1. Look for code smells: duplication, poor naming, missing abstractions
2. If you find any AND all tests still pass, refactor
3. If no smells, skip this step — don't refactor for the sake of refactoring
4. Run ALL tests to verify nothing broke
5. If refactored, commit: `refactor: [description of what changed]`

#### 3d. Mark task complete

Update the task in PLAN.md as `[x]`.

### Step 4: Batch verification checkpoint

After all tasks for a batch are complete:

1. Run the full test suite — all tests must pass
2. Verify each Success Criterion in the batch:
   - "Can I write a test that proves SC-NN works?"
   - If yes → mark `- [x] SC-NN: ...` in SPEC.md
   - If no → there's a gap, implement the missing test
3. Inform the user: "Batch N completado. Todos los Success Criteria pasan."
4. Suggest next step: `/verify` for full verification, or `/iterate` to continue with the next batch.

## Important rules

1. NEVER skip the test-first cycle, even if the implementation seems trivial.
2. NEVER claim a Success Criterion is done without a passing test that verifies it.
3. ALWAYS commit with SC-IDs so the vibespec-sync hook can track progress.
4. ALWAYS read context.md for project conventions — follow the stack and linting rules defined there.
5. ALWAYS write PLAN.md inside `.vibespec/`, not in the project root.
6. If a task requires changes not covered by the current Success Criteria, add an Amendment to SPEC.md instead of silently changing the spec.
7. NEVER write more code than the minimum to pass the current failing test. YAGNI.