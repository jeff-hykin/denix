// denix — unified CLI for the denix Nix-to-JavaScript toolchain.
//
//     denix translate <file.nix>      Nix -> readable JavaScript
//     denix eval      <file.nix>      evaluate and print the result
//     denix build     <target>        evaluate to a derivation and build it
//
// Environment:
//     DENIX_STORE_ROOT    relocatable store directory (default: ~/.cache/denix/store)

import { Command } from "https://esm.sh/jsr/@cliffy/command@1.0.0-rc.7"

const VERSION = "0.1.0"
const runtimePath = new URL("../runtime.js", import.meta.url).href

// --------------------------------------------------------------
// shared helpers
// --------------------------------------------------------------
function fail(message, code = 1) {
    console.error(`denix: ${message}`)
    Deno.exit(code)
}

const tempDirs = []
function cleanup() {
    for (const dir of tempDirs) {
        try { Deno.removeSync(dir, { recursive: true }) } catch { /* already gone */ }
    }
}

// Returns the absolute path to a real .nix file: either the given file, or the
// inline expression staged into a temp file so the pipeline is uniform.
async function stageInput(file, expr) {
    if (file != null && expr != null) {
        fail("give either a file or --expr, not both", 2)
    }
    if (file != null) {
        try {
            return await Deno.realPath(file)
        } catch (err) {
            fail(`cannot resolve ${JSON.stringify(file)}: ${err.message}`)
        }
    }
    if (expr == null) {
        fail("no .nix file or --expr given", 2)
    }
    const dir = await Deno.makeTempDir({ prefix: "denix_expr_" })
    tempDirs.push(dir)
    const path = `${dir}/expr.nix`
    await Deno.writeTextFile(path, expr)
    return path
}

async function translateFile(nixFileAbs) {
    const { convertToJs } = await import("../../translator.js")
    const source = await Deno.readTextFile(nixFileAbs)
    try {
        return await convertToJs(source, { runtimePath, sourceFile: nixFileAbs })
    } catch (err) {
        fail(`translation failed: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`)
    }
}

// Translate a nix file and import the result, returning the evaluated value.
async function evaluateFile(nixFileAbs, emitTranslated = null) {
    const translated = await translateFile(nixFileAbs)
    if (emitTranslated) {
        try {
            await Deno.writeTextFile(emitTranslated, translated)
        } catch (err) {
            console.error(`denix: could not write translated JS to ${emitTranslated}: ${err.message}`)
        }
    }
    const dir = await Deno.makeTempDir({ prefix: "denix_eval_" })
    tempDirs.push(dir)
    const tmpJs = `${dir}/translated.js`
    await Deno.writeTextFile(tmpJs, translated)
    try {
        const mod = await import("file://" + tmpJs)
        let value = mod.default
        if (value && typeof value.then === "function") {
            value = await value
        }
        return value
    } catch (err) {
        fail(`eval failed: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`)
    }
}

async function evaluateExpr(expr) {
    return evaluateFile(await stageInput(null, expr))
}

function splitPair(flag, text) {
    const idx = text.indexOf("=")
    if (idx < 0) {
        fail(`${flag} expects name=value, got ${JSON.stringify(text)}`, 2)
    }
    return [text.slice(0, idx), text.slice(idx + 1)]
}

// Apply --arg/--argstr pairs when the value is a function expecting an attrset.
async function applyArgs(value, argPairs, argstrPairs) {
    const pairs = [...(argstrPairs ?? []).map((pair) => {
                       const [name, str] = splitPair("--argstr", pair)
                       return [name, () => str]
                   }),
                   ...(argPairs ?? []).map((pair) => {
                       const [name, expr] = splitPair("--arg", pair)
                       return [name, () => evaluateExpr(expr)]
                   })]
    if (pairs.length === 0 || typeof value !== "function") {
        return value
    }
    const argObj = {}
    for (const [name, get] of pairs) {
        argObj[name] = await get()
    }
    let result = value(argObj)
    if (result && typeof result.then === "function") {
        result = await result
    }
    return result
}

async function walkAttrPath(value, attrPath) {
    for (const part of attrPath) {
        if (value == null) {
            break
        }
        value = value[part]
        if (value && typeof value.then === "function") {
            value = await value
        }
    }
    return value
}

