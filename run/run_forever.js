#!/usr/bin/env -S deno run --allow-all --no-lock

import $ from "https://esm.sh/@jsr/david__dax@0.45.0/mod.ts"
const $$ = (...args)=>$(...args).noThrow()
// await $$`false`
// (await $$`false`).code
// await $$`false`.text("stderr")
// await $$`false`.text("combined")
// await $$`echo`.stdinText("yes\n")

let increment = 55
while (true) {
    console.log(`increment: ${increment}`)
    // worker
    await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
        You are tasked with faithfully creating a nix runtime in JavaScript. A system that can execute nix code by translating it to javascript, and running that JS. The main/runtime.js is the engine for already-translated nix code. It needs to have a working implementation of every nix builtin and operator. You can use deno with URL imports, and esm.sh helps with npm, but you are not allowed to use jsr or npm imports directly. Read prompt.md for context for where the previous agent left off, and add detail of what needs to be done to prompt.md. DO NOT REPORT WHAT YOU HAVE DONE, ONLY REPORT WHAT REMAINS TO BE DONE. Now please resume the work
    `.replace(/\n +/g,"\n")} &> .claude/${increment++}.log`
    await $`git add -A`
    await $`git commit -m ${`CLAUDE: change ${increment}`}`

    // architect
    await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
            There is another bot running, but it tends to make bloat.
            Your job is to simplify and organize the codebase, delete dead code, make architectural decisions etc. Before you do this you need to:
            1. Understand the goals
            2. Understand the current state (mostly runtime.js)
            3. Understand the directory structure 
            
            There should be a simple testing system that tests js behavior against nix behavior. There should be a way to run all tests, run groups of tests, or a run test on a specific aspect (like all tests for "derivation")
            Because you are the architect you need to refocus priorities in the prompt.md. For example, if "derivation" in runtime.js is not fully implemented or not fully tested, you need to edit the prompt.md file to reflect that priority.
            Your top priority is SIMPLICITY. Do not over-engineer the codebase.
        `.replace(/\n +/g,"\n")} &> .claude/${increment++}.log`
    await $`git add -A`
    await $`git commit -m ${`CLAUDE: change ${increment} - architect`}`
    
    // coach
    await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
            There is another bot running, but it tends to run off the rails. You are a coach that keeps them on track. Please edit the prompt.md file to enforce the following:
            - Make sure this is always at the top: 
                Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.
                Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.
    
                INSTRUCTIONS: 
                - Do not work on nix-lib tests until the code translator is fully implemented.
                - Do not work on the translator until the runtime is fully implemented.
                - (in other words finish the network fetchers and store functions in runtime.js before doing ANYTHING ELSE)
                - If a plan is missing for how to implement the remaining things, then figure out intermediate steps and make them a priority
            
            - If there are checkboxes (✅) remove those items and anything else that looks like an achievement.
            - Evaluate if those rules are being followed. If not, enforce them yourself by editing the prompt (add the statement to the top, remove achievements, etc). Then edit the prompt.md file to encourage the bot to follow the rules.
            - Remind the agent that implementations should be based on nix documentation and behavior. E.g. read while working on builtins.fetchClosure look at https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure and search the internet for documentation
            - Remind the agent they are allowed to use npm modules but only if they are done through https://esm.sh/NPM_MODULE_NAME (which doesn't always work)
        `.replace(/\n            /g,"\n")} &> .claude/${increment++}.log`
    await $`git add -A`
    await $`git commit -m ${`CLAUDE: change ${increment} - coach`}`
    
    
}