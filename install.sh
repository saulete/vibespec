#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KILO_CONFIG_DIR="${KILO_CONFIG_DIR:-$HOME/.config/kilo}"

echo "Installing VibeSpec to $KILO_CONFIG_DIR..."

mkdir -p "$KILO_CONFIG_DIR/skills" "$KILO_CONFIG_DIR/command" "$KILO_CONFIG_DIR/agent" "$KILO_CONFIG_DIR/hooks"

cp -r "$SCRIPT_DIR/skills/"* "$KILO_CONFIG_DIR/skills/"
cp -r "$SCRIPT_DIR/command/"* "$KILO_CONFIG_DIR/command/"
cp -r "$SCRIPT_DIR/agents/"* "$KILO_CONFIG_DIR/agent/"
cp -r "$SCRIPT_DIR/hooks/"* "$KILO_CONFIG_DIR/hooks/"

echo "Installed:"
echo "  Skills:   4 skills (vibespec/spec, vibespec/build, vibespec/verify, vibespec/iterate)"
echo "  Commands: $(ls "$SCRIPT_DIR/command/" | wc -l | tr -d ' ') commands (/spec, /build, /verify, /iterate)"
echo "  Agents:   $(ls "$SCRIPT_DIR/agents/" | wc -l | tr -d ' ') agents (executor, verifier)"
echo "  Hooks:    $(ls "$SCRIPT_DIR/hooks/" | wc -l | tr -d ' ') hook (vibespec-sync)"
echo ""
echo "Next steps:"
echo "  1. Restart Kilo (or open a new session)"
echo "  2. Navigate to your project: cd your-project"
echo "  3. Create .vibespec/ directory: mkdir -p .vibespec/archive"
echo "  4. Run /spec to define your first feature"
echo ""
echo "Done."