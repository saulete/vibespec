# Contributing to VibeSpec

## What is VibeSpec?

VibeSpec is a streamlined product development framework for vibe coders and small teams. It captures the rigor of the Mercadona Tech pipeline (GSD → MUST → Superpowers) without the ceremony.

## Principles

1. **Rigor without bureaucracy** — Every concept must earn its place. If a form, score, or document doesn't directly improve the quality of what gets built, it doesn't belong.
2. **Falsifiable by default** — Success Criteria must be testable. If you can't write a test for it, it's not a criterion.
3. **One source of truth** — SPEC.md is the contract. Context.md is the backdrop. No duplicate state.
4. **Small team, big discipline** — Designed for 1-3 people. Every addition must justify itself against the "would a solo vibe coder actually use this?" bar.

## How to Contribute

### Reporting Issues

Open a GitHub issue with:
- What you expected
- What happened instead
- The skill/command that was active
- Your SPEC.md (if applicable, redact sensitive info)

### Suggesting Features

Before writing code, open an issue with the `feature` label describing:
- The problem it solves
- Why it can't be solved with existing skills
- How it stays within the "4 skills, 0 bureaucracy" constraint

### Submitting Changes

1. Fork the repository
2. Create a branch: `git checkout -b my-contribution`
3. Make your changes
4. Test your changes by running through the full flow (spec → build → verify → iterate) with a real feature
5. Open a Pull Request

### Skill Guidelines

If you're adding or modifying a skill:

- **Keep it focused**: Each skill does ONE thing well. If a skill starts doing two things, split it.
- **Keep it short**: Skills are instructions to an agent. They should be scannable, not encyclopedic.
- **Iron rules are iron**: The TDD cycle, no-completion-without-evidence, and falsifiable criteria are non-negotiable. Don't soften them for convenience.
- **Spanish for docs, English for skills**: Skills are agent instructions (English). README, CONTRIBUTING, and user-facing documentation can be in either language.
- **No new files without reason**: If you're adding a new file type to the project structure, justify why it can't go in SPEC.md or context.md.

### What We Don't Want

- **Multi-role ceremony**: PRDs, JTBDs, 6D scoring, 5-lens prioritization — these exist in the Mercadona toolkit for teams where PM and Eng are separate roles. In VibeSpec, they're compressed into `/spec` and `context.md`.
- **Score-based quality gates**: "Score ≥ 7 = PASS" is bureaucracy. "Can you write a test for this?" is rigor.
- **New files for tracking**: If you're adding a ROADMAP.md or STATE.md, you're recreating GSD. Use context.md's Features list instead.

## Code of Conduct

Be respectful. Be constructive. Remember that this framework is designed for people who are building things, not for people who are managing people who are building things.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.