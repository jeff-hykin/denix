import { parserFromWasm, flatNodeList } from "https://deno.land/x/deno_tree_sitter@0.1.3.0/main.js"
import nixTreeSitter from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/nix.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

export const parser = await parserFromWasm(nixTreeSitter) // argument is path or Uint8Array

export const parse = parser.parse

// For visualizing nix programs as if they were HTML
export const treetoAstString = (tree) => {
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

export const nixFileToXml = async (path, outputPath=null)=>{
    return await FileSystem.write({
        path: outputPath || `${path}.xml`,
        data: treetoAstString(
            parse(
                await FileSystem.read(path)
            )
        ),
    })
}