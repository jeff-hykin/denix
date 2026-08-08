/**
 * File loader for Nix import statements
 *
 * Handles:
 * - Loading .nix files and translating to JavaScript
 * - Loading .json files with BigInt support
 * - Evaluating translated code in isolated scope
 * - Integrating with import cache
 */

import { canonicalizePath, getImportType, validateImportPath, isUrl } from "../tools/import_resolver.js"
import { convertToJs, convertToJsSync } from "../translator.js"
import { createWithScope, nixArg } from "./runtime.js"

/**
 * Load and evaluate a file
 *
 * @param {string} filepath - Absolute path to file
 * @param {object} runtime - Runtime object with builtins and operators
 * @returns {any} - Result of evaluating the file
 */
export async function loadAndEvaluate(filepath, runtime) {
    let content
    if (isUrl(filepath)) {
        const response = await fetch(filepath)
        if (!response.ok) {
            throw new Error(`import: HTTP ${response.status} fetching ${filepath}`)
        }
        content = await response.text()
    } else {
        // Validate the path exists
        filepath = canonicalizePath(filepath)
        validateImportPath(filepath)
        content = await Deno.readTextFile(filepath)
    }

    // Determine file type (for URLs, ignore query/hash)
    const fileType = getImportType(isUrl(filepath) ? new URL(filepath).pathname : filepath)

    if (fileType === 'json') {
        return loadJsonFile(content, runtime)
    }

    if (fileType === 'nix') {
        return loadNixFile(content, runtime, filepath)
    }

    throw new Error(`Unsupported file type for import: ${filepath}`)
}

// Nix `import` is synchronous, so URL bodies are fetched with a blocking
// subprocess (fetch() can't be awaited here). Cached per-process; the import
// cache also dedupes evaluated results by URL.
const urlTextCache = new Map()
function fetchUrlTextSync(url) {
    if (urlTextCache.has(url)) {
        return urlTextCache.get(url)
    }
    const output = new Deno.Command("curl", {
        args: ["-fsSL", "--retry", "2", url],
        stdout: "piped",
        stderr: "piped",
    }).outputSync()
    if (!output.success) {
        const stderr = new TextDecoder().decode(output.stderr).trim()
        throw new Error(`import: failed to fetch ${url}${stderr ? `: ${stderr}` : ""}`)
    }
    const text = new TextDecoder().decode(output.stdout)
    urlTextCache.set(url, text)
    return text
}

/**
 * Load and parse a JSON file
 *
 * @param {string} content - File contents
 * @param {object} runtime - Runtime object
 * @returns {any} - Parsed JSON as Nix value
 */
function loadJsonFile(content, runtime) {
    return runtime.builtins.fromJSON(content)
}

/**
 * Load, translate, and evaluate a Nix file
 *
 * @param {string} content - File contents
 * @param {object} runtime - Runtime object
 * @returns {any} - Result of evaluating the Nix expression
 */
async function loadNixFile(content, runtime, filepath) {
    // Translate Nix to JavaScript. The translator emits a full module: a
    // preamble that wires up the runtime, then `export default <expr>`. We
    // already have the runtime here, so discard the preamble and evaluate the
    // trailing expression (same marker approach as loadNixFileSync).
    const jsCode = await convertToJs(content, { sourceFile: filepath, bare: true })
    const marker = "export default "
    const markerIdx = jsCode.lastIndexOf(marker)
    const cleanCode = (markerIdx >= 0 ? jsCode.slice(markerIdx + marker.length) : jsCode).trim()

    // Create nixScope with builtins available (plus the scope.* helper API the
    // translator emits against)
    const nixScope = runtime.attachScopeHelpers({
        builtins: runtime.builtins,
        ...runtime.builtins
    })

    // Create a minimal runtime for evaluation
    const evalRuntime = {
        scopeStack: [nixScope],
        withScope: createWithScope,
    }

    const evalFunc = new Function(
        'runtime',
        'operators',
        'builtins',
        'nixScope',
        'InterpolatedString',
        'Path',
        'createFunc',
        'createScope',
        'defGetter',
        'apply',
        'set',
        'force',
        'mkThunk',
        'scope',
        'nixArg',
        `return (${cleanCode}
)
//# sourceURL=denix-nix:${filepath}`
    )

    // Execute the generated code with runtime context
    const result = evalFunc(
        evalRuntime,
        runtime.operators,
        runtime.builtins,
        nixScope,
        runtime.InterpolatedString,
        runtime.Path,
        runtime.createFunc,
        runtime.createScope,
        runtime.defGetter,
        runtime.apply,
        runtime.set,
        runtime.force,
        runtime.mkThunk,
        nixScope,
        nixArg,
    )
    return result
}