// nix-instantiate flags that are accepted (so recorded/scripted nix
// invocations can be replayed against denix) but have no effect here.
function addIgnoredNixFlags(command) {
    for (const flag of ["--eval", "--strict", "--show-trace", "--no-show-trace", "--no-location", "--parse", "--read-write-mode", "--trace-function-calls"]) {
        command.option(flag, "(ignored, nix compatibility)", { hidden: true })
    }
    for (const flag of ["--lint-absolute-path-literals", "--lint-short-path-literals", "--lint-url-literals", "--max-call-depth", "--extra-experimental-features", "--timeout", "--store"]) {
        command.option(`${flag} <value:string>`, "(ignored, nix compatibility)", { hidden: true })
    }
    command.option("-I, --include <path:string>", "(ignored, nix compatibility)", { hidden: true, collect: true })
    command.option("--impure", "Allow impure evaluation (pure evaluation is the default, like nix eval).")
    return command
}

// --------------------------------------------------------------
// translate
// --------------------------------------------------------------
const translate = new Command()
    .description("Translate a Nix file (or inline expression) to readable JavaScript.")
    .arguments("[file:string]")
    .option("-E, --expr <expr:string>", "Translate an inline Nix expression instead of a file.")
    .option("-o, --output <path:string>", "Write the JavaScript to a file instead of stdout.")
    .example("file to stdout", "denix translate default.nix")
    .example("inline expression", `denix translate -E '{ a = 1; b = a + 1; }'`)
    .example("write to file", "denix translate default.nix -o default.js")
    .action(async ({ expr, output }, file) => {
        const nixFileAbs = await stageInput(file, expr)
        const translated = await translateFile(nixFileAbs)
        if (output) {
            await Deno.writeTextFile(output, translated)
        } else {
            await Deno.stdout.write(new TextEncoder().encode(translated))
        }
        cleanup()
    })

// --------------------------------------------------------------
// eval
// --------------------------------------------------------------
const evalCmd = addIgnoredNixFlags(new Command())
    .description("Evaluate a Nix file (or inline expression) and print the result.")
    .arguments("[file:string]")
    .option("-E, --expr <expr:string>", "Evaluate an inline Nix expression instead of a file.")
    .option("-A, --attr <attr.path:string>", "Select an attribute path from the result.")
    .option("--json", "Print the result as JSON (like nix-instantiate --eval --json).")
    .option("--xml", "Print the result as XML (like nix-instantiate --eval --xml).")
    .option("--raw", "Print a string result without quotes (like nix eval --raw).")
    .option("--arg <pair:string>", "Bind a function argument to an evaluated Nix expression: --arg name=expr", { collect: true })
    .option("--argstr <pair:string>", "Bind a function argument to a literal string: --argstr name=string", { collect: true })
    .option("--emit-translated <path:string>", "Also write the translated JavaScript to this path.", { hidden: true })
    .example("inline math", `denix eval -E '1 + 2'`)
    .example("attribute select", `denix eval default.nix -A version`)
    .example("json output", `denix eval -E '{ a = [ 1 2 ]; }' --json`)
    .action(async ({ expr, attr, json, xml, raw, arg, argstr, emitTranslated, impure }, file) => {
        const nixFileAbs = await stageInput(file, expr)
        const { evalSettings } = await import("../runtime.js")
        evalSettings.pureEval = !impure
        let value = await evaluateFile(nixFileAbs, emitTranslated)
        value = await applyArgs(value, arg, argstr)
        value = await walkAttrPath(value, attr ? attr.split(".") : [])
        const { nixRepr, nixReprXml, builtins } = await import("../runtime.js")
        const text = xml ? nixReprXml(value)
            : json ? builtins.toJSON(value).toString()
            : raw ? builtins.toString(value).toString()
            : nixRepr(value)
        console.log(text)
        cleanup()
    })

