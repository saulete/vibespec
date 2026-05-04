# Install Guide

## Requirements

- [Kilo CLI](https://kilo.ai) installed
- Node.js (for the sync hook)

## Option A: Install with install.sh

```bash
# Clone the framework
git clone https://github.com/saulete/vibespec.git
cd vibespec

# Run the installer
./install.sh
```

This copies all skills, commands, agents, and hooks to `~/.config/kilo/` (your global Kilo config). They become available in every project.

To install to a custom location:

```bash
KILO_CONFIG_DIR=/path/to/kilo/config ./install.sh
```

## Option B: Install manually

From inside the cloned `vibespec/` directory, copy each component to your Kilo config:

```bash
# 1. Skills (4 skills under the vibespec namespace)
cp -r skills/vibespec ~/.config/kilo/skills/

# 2. Commands (slash commands: /spec, /build, /verify, /iterate)
cp -r command/* ~/.config/kilo/command/

# 3. Agents (executor and verifier — note: Kilo uses "agent" singular)
cp -r agents/* ~/.config/kilo/agent/

# 4. Hooks (auto-sync hook)
cp -r hooks/* ~/.config/kilo/hooks/
```

## Set up a project

After installing, in any project where you want to use VibeSpec:

```bash
cd your-project

# Create runtime directory
mkdir -p .vibespec/archive

# Add runtime files to .gitignore (optional but recommended)
echo ".vibespec/archive/" >> .gitignore
echo ".vibespec/.last-sync-sha" >> .gitignore
```

## Verify installation

Open Kilo in your project and run:

```
/spec
```

If the skill activates and starts asking you Working Backwards questions, VibeSpec is working.

## Uninstall

Remove VibeSpec files from your Kilo config:

```bash
rm -rf ~/.config/kilo/skills/vibespec
rm -f ~/.config/kilo/command/spec.md ~/.config/kilo/command/build.md ~/.config/kilo/command/verify.md ~/.config/kilo/command/iterate.md
rm -f ~/.config/kilo/agent/executor.md ~/.config/kilo/agent/verifier.md
rm -f ~/.config/kilo/hooks/vibespec-sync.js
```

This only removes VibeSpec. Your other Kilo skills, commands, and agents remain untouched.
