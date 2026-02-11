// import { Parser, parserFromWasm, xmlStylePreview } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.0/main/main.js"
import nixTreeSitter from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@c37fc96/main/nix.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

export const parser = await createParser(nixTreeSitter) // argument is path or Uint8Array
export const parse = (...args) => parser.parse(...args)

// For visualizing nix programs as if they were HTML
const treetoAstString = (tree) => {
    const rootNode = tree.rootNode || tree
    const outputs = []
    let indent = ""
    for (const [ parents, node, direction ] of rootNode.traverse()) {
        const isLeafNode = direction == "-"
        if (isLeafNode) {
            outputs.push(`${indent}<${node.type} text=${JSON.stringify(node.text)} />`)
        } if (direction == "->") {
            outputs.push(`${indent}<${node.type}>`)
            indent += "    "
        } else if (direction == "<-") {
            indent = indent.slice(0,-4)
            outputs.push(`${indent}</${node.type}>`)
        }
    }
    return outputs.join("\n")
}

// Export only the alias (preferred name)
export const xmlStylePreview = treetoAstString