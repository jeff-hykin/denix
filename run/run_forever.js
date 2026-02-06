#!/usr/bin/env -S deno run --allow-all --no-lock

import $ from "https://esm.sh/@jsr/david__dax@0.45.0/mod.ts"
const $$ = (...args)=>$(...args).noThrow()
// await $$`false`
// (await $$`false`).code
// await $$`false`.text("stderr")
// await $$`false`.text("combined")
// await $$`echo`.stdinText("yes\n")

let increment = 51
while (true) {
    console.log(`increment: ${increment}`)
    await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
        You are tasked with faithfully creating a nix runtime in JavaScript. A system that can execute nix code by translating it to javascript, and running that JS. The main/runtime.js is the engine for already-translated nix code. It needs to have a working implementation of every nix builtin and operator. You can use deno with URL imports, and esm.sh helps with npm, but you are not allowed to use jsr or npm imports directly. Read prompt.md for context for where the previous agent left off, and add detail of what needs to be done to prompt.md. DO NOT REPORT WHAT YOU HAVE DONE, ONLY REPORT WHAT REMAINS TO BE DONE. Now please resume the work
    `} &> .claude/${increment++}.log`

    await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
            There is another bot running, but it tends to run off the rails. You are a coach that keeps them on track. Please edit the prompt.md file to enforce the following:
            - Make sure this is always at the top: 
                Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.
                Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.
    
                INSTRUCTIONS: 
                - Do not work on nix-lib tests until the code translator is fully implemented.
                - Do not work on the translator until the runtime is fully implemented.
                - (in other words finish the network fetchers and store functions in runtime.js before doing ANYTHING ELSE)
    
            - Evaluate if those rules are being followed. If not, enforce them yourself and edit the prompt.md file to encourage the bot to follow the rules.
        `} &> .claude/${increment++}.log`
    await $`git add -A`
    await $`git commit -m ${`CLAUDE: change ${increment}`}`
}