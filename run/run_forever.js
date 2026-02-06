#!/usr/bin/env -S deno run --allow-all --no-lock

import $ from "https://esm.sh/@jsr/david__dax@0.45.0/mod.ts"
const $$ = (...args)=>$(...args).noThrow()
// await $$`false`
// (await $$`false`).code
// await $$`false`.text("stderr")
// await $$`false`.text("combined")
// await $$`echo`.stdinText("yes\n")

let increment = 2
while (true) {
    console.log(`increment: ${increment}`)
    await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
        You are tasked with faithfully re-implementing nix builtins in JavaScript with main/runtime.js being the primary source code. You can use deno with URL imports, and esm.sh helps with npm, but you are not allowed to use jsr or npm imports directly. Read prompt.md for context and runtime.md for where the previous agent left off. Search for things like "PROGRESS" (.md) to find notes from previous agents. Update/validate these notes to prevent junk from building up. Now please resume the work
    `} &> .claude/${increment++}.log`
    await $`git add -A`
    await $`git commit -m ${`CLAUDE: change ${increment}`}`
}