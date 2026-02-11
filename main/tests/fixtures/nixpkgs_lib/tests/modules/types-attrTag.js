import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//    config,
//    options,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            Object.defineProperty(nixScope, "forceDeep", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["deepSeq"](nixScope["x"])(nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergedSubOption", {enumerable: true, get(){return (nixScope["options"]["merged"]["type"]["getSubOptions"](nixScope["options"]["merged"]["loc"]))["extensible"];}});
            return ({"options": ({"intStrings": nixScope["mkOption"](({"type": nixScope["types"]["attrsOf"]((nixScope["types"]["attrTag"](({"left": nixScope["mkOption"](({"type": nixScope["types"]["int"]})), "right": nixScope["mkOption"](({"type": nixScope["types"]["str"]}))}))))})), "nested": nixScope["mkOption"](({"type": nixScope["types"]["attrTag"](({"left": nixScope["mkOption"](({"type": nixScope["types"]["int"]})), "right": nixScope["mkOption"](({"type": nixScope["types"]["attrTag"](({"left": nixScope["mkOption"](({"type": nixScope["types"]["int"]})), "right": nixScope["mkOption"](({"type": nixScope["types"]["str"]}))}))}))}))})), "merged": nixScope["mkOption"](({"type": nixScope["types"]["attrsOf"]((nixScope["types"]["attrTag"](({"yay": nixScope["mkOption"](({"type": nixScope["types"]["int"]})), "extensible": nixScope["mkOption"](({"type": nixScope["types"]["enum"](["foo"])}))}))))})), "submodules": nixScope["mkOption"](({"type": nixScope["types"]["attrsOf"]((nixScope["types"]["attrTag"](({"foo": nixScope["mkOption"](({"type": nixScope["types"]["submodule"](({"options": ({"bar": nixScope["mkOption"](({"type": nixScope["types"]["int"]}))})}))})), "qux": nixScope["mkOption"](({"type": nixScope["types"]["str"], "description": "A qux for when you don't want a foo"}))}))))})), "okChecks": nixScope["mkOption"]({})}), "imports": [(new Path(["./docs.nix"], [])),(function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["merged"] = nixScope["mkOption"](({"type": nixScope["types"]["attrsOf"]((nixScope["types"]["attrTag"](({"nay": nixScope["mkOption"](({"type": nixScope["types"]["bool"]})), "extensible": nixScope["mkOption"](({"type": nixScope["types"]["enum"](["bar"])}))}))))}));
        return obj;
    })()], "config": (function(){
        const obj = {};
        obj["okChecks"] = nixScope["builtins"]["addErrorContext"]("while evaluating the assertions")((((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.intStrings.hello == { right = \"hello world\"");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.intStrings.numberOne == { left = 1");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.merged.negative == { nay = false");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.merged.positive == { yay = 100");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.merged.extensi-foo == { extensible = \"foo\"");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.merged.extensi-bar == { extensible = \"bar\"");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.foo.bar\".type == \"signed integer\"");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.qux\".type == \"string\"");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.qux\".declarations == [ __curPos.file ]");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.qux\".loc == [\n          \"submodules\"\n          \"<name>\"\n          \"qux\"\n        ]");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.qux\".name == \"submodules.<name>.qux\"");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.qux\".description == \"A qux for when you don't want a foo\"");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.qux\".readOnly == false");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.docs.\"submodules.<name>.qux\".visible == true");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "options.submodules.declarations == [ __curPos.file ]");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "lib.length options.submodules.declarationPositions == 1");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(lib.head options.submodules.declarationPositions).file == __curPos.file");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "options.merged.declarations == [\n          __curPos.file\n          __curPos.file\n        ]");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "lib.length options.merged.declarationPositions == 2");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(lib.elemAt options.merged.declarationPositions 0).file == __curPos.file");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(lib.elemAt options.merged.declarationPositions 1).file == __curPos.file");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(lib.elemAt options.merged.declarationPositions 0).line\n        != (lib.elemAt options.merged.declarationPositions 1).line");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "mergedSubOption.declarations == [\n          __curPos.file\n          __curPos.file\n        ]");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "lib.length mergedSubOption.declarationPositions == 2");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(lib.elemAt mergedSubOption.declarationPositions 0).file == __curPos.file");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(lib.elemAt mergedSubOption.declarationPositions 1).file == __curPos.file");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(lib.elemAt mergedSubOption.declarationPositions 0).line\n        != (lib.elemAt mergedSubOption.declarationPositions 1).line");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "lib.length config.docs.\"merged.<name>.extensible\".declarations == 2");
        }
        return true;
    })(operators.equal(nixScope["lib"]["length"](nixScope["config"]["docs"]["merged.<name>.extensible"]["declarations"]), 2n));
    })(operators.notEqual((nixScope["lib"]["elemAt"](nixScope["mergedSubOption"]["declarationPositions"])(0n))["line"], (nixScope["lib"]["elemAt"](nixScope["mergedSubOption"]["declarationPositions"])(1n))["line"]));
    })(operators.equal((nixScope["lib"]["elemAt"](nixScope["mergedSubOption"]["declarationPositions"])(1n))["file"], nixScope["__curPos"]["file"]));
    })(operators.equal((nixScope["lib"]["elemAt"](nixScope["mergedSubOption"]["declarationPositions"])(0n))["file"], nixScope["__curPos"]["file"]));
    })(operators.equal(nixScope["lib"]["length"](nixScope["mergedSubOption"]["declarationPositions"]), 2n));
    })(operators.equal(nixScope["mergedSubOption"]["declarations"], [nixScope["__curPos"]["file"],nixScope["__curPos"]["file"]]));
    })(operators.notEqual((nixScope["lib"]["elemAt"](nixScope["options"]["merged"]["declarationPositions"])(0n))["line"], (nixScope["lib"]["elemAt"](nixScope["options"]["merged"]["declarationPositions"])(1n))["line"]));
    })(operators.equal((nixScope["lib"]["elemAt"](nixScope["options"]["merged"]["declarationPositions"])(1n))["file"], nixScope["__curPos"]["file"]));
    })(operators.equal((nixScope["lib"]["elemAt"](nixScope["options"]["merged"]["declarationPositions"])(0n))["file"], nixScope["__curPos"]["file"]));
    })(operators.equal(nixScope["lib"]["length"](nixScope["options"]["merged"]["declarationPositions"]), 2n));
    })(operators.equal(nixScope["options"]["merged"]["declarations"], [nixScope["__curPos"]["file"],nixScope["__curPos"]["file"]]));
    })(operators.equal((nixScope["lib"]["head"](nixScope["options"]["submodules"]["declarationPositions"]))["file"], nixScope["__curPos"]["file"]));
    })(operators.equal(nixScope["lib"]["length"](nixScope["options"]["submodules"]["declarationPositions"]), 1n));
    })(operators.equal(nixScope["options"]["submodules"]["declarations"], [nixScope["__curPos"]["file"]]));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.qux"]["visible"], true));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.qux"]["readOnly"], false));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.qux"]["description"], "A qux for when you don't want a foo"));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.qux"]["name"], "submodules.<name>.qux"));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.qux"]["loc"], ["submodules","<name>","qux"]));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.qux"]["declarations"], [nixScope["__curPos"]["file"]]));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.qux"]["type"], "string"));
    })(operators.equal(nixScope["config"]["docs"]["submodules.<name>.foo.bar"]["type"], "signed integer"));
    })(operators.equal(nixScope["config"]["merged"]["extensi-bar"], ({"extensible": "bar"})));
    })(operators.equal(nixScope["config"]["merged"]["extensi-foo"], ({"extensible": "foo"})));
    })(operators.equal(nixScope["config"]["merged"]["positive"], ({"yay": 100n})));
    })(operators.equal(nixScope["config"]["merged"]["negative"], ({"nay": false})));
    })(operators.equal(nixScope["config"]["intStrings"]["numberOne"], ({"left": 1n})));
    })(operators.equal(nixScope["config"]["intStrings"]["hello"], ({"right": "hello world"})))));
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        obj["intStrings"]["syntaxError"] = 1n;
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        obj["intStrings"]["syntaxError2"] = {};
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        obj["intStrings"]["syntaxError3"] = ({"a": true, "b": true});
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        obj["intStrings"]["syntaxError4"] = nixScope["lib"]["mkMerge"]([({"a": true}),({"b": true})]);
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        obj["intStrings"]["mergeError"] = nixScope["lib"]["mkMerge"]([({"int": nixScope["throw"]("do not eval")}),({"string": nixScope["throw"]("do not eval")})]);
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        if (obj["intStrings"]["badTagError"] === undefined) obj["intStrings"]["badTagError"] = {};
        obj["intStrings"]["badTagError"]["rite"] = nixScope["throw"]("do not eval");
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        if (obj["intStrings"]["badTagTypeError"] === undefined) obj["intStrings"]["badTagTypeError"] = {};
        obj["intStrings"]["badTagTypeError"]["left"] = "bad";
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        if (obj["intStrings"]["numberOne"] === undefined) obj["intStrings"]["numberOne"] = {};
        obj["intStrings"]["numberOne"]["left"] = 1n;
        if (obj["intStrings"] === undefined) obj["intStrings"] = {};
        if (obj["intStrings"]["hello"] === undefined) obj["intStrings"]["hello"] = {};
        obj["intStrings"]["hello"]["right"] = "hello world";
        if (obj["nested"] === undefined) obj["nested"] = {};
        if (obj["nested"]["right"] === undefined) obj["nested"]["right"] = {};
        obj["nested"]["right"]["left"] = "not a number";
        if (obj["merged"] === undefined) obj["merged"] = {};
        if (obj["merged"]["negative"] === undefined) obj["merged"]["negative"] = {};
        obj["merged"]["negative"]["nay"] = false;
        if (obj["merged"] === undefined) obj["merged"] = {};
        if (obj["merged"]["positive"] === undefined) obj["merged"]["positive"] = {};
        obj["merged"]["positive"]["yay"] = 100n;
        if (obj["merged"] === undefined) obj["merged"] = {};
        if (obj["merged"]["extensi-foo"] === undefined) obj["merged"]["extensi-foo"] = {};
        obj["merged"]["extensi-foo"]["extensible"] = "foo";
        if (obj["merged"] === undefined) obj["merged"] = {};
        if (obj["merged"]["extensi-bar"] === undefined) obj["merged"]["extensi-bar"] = {};
        obj["merged"]["extensi-bar"]["extensible"] = "bar";
        return obj;
    })()});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))