// --------------------------------------------------------------
// build
// --------------------------------------------------------------
const buildCmd = addIgnoredNixFlags(new Command())
    .description(
        "Evaluate a Nix expression to a derivation and build it.\n\n" +
        "The target can be a .nix file, a flake directory, or a flake reference\n" +
        "like ./path#attr.path (defaults to packages.<system>.default).",
    )
    .arguments("[target:string]")
    .option("-E, --expr <expr:string>", "Build an inline Nix expression instead of a file.")
    .option("-A, --attr <attr.path:string>", "Select an attribute path from the result.")
    .option("-o, --out-link <path:string>", "Symlink the primary output here.", { default: "./result" })
    .option("--no-link", "Do not create an output symlink.")
    .option("--json", "Print output paths as JSON.")
    .option("--dry-run", "Evaluate and print the .drv path without building.")
    .option("--quiet", "Suppress build progress output.")
    .option("--arg <pair:string>", "Bind a function argument to an evaluated Nix expression: --arg name=expr", { collect: true })
    .option("--argstr <pair:string>", "Bind a function argument to a literal string: --argstr name=string", { collect: true })
    .example("build a file", "denix build default.nix")
    .example("build from nixpkgs", `denix build -E '(import <nixpkgs> {}).cowsay'`)
    .example("build a flake", "denix build ./my-flake#packages.aarch64-darwin.default")
    .example("dry run", "denix build default.nix --dry-run")
    .action(async ({ expr, attr, outLink, link, json, dryRun, quiet, arg, argstr }, target) => {
        const attrPath = attr ? attr.split(".") : []
        let value

        // flake mode: `path#attr` or a directory containing flake.nix
        let flakeRef = null
        let flakeAttrPath = null
        if (target != null && expr == null) {
            if (target.includes("#")) {
                const idx = target.indexOf("#")
                flakeRef = target.slice(0, idx)
                flakeAttrPath = target.slice(idx + 1)
            } else {
                try {
                    const st = await Deno.stat(target)
                    if (st.isDirectory) {
                        await Deno.stat(`${target}/flake.nix`)
                        flakeRef = target
                    }
                } catch { /* not a flake dir — plain .nix handling below */ }
            }
        }

        if (flakeRef != null) {
            const { builtins } = await import("../runtime.js")
            const flakeRefAbs = flakeRef.startsWith("/") || flakeRef.includes(":")
                ? flakeRef
                : await Deno.realPath(flakeRef)
            let flake
            try {
                flake = await builtins.getFlake(flakeRefAbs)
            } catch (err) {
                fail(`getFlake failed: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`)
            }
            const system = typeof builtins.currentSystem === "function"
                ? builtins.currentSystem()
                : String(builtins.currentSystem)
            const parts = flakeAttrPath
                ? flakeAttrPath.split(".")
                : ["packages", system, "default"]
            value = await walkAttrPath(flake.outputs, parts)
        } else {
            const nixFileAbs = await stageInput(target, expr)
            value = await evaluateFile(nixFileAbs)
        }

        value = await applyArgs(value, arg, argstr)
        value = await walkAttrPath(value, attrPath)

        if (!value || value.type !== "derivation") {
            fail(`expression does not evaluate to a derivation (got ${typeof value}${value?.type ? `, type=${value.type}` : ""})`)
        }

        if (dryRun) {
            if (json) {
                console.log(JSON.stringify({ drvPath: value.drvPath, outputs: value.outputs }))
            } else {
                console.log(value.drvPath)
            }
            cleanup()
            return
        }

        const { build } = await import("../builder.js")
        let result
        try {
            result = await build(value, { verbose: !quiet })
        } catch (err) {
            fail(`build failed: ${err.message}`)
        }

        const outPaths = Object.values(result.outputPaths)
        if (json) {
            console.log(JSON.stringify({ outputPaths: result.outputPaths, cached: result.cached }))
        } else {
            for (const p of outPaths) {
                console.log(p)
            }
        }

        if (link && outPaths[0]) {
            try {
                try { await Deno.remove(outLink) } catch { /* doesn't exist */ }
                await Deno.symlink(outPaths[0], outLink)
            } catch (err) {
                console.error(`denix: warning: could not create symlink ${outLink}: ${err.message}`)
            }
        }
        cleanup()
    })

// --------------------------------------------------------------
// main
// --------------------------------------------------------------
// Accept both `--arg name=expr` (native form) and nix's two-token
// `--arg name expr` by merging the latter into the former before parsing.
function normalizeArgPairs(args) {
    const out = []
    for (let i = 0; i < args.length; i++) {
        const a = args[i]
        if ((a === "--arg" || a === "--argstr") && i + 2 < args.length && !args[i + 1].includes("=")) {
            out.push(a, `${args[i + 1]}=${args[i + 2]}`)
            i += 2
        } else {
            out.push(a)
        }
    }
    return out
}

export async function main(args) {
    await new Command()
        .name("denix")
        .version(VERSION)
        .description(
            "Nix in JavaScript: translate Nix to readable JS, evaluate it, and build\n" +
            "derivations — no Nix installation required.",
        )
        .action(function () { this.showHelp() })
        .command("translate", translate)
        .command("eval", evalCmd)
        .command("build", buildCmd)
        .parse(normalizeArgPairs(args))
}

if (import.meta.main) {
    await main(Deno.args)
}
