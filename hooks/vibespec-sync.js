#!/usr/bin/env node

/**
 * vibespec-sync — Auto-syncs SC-IDs from commits to SPEC.md
 *
 * Runs on PostSessionEnd (or manually). Detects SC-IDs in commit messages,
 * marks them as [x] in SPEC.md, and detects batches where all SCs are done.
 *
 * SC-ID pattern: [A-Z]{2,8}-\d{1,4} (e.g., SC-01, SEARCH-12, FACET-03)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SC_ID_PATTERN = /\b([A-Z]{2,8}-\d{1,4})\b/g;
const SPEC_FILE = 'SPEC.md';
const VIBESPEC_DIR = '.vibespec';
const SYNC_FILE = path.join(VIBESPEC_DIR, '.last-sync-sha');

function runGit(args) {
  try {
    return execSync(`git ${args}`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch {
    return '';
  }
}

function getLastSyncSha() {
  try {
    return fs.readFileSync(SYNC_FILE, 'utf-8').trim();
  } catch {
    return '';
  }
}

function setLastSyncSha(sha) {
  if (!fs.existsSync(VIBESPEC_DIR)) {
    fs.mkdirSync(VIBESPEC_DIR, { recursive: true });
  }
  fs.writeFileSync(SYNC_FILE, sha);
}

function getCurrentSha() {
  return runGit('rev-parse HEAD');
}

function getCommitsSince(sha) {
  const range = sha ? `${sha}..HEAD` : 'HEAD~50..HEAD';
  const log = runGit(`log ${range} --format="%H %s"`);
  if (!log) return [];
  return log.split('\n').filter(Boolean).map(line => {
    const [hash, ...msgParts] = line.split(' ');
    return { hash, message: msgParts.join(' ') };
  });
}

function extractScIds(text) {
  const ids = new Set();
  let match;
  const pattern = new RegExp(SC_ID_PATTERN.source, SC_ID_PATTERN.flags);
  while ((match = pattern.exec(text)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

function markScDone(specPath, scIds) {
  let content = fs.readFileSync(specPath, 'utf-8');
  let changed = false;

  const scIdsArray = Array.from(scIds).sort();

  for (const scId of scIdsArray) {
    const regex = new RegExp(`- \\[ \\] ${scId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `- [x] ${scId}:`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(specPath, content);
  }

  return changed;
}

function detectBatchCompletion(specPath) {
  const content = fs.readFileSync(specPath, 'utf-8');
  const batches = [];
  const batchRegex = /### Batch (\d+):[^\n]*\n((?:(?!### Batch)[^\n]*\n)*)/g;
  let match;

  while ((match = batchRegex.exec(content)) !== null) {
    const batchNum = match[1];
    const batchContent = match[2];
    const scIdsInBatch = extractScIds(batchContent);
    const completedInBatch = [];

    for (const scId of scIdsInBatch) {
      const doneRegex = new RegExp(`- \\[x\\] ${scId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:`);
      if (doneRegex.test(content)) {
        completedInBatch.push(scId);
      }
    }

    batches.push({
      num: batchNum,
      total: scIdsInBatch.size,
      completed: completedInBatch.length,
      isComplete: scIdsInBatch.size > 0 && completedInBatch.length >= scIdsInBatch.size
    });
  }

  return batches;
}

function main() {
  const specPath = path.join(process.cwd(), SPEC_FILE);

  if (!fs.existsSync(specPath)) {
    process.exit(0);
  }

  const lastSha = getLastSyncSha();
  const currentSha = getCurrentSha();

  if (!currentSha) {
    process.exit(0);
  }

  if (lastSha === currentSha) {
    process.exit(0);
  }

  const commits = getCommitsSince(lastSha);
  const allScIds = new Set();

  for (const commit of commits) {
    const ids = extractScIds(commit.message);
    ids.forEach(id => allScIds.add(id));
  }

  if (allScIds.size === 0) {
    setLastSyncSha(currentSha);
    process.exit(0);
  }

  const changed = markScDone(specPath, allScIds);

  if (changed) {
    const batches = detectBatchCompletion(specPath);
    for (const batch of batches) {
      if (batch.isComplete) {
      }
    }
  }

  setLastSyncSha(currentSha);
}

main();