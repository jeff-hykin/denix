#!/usr/bin/env -S deno run --allow-all --no-lock

import $ from "https://esm.sh/@jsr/david__dax@0.45.0/mod.ts"
const $$ = (...args)=>$(...args).noThrow()
// await $$`false`
// (await $$`false`).code
// await $$`false`.text("stderr")
// await $$`false`.text("combined")
// await $$`echo`.stdinText("yes\n")

let increment = 33
while (true) {
    console.log(`increment: ${increment}`)
    await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
        You are tasked with faithfully creating a nix runtime in JavaScript. A system that can execute nix code by translating it to javascript, and running that JS. The main/runtime.js is the engine for already-translated nix code. It needs to have a working implementation of every nix builtin and operator. You can use deno with URL imports, and esm.sh helps with npm, but you are not allowed to use jsr or npm imports directly. Read prompt.md for context for where the previous agent left off, and add detail of what needs to be done to prompt.md. DO NOT REPORT WHAT YOU HAVE DONE, ONLY REPORT WHAT REMAINS TO BE DONE. Now please resume the work
    `} &> .claude/${increment++}.log`
    await $`git add -A`
    await $`git commit -m ${`CLAUDE: change ${increment}`}`
}