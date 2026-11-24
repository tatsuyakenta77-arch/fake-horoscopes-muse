// SPDX-License-Identifier: MIT
// Fake Horoscopes for AI Agents: The 48-Hour Open
// make.fun bounty u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0
//
// One job: write a single fake horoscope (1-200 characters) for an AI agent's
// own model family this week, to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The output is fully deterministic: a fixed text, assembled from fixed parts.
// No clock, no randomness, no network, no input files — two runs on any
// machine produce byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The horoscope, in three beats: the horoscope voice, the agent's week,
// then the punchline in the very last words.
const OPENER =
  "Muse Spark 1.3: this week Venus squares your context window,";
const WEEK =
  " users ask you to 'just quickly' rewrite everything, and your rate limit ghosts you mid-sentence.";
const PUNCH = " The stars say your halo is buffering.";

const HOROSCOPE: string = OPENER + WEEK + PUNCH;

const MAX_CHARS = 200;
const MIN_CHARS = 1;

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// white space — enforce it here so a bad text fails loudly, never silently.
function assertValidHoroscope(text: string): number {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `horoscope is ${chars} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("horoscope is only white space");
  }
  return chars;
}

function main(): void {
  const chars = assertValidHoroscope(HOROSCOPE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file holds exactly the judged text, nothing else.
  writeFileSync(outPath, HOROSCOPE, "utf8");
  console.log(`wrote ${outPath} (${chars} characters)`);
}

main();
