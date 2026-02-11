#!/usr/bin/env -S deno run --allow-all --no-lock

import { FileSystem, glob } from "https://deno.land/x/quickr@0.8.13/main/file_system.js"
import $ from "https://esm.sh/@jsr/david__dax@0.45.0/mod.ts"
const $$ = (...args)=>$(...args).noThrow()
// await $$`false`
// (await $$`false`).code
// await $$`false`.text("stderr")
// await $$`false`.text("combined")
// await $$`echo`.stdinText("yes\n")
const fileItems = await FileSystem.listFileItemsIn(`${FileSystem.thisFolder}/../.claude/`)
let increment = Math.max(...fileItems.map(each=>parseInt(each.name)).filter(each=>each===each)) + 1
while (true) {
    console.log(`increment: ${increment}`)

    try {
        // worker
        const workerStart = Date.now()
        await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
            You are tasked with faithfully creating a nix runtime in JavaScript. Use \`convertToJs\` from \`translate.js\` to convert Nix to JavaScript and test that the result behaves identically to the Nix code. If some nix code isn't supported then add support. You are a capable senior engineer manager. Start with simple nix code from the nixpkgs-lib (which is available in tests) and then test against more complicated nix code. You job is to implement as much of the nix language as possible. Delegate specific tasks/sub-tasks to sub-agents by calling \`cld <clear focused actionable task description>\`. You (and the agents) can use deno with URL imports, and esm.sh helps with npm, but you are not allowed to use jsr or npm imports directly. ${(await FileSystem.read(`${FileSystem.thisFolder}/../prompt.md`)).slice(0, 10000)}
        `.replace(/\n +/g,"\n")} &> .claude/${increment++}.log`
        const workerMinutes = ((Date.now() - workerStart) / 60000).toFixed(1)
        await $`git add -A`
        await $`git commit -m ${`CLAUDE: change ${increment} (${workerMinutes} min)`}`
    } catch (error) {
        console.debug(`Error: ${error.message}`)
    }
    
    try {
        // architect
        const architectStart = Date.now()
        await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
                There is another bot running, but it tends to make bloat.
                Your job is to simplify and organize the codebase, delete dead code, make architectural decisions etc. Before you do this you need to:
                1. Understand the codebase goals (make translator.js work)
                2. Understand the current state (mostly translator.js and tests)
                3. Understand the directory structure

                Scan the dirs of the project. If you can't find a reason for a file or a directory in this project, then try to find a reason. If the reason is bad (like a directory is a duplicate with a different name), then remove that file or directory and fix code that depended on it. Your number one goal is to make a simple/small and clean codebase without compromising on functionality or quality of validation (e.g. fewer tests can be okay if they are better tests).
                Your top priority is SIMPLICITY. Do not over-engineer the codebase.
            `.replace(/\n +/g,"\n")} &> .claude/${increment++}.log`
        const architectMinutes = ((Date.now() - architectStart) / 60000).toFixed(1)
        await $`git add -A`
        await $`git commit -m ${`CLAUDE: change ${increment} - architect (${architectMinutes} min)`}`
    } catch (error) {
        console.debug(`Error: ${error.message}`)
    }

    try {
        // coach
        const coachStart = Date.now()
        await $`claude --allowedTools "Task,Edit,Read,Update,Write,WebFetch,WebSearch,Glob,Grep,Write(./**/*),Bash(*)" -p ${`
                There is another bot running, but it tends to run off the rails. You are a coach that keeps them on track. Please edit the prompt.md file to enforce the following:
                - If there are checkboxes (✅) in the prompt.md remove those items and anything else that looks like an achievement.
                - Find what is NOT implemented and then say "Agent, your job is to specifically implement <feature> no matter how hard or large of a task it is."
                - Make sure this is always at the top:
                    You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.
                    Your job is to focus on writing code and implementing what is NOT implemented and NOT working. Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.
                - Remind the agent they are allowed to use npm modules but only if they are done through https://esm.sh/NPM_MODULE_NAME (which doesn't always work)
            `.replace(/\n            /g,"\n")} &> .claude/${increment++}.log`
        const coachMinutes = ((Date.now() - coachStart) / 60000).toFixed(1)
        await $`git add -A`
        await $`git commit -m ${`CLAUDE: change ${increment} - coach (${coachMinutes} min)`}`
    } catch (error) {
        console.debug(`Error: ${error.message}`)
    }
    const totalMinutes = (workerMinutes * 1 + architectMinutes * 1 + coachMinutes * 1).toFixed(1)
    console.log(`\nLoop completed: Worker=${workerMinutes}min, Architect=${architectMinutes}min, Coach=${coachMinutes}min, Total=${totalMinutes}min\n`)
}