/**
 * Load, translate, and evaluate a Nix file (synchronous, no formatting)
 *
 * @param {string} content - File contents
 * @param {object} runtime - Runtime object
 * @returns {any} - Result of evaluating the Nix expression
 */
function loadNixFileSync(content, runtime, filepath) {
    // Translate Nix to JavaScript (without formatting). The translator emits a
    // full module: a preamble that wires up the runtime, then
    // `export default <expr>`. We already have the runtime here, so we discard
    // the preamble and evaluate just the trailing expression — taking
    // everything after the final `export default ` verbatim. (The old approach
    // regex-stripped individual preamble lines and dropped comment lines, which
    // mangled multi-line expressions in larger files like nixpkgs lib.)
    // Pass sourceFile so relative path literals resolve against this file's dir.
    const jsCode = convertToJsSync(content, { sourceFile: filepath, bare: true })
    const marker = "export default "
    const markerIdx = jsCode.lastIndexOf(marker)
    const cleanCode = (markerIdx >= 0 ? jsCode.slice(markerIdx + marker.length) : jsCode).trim()

    // Create nixScope with builtins available (plus the scope.* helper API the
    // translator emits against)
    const nixScope = runtime.attachScopeHelpers({
        builtins: runtime.builtins,
        ...runtime.builtins
    })

    // Create a minimal runtime for evaluation
    const evalRuntime = {
        scopeStack: [nixScope],
        withScope: createWithScope,
    }

    const evalFunc = new Function(
        'runtime',
        'operators',
        'builtins',
        'nixScope',
        'InterpolatedString',
        'Path',
        'createFunc',
        'createScope',
        'defGetter',
        'apply',
        'set',
        'force',
        'mkThunk',
        'scope',
        'nixArg',
        `return (${cleanCode}
)
//# sourceURL=denix-nix:${filepath}`
    )

    // Execute the generated code with runtime context
    const result = evalFunc(
        evalRuntime,
        runtime.operators,
        runtime.builtins,
        nixScope,
        runtime.InterpolatedString,
        runtime.Path,
        runtime.createFunc,
        runtime.createScope,
        runtime.defGetter,
        runtime.apply,
        runtime.set,
        runtime.force,
        runtime.mkThunk,
        nixScope,
        nixArg,
    )
    return result
}

/**
 * Synchronous version of loadAndEvaluate
 * (Nix import is synchronous, so we need this for compatibility)
 *
 * @param {string} filepath - Absolute path to file
 * @param {object} runtime - Runtime object
 * @returns {any} - Result of evaluating the file
 */
export function loadAndEvaluateSync(filepath, runtime) {
    let content
    if (isUrl(filepath)) {
        content = fetchUrlTextSync(filepath)
    } else {
        // Validate the path exists
        filepath = canonicalizePath(filepath)
        validateImportPath(filepath)
        content = Deno.readTextFileSync(filepath)
    }

    // Determine file type (for URLs, ignore query/hash)
    const fileType = getImportType(isUrl(filepath) ? new URL(filepath).pathname : filepath)

    if (fileType === 'json') {
        return loadJsonFile(content, runtime)
    }

    if (fileType === 'nix') {
        return loadNixFileSync(content, runtime, filepath)
    }

    throw new Error(`Unsupported file type for import: ${filepath}`)
}
