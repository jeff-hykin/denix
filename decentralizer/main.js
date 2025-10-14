#!/usr/bin/env -S deno run --allow-all
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import { xmlStylePreview } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/extras/xml_style_preview.js"
import nix from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/nix.js"
import { FileSystem, glob } from "https://deno.land/x/quickr@0.8.7/main/file_system.js"
import { escapeJsString } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/escape_js_string.js'
import { isValidKeyLiteral } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/is_valid_key_literal.js'
import { zipLong } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/zip_long.js'
import { translate, getMeta } from "./api.js"

// const translated = await translate("cowsay")
// await FileSystem.write({path:`${FileSystem.thisFolder}/examples/non_flakes/cowsay/package.nix.xml`, data: translated.xmlStylePreview, overwrite: true})
// await FileSystem.write({path:`${FileSystem.thisFolder}/examples/non_flakes/cowsay/flake.nix`, data: translated.flake, overwrite: true})
// await FileSystem.write({path:`${FileSystem.thisFolder}/examples/non_flakes/cowsay/static.json`, data: translated.staticContent, overwrite: true})
const meta = await getMeta("perl")
const translated = await translate("perl")
await FileSystem.remove(`${FileSystem.thisFolder}/examples/non_flakes/perl/`)
await FileSystem.copy({from:`${FileSystem.dirname(meta.position.replace(/:\d+$/,""))}`, to:`${FileSystem.thisFolder}/examples/non_flakes/perl/`, overwrite: true})
await FileSystem.write({path:`${FileSystem.thisFolder}/examples/non_flakes/perl/package.nix.xml`, data: translated.xmlStylePreview, overwrite: true})
await FileSystem.write({path:`${FileSystem.thisFolder}/examples/non_flakes/perl/flake.nix`, data: translated.flake, overwrite: true})
await FileSystem.write({path:`${FileSystem.thisFolder}/examples/non_flakes/perl/static.json`, data: translated.staticContent, overwrite: true})
