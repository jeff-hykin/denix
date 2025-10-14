#!/usr/bin/env -S deno run --allow-all
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import { xmlStylePreview } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/extras/xml_style_preview.js"
import nix from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/nix.js"
import { escapeJsString } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/escape_js_string.js'
import { isValidKeyLiteral } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/is_valid_key_literal.js'
import { zipLong } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/zip_long.js'
import { indent } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/indent.js'
import { FileSystem, glob } from "https://deno.land/x/quickr@0.8.6/main/file_system.js"
const parser = await createParser(nix) // path or Uint8Array

// full goal: know all possible files needed to build a package
    // nix source code
    // support files
    // urls
// tasks:
    // which values on nixpkgs have the fewest dependencies on other things in nixpkgs
    // understand how big the dependency tree is for a package
    // search for executable names
    // build an app store

// 1.0 goal:
    // given a nixpkgs attribute
        // find the source code file/folder
        // a.legacyPackages.aarch64-darwin.perl.meta
        // compute the package.meta
    // function to flake
        // no callPackage
    // limit package to explicit pkgs. names (not just "potentially all pkgs")
        // grep names, use with_expression, then test the package with those subset of names
        // if an attribute doesn't exist on pkgs, then try to find a directory or nix file with that name
    // limit package to explicit lib. names (not just "potentially all lib tools")
    // put static data in serial form
        // description
        // version
        // all metadata (maintainers, etc)
        // all sub-attributes of all inputs
// 2.0 goal:
    // dependencies find existing flakes
    // translate "with" statements

import { nixJsonEval, currentSystem } from "https://esm.sh/gh/jeff-hykin/deno_nix_api@57bffb7/tools/basics_impure.js"
import { attrPathListToNixCode, escapeStringForNix, jsValueToNix } from "https://esm.sh/gh/jeff-hykin/deno_nix_api@57bffb7/tools/basics_pure.js"
import { setAttr, appendToAttrListLiteral, findAndReplaceAll } from "https://esm.sh/gh/jeff-hykin/deno_nix_api@57bffb7/tools/parsing_pure.js"

import storageObject from "https://deno.land/x/storage_object@0.0.2.0/main.js"
const nixBaseVersion = "25.05"
const system = await currentSystem()
export async function getMeta(attrPath) {
    const key = "getMeta:3432:"+JSON.stringify(attrPath)
    if (storageObject[key]) {
        return storageObject[key]
    }
    let result = await nixJsonEval(`(import <nixpkgs> {}).${attrPathListToNixCode([ attrPath, "meta" ])}`, { hash: nixBaseVersion })
    storageObject[key] = result
    return result
    // return await nixJsonEval(`(import <nixpkgs> {}).${attrPathListToNixCode([ "legacyPackages", system, attrPath, "meta" ])}`, { hash: nixBaseVersion })
}
export async function getMaintainer(name) {
    return await nixJsonEval(`(import <nixpkgs> {}).lib.${attrPathListToNixCode(["maintainers", name])}`, { hash: nixBaseVersion })
}

const addDefaultArgValue = ({nixCode, arg, value, })=>{
    return findAndReplaceAll({
        nixCode,
        pattern: `(formals (formal (identifier) @name) @section)`,
        nameToReplace: "section",
        replacement: ({name, section})=>{
            if (name.text != arg) {
                return section.text
            }
            return `${name.text} ? ${value}`
        },
    })
}

export async function translate(packageAttrName) {
    const meta = await getMeta(packageAttrName)
    const position = meta.position.replace(/:\d+$/,"")
    if (!await FileSystem.exists(position)) {
        throw Error(`Couldn't find a path for ${packageAttrName}. position=${JSON.stringify(position)}`)
    }
    
    let code = await FileSystem.read(position)
    if (!code) {
        throw Error(`Couldn't find a path for ${packageAttrName}. position=${JSON.stringify(position)}`)
    }
    // two to four space indent
    code = code.replace(/(\n|^) +/g, (each)=>each.replace(/( +)/g, "$1$1"))
    
    const node = parser.parse(code).rootNode
    let usedLib = false
    function translateInner(node, {topLevel=false}={}) {
        // 
        // helpers
        // 
            const fallbackTranslate = (node)=>"/* FIXME: */" + node.text

        // 
        // 
        // main "switch"
        // 
        // 
        if (node.type == "source_code") {
            let contents = node.children.map(each=>translateInner(each, {topLevel:true})).join("")
            const metaName = meta.name
            delete meta.maintainersPosition
            delete meta.position
            delete meta.name
            const [name, version] = metaName.split(/(?<=.)-(?=\d+\.)/)
            const staticContent = JSON.stringify({
                version,
                name,
                src: {},
                meta,
            }, null, 4)
            // replace meta with static data
            contents = setAttr({
                nixCode: contents,
                attrName: "meta",
                valueAsCode: `staticData.meta`,
            })
            contents = addDefaultArgValue({
                nixCode: contents,
                arg: "version",
                value: jsValueToNix(version),
            })
            contents = addDefaultArgValue({
                nixCode: contents,
                arg: "self",
                value: "null",
            })
            contents = addDefaultArgValue({
                nixCode: contents,
                arg: "sha256",
                value: "null",
            })
            contents = addDefaultArgValue({
                nixCode: contents,
                arg: "passthruFun",
                value: "_: {}",
            })
            const flake = `{
                description = ${escapeStringForNix(meta.description)};

                inputs = {
                    static.url = "path:./static.json";
                    static.flake = false;
                    libSource.url = "github:divnix/nixpkgs.lib";
                    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
                    flakeUtils.url = "github:numtide/flake-utils";
                    # makeCallPackageFlake.url = "github:jeff-hykin/denix/6077a2bf165411fd2f75c7bd6517d70ddf804080/?dir=decentralizer/examples/flakes/createCallPackage";
                };
                
                outputs = { self, static, libSource, flakeUtils, nixpkgs, ... }:
                    let
                        staticData = builtins.fromJSON (builtins.readFile static.outPath);
                        lib = libSource.lib;
                    in
                        flakeUtils.lib.eachSystem staticData.meta.platforms (system:
                            let
                                pkgs = nixpkgs.legacyPackages.\${system};
                            in
                                {
                                    packages = {
                                        default = (pkgs.callPackage
                                            (${indent({string:contents, by:"                                            ", noLead:true})}
                                            )
                                            {}
                                        );
                                    };
                                }
                        )
                ;
            }`.replace(/\n            /g,"\n")
            
            return {
                xmlStylePreview: xmlStylePreview(node),
                staticContent,
                flake,
            }
        } else if (node.type == "$(" || node.type == ")" || node.type == "`") {
        
        // 
        // couldn't translate
        // 
        } else {
            if (topLevel) {
                return fallbackTranslate(node)
            } else {
                return node.text
            }
        }
    }
    return translateInner(node)
}

function aggregateStrings(array) {
    const result = []
    for (const item of array) {
        const prev = result[result.length - 1]
        if (typeof item === "string" && typeof prev === "string") {
            result[result.length - 1] = prev + item
        } else {
            result.push(item)
        }
    }
    return result
}
function shellEscapeArg(str) {
    if (str.length == 0) {
        return ``
    }
    if (str.match(/^-*\w+$/)) {
        return str
    } else {
        return `'${str.replace(/'/g,`'"'"'`)}'`
    }
}

// 
// generic helpers
// 
function escapeJsKeyAccess(key) {
    if (isValidKeyLiteral(key)) {
        return `.${key}`
    } else {
        return `[${JSON.stringify(key)}]`
    }
}