/**
 * File loader for Nix import statements
 *
 * Handles:
 * - Loading .nix files and translating to JavaScript
 * - Loading .json files with BigInt support
 * - Evaluating translated code in isolated scope
 * - Integrating with import cache
 */

import { getImportType, validateImportPath } from "../tools/import_resolver.js"
import { convertToJs } from "../main.js"

/**
 * Load and evaluate a file
 *
 * @param {string} filepath - Absolute path to file
 * @param {object} runtime - Runtime object with builtins and operators
 * @returns {any} - Result of evaluating the file
 */
export async function loadAndEvaluate(filepath, runtime) {
    // Validate the path exists
    validateImportPath(filepath)

    // Read file contents
    const content = await Deno.readTextFile(filepath)

    // Determine file type
    const fileType = getImportType(filepath)

    if (fileType === 'json') {
        return loadJsonFile(content, runtime)
    }

    if (fileType === 'nix') {
        return loadNixFile(content, runtime)
    }

    throw new Error(`Unsupported file type for import: ${filepath}`)
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
function loadNixFile(content, runtime) {
    // Translate Nix to JavaScript
    let jsCode = convertToJs(content)

    // Strip import statement if present (we already have runtime available)
    if (jsCode.includes('import { createRuntime }')) {
        jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
        jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
    }

    // Create nixScope with builtins available
    const nixScope = {
        builtins: runtime.builtins,
        ...runtime.builtins
    }

    // Create a minimal runtime for evaluation
    const evalRuntime = {
        scopeStack: [nixScope],
    }

    // Create isolated evaluation scope
    // The generated code is a complete expression, just execute it directly
    // Note: Filter out comment-only lines that break return statements
    const lines = jsCode.split('\n')
    const codeLines = lines.filter(line => {
        const trimmed = line.trim()
        return trimmed.length > 0 && !trimmed.startsWith('//')
    })
    const cleanCode = codeLines.join('\n')

    const evalFunc = new Function(
        'runtime',
        'operators',
        'builtins',
        'nixScope',
        'InterpolatedString',
        'Path',
        `return ${cleanCode}`
    )

    // Execute the generated code with runtime context
    const result = evalFunc(
        evalRuntime,
        runtime.operators,
        runtime.builtins,
        nixScope,
        runtime.InterpolatedString,
        runtime.Path
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
    // Validate the path exists
    validateImportPath(filepath)

    // Read file contents synchronously
    const content = Deno.readTextFileSync(filepath)

    // Determine file type
    const fileType = getImportType(filepath)

    if (fileType === 'json') {
        return loadJsonFile(content, runtime)
    }

    if (fileType === 'nix') {
        return loadNixFile(content, runtime)
    }

    throw new Error(`Unsupported file type for import: ${filepath}`)
}
