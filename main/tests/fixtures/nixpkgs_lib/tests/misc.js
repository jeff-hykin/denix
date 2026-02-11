import { createRuntime, createFunc } from "../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /**
  Nix evaluation tests for various lib functions.

  Since these tests are implemented with Nix evaluation,
  error checking is limited to what `builtins.tryEval` can detect,
  which is `throw`'s and `abort`'s, without error messages.

  If you need to test error messages or more complex evaluations, see
  `lib/tests/modules.sh`, `lib/tests/sources.sh` or `lib/tests/filesystem.sh` as examples.

  To run these tests:

    [nixpkgs]$ nix-instantiate --eval --strict lib/tests/misc.nix

  If the resulting list is empty, all tests passed.
  Alternatively, to run all `lib` tests:

    [nixpkgs]$ nix-build lib/tests/release.nix
*/(function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["allUnique"] = nixScope["lib"]["allUnique"];
        nixScope["and"] = nixScope["lib"]["and"];
        nixScope["attrNames"] = nixScope["lib"]["attrNames"];
        nixScope["attrsets"] = nixScope["lib"]["attrsets"];
        nixScope["attrsToList"] = nixScope["lib"]["attrsToList"];
        nixScope["bitAnd"] = nixScope["lib"]["bitAnd"];
        nixScope["bitOr"] = nixScope["lib"]["bitOr"];
        nixScope["bitXor"] = nixScope["lib"]["bitXor"];
        nixScope["boolToString"] = nixScope["lib"]["boolToString"];
        nixScope["callPackagesWith"] = nixScope["lib"]["callPackagesWith"];
        nixScope["callPackageWith"] = nixScope["lib"]["callPackageWith"];
        nixScope["cartesianProduct"] = nixScope["lib"]["cartesianProduct"];
        nixScope["cli"] = nixScope["lib"]["cli"];
        nixScope["composeExtensions"] = nixScope["lib"]["composeExtensions"];
        nixScope["composeManyExtensions"] = nixScope["lib"]["composeManyExtensions"];
        nixScope["concatLines"] = nixScope["lib"]["concatLines"];
        nixScope["concatMapAttrs"] = nixScope["lib"]["concatMapAttrs"];
        nixScope["concatMapAttrsStringSep"] = nixScope["lib"]["concatMapAttrsStringSep"];
        nixScope["concatMapStrings"] = nixScope["lib"]["concatMapStrings"];
        nixScope["concatStrings"] = nixScope["lib"]["concatStrings"];
        nixScope["concatStringsSep"] = nixScope["lib"]["concatStringsSep"];
        nixScope["const"] = nixScope["lib"]["const"];
        nixScope["escapeXML"] = nixScope["lib"]["escapeXML"];
        nixScope["evalModules"] = nixScope["lib"]["evalModules"];
        nixScope["extends"] = nixScope["lib"]["extends"];
        nixScope["filter"] = nixScope["lib"]["filter"];
        nixScope["filterAttrs"] = nixScope["lib"]["filterAttrs"];
        nixScope["fix"] = nixScope["lib"]["fix"];
        nixScope["fold"] = nixScope["lib"]["fold"];
        nixScope["foldAttrs"] = nixScope["lib"]["foldAttrs"];
        nixScope["foldl"] = nixScope["lib"]["foldl"];
        nixScope["foldl'"] = nixScope["lib"]["foldl'"];
        nixScope["foldlAttrs"] = nixScope["lib"]["foldlAttrs"];
        nixScope["foldr"] = nixScope["lib"]["foldr"];
        nixScope["functionArgs"] = nixScope["lib"]["functionArgs"];
        nixScope["generators"] = nixScope["lib"]["generators"];
        nixScope["genList"] = nixScope["lib"]["genList"];
        nixScope["getExe"] = nixScope["lib"]["getExe"];
        nixScope["getExe'"] = nixScope["lib"]["getExe'"];
        nixScope["getLicenseFromSpdxIdOr"] = nixScope["lib"]["getLicenseFromSpdxIdOr"];
        nixScope["groupBy"] = nixScope["lib"]["groupBy"];
        nixScope["groupBy'"] = nixScope["lib"]["groupBy'"];
        nixScope["hasAttrByPath"] = nixScope["lib"]["hasAttrByPath"];
        nixScope["hasInfix"] = nixScope["lib"]["hasInfix"];
        nixScope["id"] = nixScope["lib"]["id"];
        nixScope["ifilter0"] = nixScope["lib"]["ifilter0"];
        nixScope["isStorePath"] = nixScope["lib"]["isStorePath"];
        nixScope["lazyDerivation"] = nixScope["lib"]["lazyDerivation"];
        nixScope["length"] = nixScope["lib"]["length"];
        nixScope["lists"] = nixScope["lib"]["lists"];
        nixScope["listToAttrs"] = nixScope["lib"]["listToAttrs"];
        nixScope["makeExtensible"] = nixScope["lib"]["makeExtensible"];
        nixScope["makeIncludePath"] = nixScope["lib"]["makeIncludePath"];
        nixScope["makeOverridable"] = nixScope["lib"]["makeOverridable"];
        nixScope["mapAttrs"] = nixScope["lib"]["mapAttrs"];
        nixScope["mapCartesianProduct"] = nixScope["lib"]["mapCartesianProduct"];
        nixScope["matchAttrs"] = nixScope["lib"]["matchAttrs"];
        nixScope["mergeAttrs"] = nixScope["lib"]["mergeAttrs"];
        nixScope["meta"] = nixScope["lib"]["meta"];
        nixScope["mod"] = nixScope["lib"]["mod"];
        nixScope["nameValuePair"] = nixScope["lib"]["nameValuePair"];
        nixScope["optionalDrvAttr"] = nixScope["lib"]["optionalDrvAttr"];
        nixScope["optionAttrSetToDocList"] = nixScope["lib"]["optionAttrSetToDocList"];
        nixScope["overrideExisting"] = nixScope["lib"]["overrideExisting"];
        nixScope["packagesFromDirectoryRecursive"] = nixScope["lib"]["packagesFromDirectoryRecursive"];
        nixScope["pipe"] = nixScope["lib"]["pipe"];
        nixScope["range"] = nixScope["lib"]["range"];
        nixScope["recursiveUpdateUntil"] = nixScope["lib"]["recursiveUpdateUntil"];
        nixScope["removePrefix"] = nixScope["lib"]["removePrefix"];
        nixScope["replaceString"] = nixScope["lib"]["replaceString"];
        nixScope["replicate"] = nixScope["lib"]["replicate"];
        nixScope["runTests"] = nixScope["lib"]["runTests"];
        nixScope["setFunctionArgs"] = nixScope["lib"]["setFunctionArgs"];
        nixScope["showAttrPath"] = nixScope["lib"]["showAttrPath"];
        nixScope["sort"] = nixScope["lib"]["sort"];
        nixScope["sortOn"] = nixScope["lib"]["sortOn"];
        nixScope["stringLength"] = nixScope["lib"]["stringLength"];
        nixScope["strings"] = nixScope["lib"]["strings"];
        nixScope["stringToCharacters"] = nixScope["lib"]["stringToCharacters"];
        nixScope["systems"] = nixScope["lib"]["systems"];
        nixScope["tail"] = nixScope["lib"]["tail"];
        nixScope["take"] = nixScope["lib"]["take"];
        nixScope["testAllTrue"] = nixScope["lib"]["testAllTrue"];
        nixScope["toBaseDigits"] = nixScope["lib"]["toBaseDigits"];
        nixScope["toExtension"] = nixScope["lib"]["toExtension"];
        nixScope["toHexString"] = nixScope["lib"]["toHexString"];
        nixScope["fromHexString"] = nixScope["lib"]["fromHexString"];
        nixScope["toInt"] = nixScope["lib"]["toInt"];
        nixScope["toIntBase10"] = nixScope["lib"]["toIntBase10"];
        nixScope["toShellVars"] = nixScope["lib"]["toShellVars"];
        nixScope["types"] = nixScope["lib"]["types"];
        nixScope["updateManyAttrsByPath"] = nixScope["lib"]["updateManyAttrsByPath"];
        nixScope["versions"] = nixScope["lib"]["versions"];
        nixScope["xor"] = nixScope["lib"]["xor"];
        Object.defineProperty(nixScope, "lib", {enumerable: true, get(){return nixScope["import"]((new Path(["../default.nix"], [])));}});
        Object.defineProperty(nixScope, "testingThrow", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["expr"] = arg; runtime.scopeStack.push(nixScope); try { return ({"expr": (nixScope["builtins"]["tryEval"]((nixScope["builtins"]["seq"](nixScope["expr"])("didn't throw")))), "expected": ({"success": false, "value": false})}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "testingEval", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["expr"] = arg; runtime.scopeStack.push(nixScope); try { return ({"expr": (nixScope["builtins"]["tryEval"](nixScope["expr"]))["success"], "expected": true}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "testSanitizeDerivationName", {enumerable: true, get(){return 

// args: {
//    name,
//    expected,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "drv", {enumerable: true, get(){return nixScope["derivation"](({"name": nixScope["strings"]["sanitizeDerivationName"](nixScope["name"]), "builder": "x", "system": "x"}));}});
            return ({"expr": nixScope["builtins"]["seq"](nixScope["drv"]["drvPath"])(nixScope["drv"]["name"]), "expected": nixScope["expected"]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ));}});
        return nixScope["runTests"](({"testFunctionArgsMakeOverridable": ({"expr": nixScope["functionArgs"]((nixScope["makeOverridable"]((

// args: {
//    a,
//    b,
//    c,
//    ,
//}
createFunc({"c": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                {}
            )))))), "expected": ({"a": false, "b": false, "c": true})}), "testFunctionArgsMakeOverridableOverride": ({"expr": nixScope["functionArgs"]((nixScope["makeOverridable"]((

// args: {
//    a,
//    b,
//    c,
//    ,
//}
createFunc({"c": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                {}
            ))))(({"a": 1n, "b": 2n})))["override"]), "expected": ({"a": false, "b": false, "c": true})}), "testCallPackageWithOverridePreservesArguments": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "f", {enumerable: true, get(){return 

// args: {
//    a,
//    b,
//    ,
//}
createFunc({"a": (nixScope)=>(0n),}, null, {}, (nixScope)=>(
                {}
            ));}});
        Object.defineProperty(nixScope, "f'", {enumerable: true, get(){return nixScope["callPackageWith"](({"a": 1n, "b": 2n}))(nixScope["f"])({});}});
        return ({"expr": nixScope["functionArgs"](nixScope["f'"]["override"]), "expected": nixScope["functionArgs"](nixScope["f"])});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testCallPackagesWithOverridePreservesArguments": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "f", {enumerable: true, get(){return 

// args: {
//    a,
//    b,
//    ,
//}
createFunc({"a": (nixScope)=>(0n),}, null, {}, (nixScope)=>(
                ({"nested": {}})
            ));}});
        Object.defineProperty(nixScope, "f'", {enumerable: true, get(){return nixScope["callPackagesWith"](({"a": 1n, "b": 2n}))(nixScope["f"])({});}});
        return ({"expr": nixScope["functionArgs"](nixScope["f'"]["nested"]["override"]), "expected": nixScope["functionArgs"](nixScope["f"])});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testId": ({"expr": nixScope["id"](1n), "expected": 1n}), "testConst": ({"expr": nixScope["const"](2n)(3n), "expected": 2n}), "testPipe": ({"expr": nixScope["pipe"](2n)([((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"], 2n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.multiply(nixScope["x"], 2n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))]), "expected": 8n}), "testPipeEmpty": ({"expr": nixScope["pipe"](2n)([]), "expected": 2n}), "testPipeStrings": ({"expr": nixScope["pipe"]([3n,4n])([(nixScope["map"](nixScope["toString"])),(nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["s"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["s"], ""); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))),nixScope["concatStrings"]]), "expected": `
      3
      4
    `}), "testAnd": ({"expr": nixScope["and"](true)(false), "expected": false}), "testXor": ({"expr": [(nixScope["xor"](true)(false)),(nixScope["xor"](true)(true)),(nixScope["xor"](false)(false)),(nixScope["xor"](false)(true))], "expected": [true,false,false,true]}), "testComposeExtensions": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "obj", {enumerable: true, get(){return nixScope["makeExtensible"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return ({"foo": nixScope["self"]["bar"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
        Object.defineProperty(nixScope, "f", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["super"] = arg; runtime.scopeStack.push(nixScope); try { return ({"bar": false, "baz": true}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "g", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["super"] = arg; runtime.scopeStack.push(nixScope); try { return ({"bar": operators.selectOrDefault(nixScope["super"], ["baz"], false)}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "f_o_g", {enumerable: true, get(){return nixScope["composeExtensions"](nixScope["f"])(nixScope["g"]);}});
        Object.defineProperty(nixScope, "composed", {enumerable: true, get(){return nixScope["obj"]["extend"](nixScope["f_o_g"]);}});
        return nixScope["composed"]["foo"];
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": true}), "testComposeManyExtensions0": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "obj", {enumerable: true, get(){return nixScope["makeExtensible"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return ({"foo": true}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
        Object.defineProperty(nixScope, "emptyComposition", {enumerable: true, get(){return nixScope["composeManyExtensions"]([]);}});
        Object.defineProperty(nixScope, "composed", {enumerable: true, get(){return nixScope["obj"]["extend"](nixScope["emptyComposition"]);}});
        return nixScope["composed"]["foo"];
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": true}), "testComposeManyExtensions": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "f", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["super"] = arg; runtime.scopeStack.push(nixScope); try { return ({"bar": false, "baz": true}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "g", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["super"] = arg; runtime.scopeStack.push(nixScope); try { return ({"bar": operators.selectOrDefault(nixScope["super"], ["baz"], false)}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "h", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["super"] = arg; runtime.scopeStack.push(nixScope); try { return ({"qux": operators.selectOrDefault(nixScope["super"], ["bar"], false)}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "obj", {enumerable: true, get(){return nixScope["makeExtensible"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return ({"foo": nixScope["self"]["qux"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
        return ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "composition", {enumerable: true, get(){return nixScope["composeManyExtensions"]([nixScope["f"],nixScope["g"],nixScope["h"]]);}});
        Object.defineProperty(nixScope, "composed", {enumerable: true, get(){return nixScope["obj"]["extend"](nixScope["composition"]);}});
        return nixScope["composed"]["foo"];
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": (nixScope["obj"]["extend"]((nixScope["composeExtensions"](nixScope["f"])((nixScope["composeExtensions"](nixScope["g"])(nixScope["h"]))))))["foo"]});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testBitAnd": ({"expr": (nixScope["bitAnd"](3n)(10n)), "expected": 2n}), "testBitOr": ({"expr": (nixScope["bitOr"](3n)(10n)), "expected": 11n}), "testBitXor": ({"expr": (nixScope["bitXor"](3n)(10n)), "expected": 9n}), "testToHexString": ({"expr": nixScope["toHexString"](250n), "expected": "FA"}), "testFromHexStringFirstExample": ({"expr": nixScope["fromHexString"]("FF"), "expected": 255n}), "testFromHexStringSecondExample": ({"expr": nixScope["fromHexString"]((nixScope["builtins"]["hashString"]("sha256")("test"))), "expected": 9223372036854775807n}), "testFromHexStringWithPrefix": ({"expr": nixScope["fromHexString"]("0Xf"), "expected": 15n}), "testToBaseDigits": ({"expr": nixScope["toBaseDigits"](2n)(6n), "expected": [1n,1n,0n]}), "testFunctionArgsFunctor": ({"expr": nixScope["functionArgs"](({"__functor": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return 

// args: {
//    a,
//    b,
//}
createFunc({}, null, {}, (nixScope)=>(
                null
            )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})), "expected": ({"a": false, "b": false})}), "testFunctionArgsSetFunctionArgs": ({"expr": nixScope["functionArgs"]((nixScope["setFunctionArgs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["args"]["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"x": false})))), "expected": ({"x": false})}), "testConcatMapStrings": ({"expr": nixScope["concatMapStrings"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"], ";"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(["a","b","c"]), "expected": "a;b;c;"}), "testConcatStringsSep": ({"expr": nixScope["concatStringsSep"](",")(["a","b","c"]), "expected": "a,b,c"}), "testConcatMapAttrsStringSepExamples": ({"expr": nixScope["concatMapAttrsStringSep"]("")(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", ": foo-", ""], [()=>(nixScope["name"]), ()=>(nixScope["value"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"a": "0.1.0", "b": "0.2.0"})), "expected": "a: foo-0.1.0"}), "testConcatLines": ({"expr": nixScope["concatLines"](["a","b","c"]), "expected": "a"}), "testMakeIncludePathWithPkgs": ({"expr": (nixScope["makeIncludePath"]([(function(){
    const obj = {};
    obj["outPath"] = "/default";
    if (obj["dev"] === undefined) obj["dev"] = {};
    obj["dev"]["outPath"] = "/dev";
    if (obj["out"] === undefined) obj["out"] = {};
    obj["out"]["outPath"] = "/out";
    return obj;
})(),(function(){
    const obj = {};
    obj["outPath"] = "/default";
    if (obj["out"] === undefined) obj["out"] = {};
    obj["out"]["outPath"] = "/out";
    return obj;
})(),({"outPath": "/default"}),(function(){
    const obj = {};
    obj["outPath"] = "/default";
    obj["outputSpecified"] = true;
    if (obj["dev"] === undefined) obj["dev"] = {};
    obj["dev"]["outPath"] = "/dev";
    return obj;
})()])), "expected": "/dev/include:/out/include:/default/include:/default/include"}), "testMakeIncludePathWithEmptyList": ({"expr": (nixScope["makeIncludePath"]([])), "expected": ""}), "testMakeIncludePathWithOneString": ({"expr": (nixScope["makeIncludePath"](["/usr"])), "expected": "/usr/include"}), "testMakeIncludePathWithManyString": ({"expr": (nixScope["makeIncludePath"](["/usr","/usr/local"])), "expected": "/usr/include:/usr/local/include"}), "testReplaceStringString": ({"expr": nixScope["strings"]["replaceString"](".")("_")("v1.2.3"), "expected": "v1_2_3"}), "testReplicateString": ({"expr": nixScope["strings"]["replicate"](5n)("hello"), "expected": "hellohellohellohellohello"}), "testTrimString": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "testValues", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["f"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"empty": "", "cr": "", "lf": "", "tab": "", "spaces": "   ", "leading": "  Hello, world", "trailing": "Hello, world   ", "mixed": " Hello, world ", "mixed-tabs": " ", "multiline": "  Hello,", "multiline-crlf": "  Hello,"})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return ({"leading": nixScope["testValues"]((nixScope["strings"]["trimWith"](({"start": true})))), "trailing": nixScope["testValues"]((nixScope["strings"]["trimWith"](({"end": true})))), "both": nixScope["testValues"](nixScope["strings"]["trim"])});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": ({"leading": ({"empty": "", "cr": "", "lf": "", "tab": "", "spaces": "", "leading": "Hello, world", "trailing": "Hello, world   ", "mixed": "Hello, world ", "mixed-tabs": "Hello, world ", "multiline": "Hello,", "multiline-crlf": "Hello,"}), "trailing": ({"empty": "", "cr": "", "lf": "", "tab": "", "spaces": "", "leading": "  Hello, world", "trailing": "Hello, world", "mixed": " Hello, world", "mixed-tabs": " ", "multiline": "  Hello,", "multiline-crlf": "  Hello,"}), "both": ({"empty": "", "cr": "", "lf": "", "tab": "", "spaces": "", "leading": "Hello, world", "trailing": "Hello, world", "mixed": "Hello, world", "mixed-tabs": "Hello, world", "multiline": "Hello,", "multiline-crlf": "Hello,"})})}), "testSplitStringsSimple": ({"expr": nixScope["strings"]["splitString"](".")("a.b.c.d"), "expected": ["a","b","c","d"]}), "testSplitStringsEmpty": ({"expr": nixScope["strings"]["splitString"](".")("a..b"), "expected": ["a","","b"]}), "testSplitStringsOne": ({"expr": nixScope["strings"]["splitString"](":")("a.b"), "expected": ["a.b"]}), "testSplitStringsNone": ({"expr": nixScope["strings"]["splitString"](".")(""), "expected": [""]}), "testSplitStringsFirstEmpty": ({"expr": nixScope["strings"]["splitString"]("/")("/a/b/c"), "expected": ["","a","b","c"]}), "testSplitStringsLastEmpty": ({"expr": nixScope["strings"]["splitString"](":")("2001:db8:0:0042::8a2e:370:"), "expected": ["2001","db8","0","0042","","8a2e","370",""]}), "testSplitStringsRegex": ({"expr": nixScope["strings"]["splitString"]("[{}]()^$?*+|.")("A"), "expected": ["A","B"]}), "testSplitStringBySimpleDelimiter": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["elem"](nixScope["curr"])([".","-"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(false)("foo.bar-baz"), "expected": ["foo","bar","baz"]}), "testSplitStringByLeadingDelimiter": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["elem"](nixScope["curr"])(["."]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(false)(".foo.bar.baz"), "expected": ["","foo","bar","baz"]}), "testSplitStringByTrailingDelimiter": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["elem"](nixScope["curr"])(["."]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(false)("foo.bar.baz."), "expected": ["foo","bar","baz",""]}), "testSplitStringByMultipleConsecutiveDelimiters": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["elem"](nixScope["curr"])(["."]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(false)("foo...bar"), "expected": ["foo","","","bar"]}), "testSplitStringByKeepingSplitChar": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["elem"](nixScope["curr"])(["."]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(true)("foo.bar.baz"), "expected": ["foo",".bar",".baz"]}), "testSplitStringByCaseTransition": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.notEqual(nixScope["builtins"]["match"]("[a-z]")(nixScope["prev"]), null), operators.notEqual(nixScope["builtins"]["match"]("[A-Z]")(nixScope["curr"]), null)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(true)("fooBarBaz"), "expected": ["foo","Bar","Baz"]}), "testSplitStringByEmptyString": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["elem"](nixScope["curr"])(["."]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(false)(""), "expected": [""]}), "testSplitStringByComplexPredicate": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.and(operators.and(operators.notEqual(nixScope["prev"], ""), operators.notEqual(nixScope["curr"], "")), operators.notEqual(nixScope["builtins"]["match"]("[0-9]")(nixScope["prev"]), null)), operators.notEqual(nixScope["builtins"]["match"]("[a-z]")(nixScope["curr"]), null)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(true)("123abc456def"), "expected": ["123","abc456","def"]}), "testSplitStringByUpperCaseStart": ({"expr": nixScope["strings"]["splitStringBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["curr"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["builtins"]["match"]("[A-Z]")(nixScope["curr"]), null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(true)("FooBarBaz"), "expected": ["","Foo","Bar","Baz"]}), "testEscapeShellArg": ({"expr": nixScope["strings"]["escapeShellArg"]("esc'ape"), "expected": "'esc'"}), "testEscapeShellArgEmpty": ({"expr": nixScope["strings"]["escapeShellArg"](""), "expected": "''"}), "testEscapeShellArgs": ({"expr": nixScope["strings"]["escapeShellArgs"](["one","two three","four'five"]), "expected": "one 'two three' 'four'"}), "testEscapeShellArgsUnicode": ({"expr": nixScope["strings"]["escapeShellArg"]("á"), "expected": "'á'"}), "testSplitStringsDerivation": ({"expr": nixScope["take"](3n)((nixScope["strings"]["splitString"]("/")((nixScope["derivation"](({"name": "name", "builder": "builder", "system": "system"})))))), "expected": ["","nix","store"]}), "testSplitVersionSingle": ({"expr": nixScope["versions"]["splitVersion"]("1"), "expected": ["1"]}), "testSplitVersionDouble": ({"expr": nixScope["versions"]["splitVersion"]("1.2"), "expected": ["1","2"]}), "testSplitVersionTriple": ({"expr": nixScope["versions"]["splitVersion"]("1.2.3"), "expected": ["1","2","3"]}), "testPadVersionLess": ({"expr": nixScope["versions"]["pad"](3n)("1.2"), "expected": "1.2.0"}), "testPadVersionLessExtra": ({"expr": nixScope["versions"]["pad"](3n)("1.3-rc1"), "expected": "1.3.0-rc1"}), "testPadVersionMore": ({"expr": nixScope["versions"]["pad"](3n)("1.2.3.4"), "expected": "1.2.3"}), "testIsStorePath": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["goodPath"] = (new InterpolatedString(["", "/d945ibfx9x185xf04b890y4f9g3cbb63-python-2.7.11"], [()=>(nixScope["builtins"]["storeDir"])]));
        nixScope["goodCAPath"] = "/1121rp0gvr1qya7hvy925g5kjwg66acz6sn1ra1hca09f1z5dsab";
        return ({"storePath": nixScope["isStorePath"](nixScope["goodPath"]), "storePathDerivation": nixScope["isStorePath"]((nixScope["import"]((new Path(["../.."], [])))(({"system": "x86_64-linux"})))["hello"]), "storePathAppendix": nixScope["isStorePath"]((new InterpolatedString(["", "/bin/python"], [()=>(nixScope["goodPath"])]))), "nonAbsolute": nixScope["isStorePath"]((nixScope["concatStrings"]((nixScope["tail"]((nixScope["stringToCharacters"](nixScope["goodPath"]))))))), "asPath": nixScope["isStorePath"]((operators.add((new Path(["/."], [])), nixScope["goodPath"]))), "otherPath": nixScope["isStorePath"]("/something/else"), "caPath": nixScope["isStorePath"](nixScope["goodCAPath"]), "caPathAppendix": nixScope["isStorePath"]((new InterpolatedString(["", "/bin/python"], [()=>(nixScope["goodCAPath"])]))), "caAsPath": nixScope["isStorePath"]((operators.add((new Path(["/."], [])), nixScope["goodCAPath"]))), "otherVals": ({"attrset": nixScope["isStorePath"]({}), "list": nixScope["isStorePath"]([]), "int": nixScope["isStorePath"](42n)})});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": ({"storePath": true, "storePathDerivation": true, "storePathAppendix": false, "nonAbsolute": false, "asPath": true, "caPath": true, "caPathAppendix": false, "caAsPath": true, "otherPath": false, "otherVals": ({"attrset": false, "list": false, "int": false})})}), "testEscapeXML": ({"expr": nixScope["escapeXML"](`"test" 'test' < & >`), "expected": "&quot;test&quot; &apos;test&apos; &lt; &amp; &gt;"}), "testToShellVars": ({"expr": (new InterpolatedString(["\n      ", "\n    "], [()=>(nixScope["toShellVars"]((function(){
    const obj = {};
    obj["STRing01"] = "just a 'string'";
    obj["_array_"] = ["with","more strings"];
    obj["drv"] = ({"outPath": "/drv", "foo": "ignored attribute"});
    obj["path"] = (new Path(["/path"], []));
    obj["stringable"] = ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return "hello toString"; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "bar": "ignored attribute"});
    if (obj["assoc"] === undefined) obj["assoc"] = {};
    obj["assoc"]["with some"] = `
          strings
          possibly newlines
        `;
    return obj;
})()))])), "expected": `
      STRing01='just a '\`}), "testHasInfixFalse": ({"expr": nixScope["hasInfix"]("c")("abde"), "expected": false}), "testHasInfixTrue": ({"expr": nixScope["hasInfix"]("c")("abcde"), "expected": true}), "testHasInfixDerivation": ({"expr": nixScope["hasInfix"]("hello")((nixScope["import"]((new Path(["../.."], [])))(({"system": "x86_64-linux"})))["hello"]), "expected": true}), "testHasInfixPath": ({"expr": nixScope["hasInfix"]("tests")((new Path(["./."], []))), "expected": true}), "testHasInfixPathStoreDir": ({"expr": nixScope["hasInfix"](nixScope["builtins"]["storeDir"])((new Path(["./."], []))), "expected": true}), "testHasInfixToString": ({"expr": nixScope["hasInfix"]("a")(({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return "a"; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})), "expected": true}), "testRemovePrefixExample1": ({"expr": nixScope["removePrefix"]("foo.")("foo.bar.baz"), "expected": "bar.baz"}), "testRemovePrefixExample2": ({"expr": nixScope["removePrefix"]("xxx")("foo.bar.baz"), "expected": "foo.bar.baz"}), "testRemovePrefixEmptyPrefix": ({"expr": nixScope["removePrefix"]("")("foo"), "expected": "foo"}), "testRemovePrefixEmptyString": ({"expr": nixScope["removePrefix"]("foo")(""), "expected": ""}), "testRemovePrefixEmptyBoth": ({"expr": nixScope["removePrefix"]("")(""), "expected": ""}), "testNormalizePath": ({"expr": nixScope["strings"]["normalizePath"]("//a/b//c////d/"), "expected": "/a/b/c/d/"}), "testCharToInt": ({"expr": nixScope["strings"]["charToInt"]("A"), "expected": 65n}), "testEscapeC": ({"expr": nixScope["strings"]["escapeC"]([""," "])("Hello World"), "expected": "Hello"}), "testEscapeURL": nixScope["testAllTrue"]([(operators.equal("", nixScope["strings"]["escapeURL"](""))),(operators.equal("Hello", nixScope["strings"]["escapeURL"]("Hello"))),(operators.equal("Hello%20World", nixScope["strings"]["escapeURL"]("Hello World"))),(operators.equal("Hello%2FWorld", nixScope["strings"]["escapeURL"]("Hello/World"))),(operators.equal("42%25", nixScope["strings"]["escapeURL"]("42%"))),(operators.equal("%20%3F%26%3D%23%2B%25%21%3C%3E%23%22%7B%7D%7C%5C%5E%5B%5D%60%09%3A%2F%40%24%27%28%29%2A%2C%3B", nixScope["strings"]["escapeURL"](" ?&=#+%!<>#")))]), "testToSentenceCase": ({"expr": nixScope["strings"]["toSentenceCase"]("hello world"), "expected": "Hello world"}), "testToSentenceCasePath": nixScope["testingThrow"]((nixScope["strings"]["toSentenceCase"]((new Path(["./."], []))))), "testToCamelCase": ({"expr": nixScope["strings"]["toCamelCase"]("hello world"), "expected": "helloWorld"}), "testToCamelCaseFromKebab": ({"expr": nixScope["strings"]["toCamelCase"]("hello-world"), "expected": "helloWorld"}), "testToCamelCaseFromSnake": ({"expr": nixScope["strings"]["toCamelCase"]("hello_world"), "expected": "helloWorld"}), "testToCamelCaseFromPascal": ({"expr": nixScope["strings"]["toCamelCase"]("HelloWorld"), "expected": "helloWorld"}), "testToCamelCasePath": nixScope["testingThrow"]((nixScope["strings"]["toCamelCase"]((new Path(["./."], []))))), "testToInt": nixScope["testAllTrue"]([(operators.equal(123n, nixScope["toInt"]("123"))),(operators.equal(0n, nixScope["toInt"]("0"))),(operators.equal(123n, nixScope["toInt"](" 123"))),(operators.equal(123n, nixScope["toInt"]("123 "))),(operators.equal(123n, nixScope["toInt"](" 123 "))),(operators.equal(123n, nixScope["toInt"]("   123   "))),(operators.equal(0n, nixScope["toInt"](" 0"))),(operators.equal(0n, nixScope["toInt"]("0 "))),(operators.equal(0n, nixScope["toInt"](" 0 "))),(operators.equal(-1n, nixScope["toInt"]("-1"))),(operators.equal(-1n, nixScope["toInt"](" -1 ")))]), "testToIntFails": nixScope["testAllTrue"]([(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](""))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"]("123 123"))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"]("0 123"))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](" 0d "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](" 1d "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](" d0 "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"]("00"))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"]("01"))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"]("002"))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](" 002 "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](" foo "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](" foo 123 "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toInt"](" foo123 "))), ({"success": false, "value": false})))]), "testToIntBase10": nixScope["testAllTrue"]([(operators.equal(123n, nixScope["toIntBase10"]("123"))),(operators.equal(0n, nixScope["toIntBase10"]("0"))),(operators.equal(123n, nixScope["toIntBase10"](" 123"))),(operators.equal(123n, nixScope["toIntBase10"]("123 "))),(operators.equal(123n, nixScope["toIntBase10"](" 123 "))),(operators.equal(123n, nixScope["toIntBase10"]("   123   "))),(operators.equal(0n, nixScope["toIntBase10"](" 0"))),(operators.equal(0n, nixScope["toIntBase10"]("0 "))),(operators.equal(0n, nixScope["toIntBase10"](" 0 "))),(operators.equal(123n, nixScope["toIntBase10"]("0123"))),(operators.equal(123n, nixScope["toIntBase10"]("0000123"))),(operators.equal(0n, nixScope["toIntBase10"]("000000"))),(operators.equal(123n, nixScope["toIntBase10"](" 0123"))),(operators.equal(123n, nixScope["toIntBase10"]("0123 "))),(operators.equal(123n, nixScope["toIntBase10"](" 0123 "))),(operators.equal(123n, nixScope["toIntBase10"](" 0000123"))),(operators.equal(123n, nixScope["toIntBase10"]("0000123 "))),(operators.equal(123n, nixScope["toIntBase10"](" 0000123 "))),(operators.equal(0n, nixScope["toIntBase10"](" 000000"))),(operators.equal(0n, nixScope["toIntBase10"]("000000 "))),(operators.equal(0n, nixScope["toIntBase10"](" 000000 "))),(operators.equal(-1n, nixScope["toIntBase10"]("-1"))),(operators.equal(-1n, nixScope["toIntBase10"](" -1 ")))]), "testToIntBase10Fails": nixScope["testAllTrue"]([(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](""))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"]("123 123"))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"]("0 123"))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](" 0d "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](" 1d "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](" d0 "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](" foo "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](" foo 123 "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](" foo 00123 "))), ({"success": false, "value": false}))),(operators.equal(nixScope["builtins"]["tryEval"]((nixScope["toIntBase10"](" foo00123 "))), ({"success": false, "value": false})))]), "testFilter": ({"expr": nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["x"], "a"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(["a","b","c","a"]), "expected": ["b","c"]}), "testIfilter0Example": ({"expr": nixScope["ifilter0"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["i"], 0n), operators.greaterThan(nixScope["v"], 2n)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([1n,2n,3n]), "expected": [1n,3n]}), "testIfilter0Empty": ({"expr": nixScope["ifilter0"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["abort"]("shouldn't be evaluated!"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([]), "expected": []}), "testIfilter0IndexOnly": ({"expr": nixScope["length"]((nixScope["ifilter0"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["mod"](nixScope["i"])(2n), 0n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([(nixScope["throw"]("0")),(nixScope["throw"]("1")),(nixScope["throw"]("2")),(nixScope["throw"]("3"))]))), "expected": 2n}), "testIfilter0All": ({"expr": nixScope["ifilter0"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return true; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([10n,11n,12n,13n,14n,15n]), "expected": [10n,11n,12n,13n,14n,15n]}), "testIfilter0First": ({"expr": nixScope["ifilter0"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["i"], 0n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([10n,11n,12n,13n,14n,15n]), "expected": [10n]}), "testIfilter0Last": ({"expr": nixScope["ifilter0"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["i"], 5n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([10n,11n,12n,13n,14n,15n]), "expected": [15n]}), "testFold": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "f", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["op"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fold"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["fold"](nixScope["op"])(0n)((nixScope["range"](0n)(100n))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "assoc", {enumerable: true, get(){return nixScope["f"](nixScope["builtins"]["add"]);}});
        Object.defineProperty(nixScope, "nonAssoc", {enumerable: true, get(){return nixScope["f"](nixScope["builtins"]["sub"]);}});
        return ({"expr": ({"assocRight": nixScope["assoc"](nixScope["foldr"]), "assocRightIsLeft": operators.equal(nixScope["assoc"](nixScope["foldr"]), nixScope["assoc"](nixScope["foldl"])), "nonAssocRight": nixScope["nonAssoc"](nixScope["foldr"]), "nonAssocLeft": nixScope["nonAssoc"](nixScope["foldl"]), "nonAssocRightIsNotLeft": operators.notEqual(nixScope["nonAssoc"](nixScope["foldl"]), nixScope["nonAssoc"](nixScope["foldr"])), "foldIsRight": operators.equal(nixScope["nonAssoc"](nixScope["fold"]), nixScope["nonAssoc"](nixScope["foldr"]))}), "expected": ({"assocRight": 5050n, "assocRightIsLeft": true, "nonAssocRight": 50n, "nonAssocLeft": (-5050n), "nonAssocRightIsNotLeft": true, "foldIsRight": true})});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testFoldl'Empty": ({"expr": nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["el"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["abort"]("operation not called"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(0n)([]), "expected": 0n}), "testFoldl'IntegerAdding": ({"expr": nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["el"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["acc"], nixScope["el"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(0n)([1n,2n,3n]), "expected": 6n}), "testFoldl'NonDeep": ({"expr": nixScope["take"](3n)((nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["el"] = arg; runtime.scopeStack.push(nixScope); try { return operators.listConcat([nixScope["el"]], nixScope["acc"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([(nixScope["abort"]("unevaluated list entry"))])([1n,2n,3n]))), "expected": [3n,2n,1n]}), "testFoldl'StrictInitial": ({"expr": (nixScope["builtins"]["tryEval"]((nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["el"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["el"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["throw"]("hello")))([]))))["success"], "expected": false}), "testFoldl'Large": ({"expr": nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["el"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["acc"], nixScope["el"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(0n)((nixScope["range"](0n)(100000n))), "expected": 5000050000n}), "testTake": nixScope["testAllTrue"]([(operators.equal([], (nixScope["take"](0n)([1n,2n,3n])))),(operators.equal([1n], (nixScope["take"](1n)([1n,2n,3n])))),(operators.equal([1n,2n], (nixScope["take"](2n)([1n,2n,3n])))),(operators.equal([1n,2n,3n], (nixScope["take"](3n)([1n,2n,3n])))),(operators.equal([1n,2n,3n], (nixScope["take"](4n)([1n,2n,3n]))))]), "testTakeEnd": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["takeEnd"] = nixScope["lib"]["takeEnd"];
        return nixScope["testAllTrue"]([(operators.equal(nixScope["takeEnd"](0n)([1n,2n,3n]), [])),(operators.equal(nixScope["takeEnd"](1n)([1n,2n,3n]), [3n])),(operators.equal(nixScope["takeEnd"](2n)([1n,2n,3n]), [2n,3n])),(operators.equal(nixScope["takeEnd"](3n)([1n,2n,3n]), [1n,2n,3n])),(operators.equal(nixScope["takeEnd"](4n)([1n,2n,3n]), [1n,2n,3n])),(operators.equal(nixScope["takeEnd"](0n)([]), [])),(operators.equal(nixScope["takeEnd"](1n)([]), [])),(operators.equal(nixScope["takeEnd"]((-1n))([1n,2n,3n]), [])),(operators.equal(nixScope["takeEnd"]((-1n))([]), []))]);
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testDrop": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["drop"] = nixScope["lib"]["drop"];
        return nixScope["testAllTrue"]([(operators.equal(nixScope["drop"](0n)([1n,2n,3n]), [1n,2n,3n])),(operators.equal(nixScope["drop"](1n)([1n,2n,3n]), [2n,3n])),(operators.equal(nixScope["drop"](2n)([1n,2n,3n]), [3n])),(operators.equal(nixScope["drop"](3n)([1n,2n,3n]), [])),(operators.equal(nixScope["drop"](4n)([1n,2n,3n]), [])),(operators.equal(nixScope["drop"](0n)([]), [])),(operators.equal(nixScope["drop"](1n)([]), []))]);
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testDropEnd": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["dropEnd"] = nixScope["lib"]["dropEnd"];
        return nixScope["testAllTrue"]([(operators.equal(nixScope["dropEnd"](0n)([1n,2n,3n]), [1n,2n,3n])),(operators.equal(nixScope["dropEnd"](1n)([1n,2n,3n]), [1n,2n])),(operators.equal(nixScope["dropEnd"](2n)([1n,2n,3n]), [1n])),(operators.equal(nixScope["dropEnd"](3n)([1n,2n,3n]), [])),(operators.equal(nixScope["dropEnd"](4n)([1n,2n,3n]), [])),(operators.equal(nixScope["dropEnd"](0n)([]), [])),(operators.equal(nixScope["dropEnd"](1n)([]), [])),(operators.equal(nixScope["dropEnd"]((-1n))([1n,2n,3n]), [1n,2n,3n])),(operators.equal(nixScope["dropEnd"]((-1n))([]), []))]);
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testListHasPrefixExample1": ({"expr": nixScope["lists"]["hasPrefix"]([1n,2n])([1n,2n,3n,4n]), "expected": true}), "testListHasPrefixExample2": ({"expr": nixScope["lists"]["hasPrefix"]([0n,1n])([1n,2n,3n,4n]), "expected": false}), "testListHasPrefixLazy": ({"expr": nixScope["lists"]["hasPrefix"]([1n])([1n,(nixScope["abort"]("lib.lists.hasPrefix is not lazy"))]), "expected": true}), "testListHasPrefixEmptyPrefix": ({"expr": nixScope["lists"]["hasPrefix"]([])([1n,2n]), "expected": true}), "testListHasPrefixEmptyList": ({"expr": nixScope["lists"]["hasPrefix"]([1n,2n])([]), "expected": false}), "testListRemovePrefixExample1": ({"expr": nixScope["lists"]["removePrefix"]([1n,2n])([1n,2n,3n,4n]), "expected": [3n,4n]}), "testListRemovePrefixExample2": ({"expr": (nixScope["builtins"]["tryEval"]((nixScope["lists"]["removePrefix"]([0n,1n])([1n,2n,3n,4n]))))["success"], "expected": false}), "testListRemovePrefixEmptyPrefix": ({"expr": nixScope["lists"]["removePrefix"]([])([1n,2n]), "expected": [1n,2n]}), "testListRemovePrefixEmptyList": ({"expr": (nixScope["builtins"]["tryEval"]((nixScope["lists"]["removePrefix"]([1n,2n])([]))))["success"], "expected": false}), "testFoldAttrs": ({"expr": nixScope["foldAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return operators.listConcat([nixScope["n"]], nixScope["a"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([])([({"a": 2n, "b": 7n}),({"a": 3n, "c": 8n})]), "expected": ({"a": [2n,3n], "b": [7n], "c": [8n]})}), "testListCommonPrefixExample1": ({"expr": nixScope["lists"]["commonPrefix"]([1n,2n,3n,4n,5n,6n])([1n,2n,4n,8n]), "expected": [1n,2n]}), "testListCommonPrefixExample2": ({"expr": nixScope["lists"]["commonPrefix"]([1n,2n,3n])([1n,2n,3n,4n,5n]), "expected": [1n,2n,3n]}), "testListCommonPrefixExample3": ({"expr": nixScope["lists"]["commonPrefix"]([1n,2n,3n])([4n,5n,6n]), "expected": []}), "testListCommonPrefixEmpty": ({"expr": nixScope["lists"]["commonPrefix"]([])([1n,2n,3n]), "expected": []}), "testListCommonPrefixSame": ({"expr": nixScope["lists"]["commonPrefix"]([1n,2n,3n])([1n,2n,3n]), "expected": [1n,2n,3n]}), "testListCommonPrefixLazy": ({"expr": nixScope["lists"]["commonPrefix"]([1n])([1n,(nixScope["abort"]("lib.lists.commonPrefix shouldn't evaluate this"))]), "expected": [1n]}), "testListCommonPrefixLong": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "longList", {enumerable: true, get(){return nixScope["genList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["n"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(100000n);}});
        return ({"expr": nixScope["lists"]["commonPrefix"](nixScope["longList"])(nixScope["longList"]), "expected": nixScope["longList"]});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testSort": ({"expr": nixScope["sort"](nixScope["builtins"]["lessThan"])([40n,2n,30n,42n]), "expected": [2n,30n,40n,42n]}), "testSortOn": ({"expr": nixScope["sortOn"](nixScope["stringLength"])(["aa","b","cccc"]), "expected": ["b","aa","cccc"]}), "testSortOnEmpty": ({"expr": nixScope["sortOn"]((nixScope["throw"]("nope")))([]), "expected": []}), "testSortOnIncomparable": ({"expr": nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]["f"](nixScope["x"]["ok"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["sortOn"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]["ok"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([({"ok": 1n, "f": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"ok": 3n, "f": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"], 3n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"ok": 2n, "f": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})]))), "expected": [1n,2n,6n]}), "testReplaceString": ({"expr": nixScope["replaceString"]("world")("Nix")("Hello, world!"), "expected": "Hello, Nix!"}), "testReplicate": ({"expr": nixScope["replicate"](3n)("a"), "expected": ["a","a","a"]}), "testToIntShouldConvertStringToInt": ({"expr": nixScope["toInt"]("27"), "expected": 27n}), "testToIntShouldThrowErrorIfItCouldNotConvertToInt": ({"expr": nixScope["builtins"]["tryEval"]((nixScope["toInt"]("foo"))), "expected": ({"success": false, "value": false})}), "testHasAttrByPathTrue": ({"expr": nixScope["hasAttrByPath"](["a","b"])(({"a": ({"b": "yey"})})), "expected": true}), "testHasAttrByPathFalse": ({"expr": nixScope["hasAttrByPath"](["a","b"])(({"a": ({"c": "yey"})})), "expected": false}), "testHasAttrByPathNonStrict": ({"expr": nixScope["hasAttrByPath"]([])((nixScope["throw"]("do not use"))), "expected": true}), "testLongestValidPathPrefix_empty_empty": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"]([])({}), "expected": []}), "testLongestValidPathPrefix_empty_nonStrict": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"]([])((nixScope["throw"]("do not use"))), "expected": []}), "testLongestValidPathPrefix_zero": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"](["a",(nixScope["throw"]("do not use"))])(({"d": null})), "expected": []}), "testLongestValidPathPrefix_zero_b": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"](["z","z"])("remarkably harmonious"), "expected": []}), "testLongestValidPathPrefix_one": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"](["a","b","c"])(({"a": null})), "expected": ["a"]}), "testLongestValidPathPrefix_two": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"](["a","b","c"])((function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    obj["a"]["b"] = null;
    return obj;
})()), "expected": ["a","b"]}), "testLongestValidPathPrefix_three": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"](["a","b","c"])((function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    obj["a"]["b"]["c"] = null;
    return obj;
})()), "expected": ["a","b","c"]}), "testLongestValidPathPrefix_three_extra": ({"expr": nixScope["attrsets"]["longestValidPathPrefix"](["a","b","c"])((function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    if (obj["a"]["b"]["c"] === undefined) obj["a"]["b"]["c"] = {};
    obj["a"]["b"]["c"]["d"] = nixScope["throw"]("nope");
    return obj;
})()), "expected": ["a","b","c"]}), "testFindFirstIndexExample1": ({"expr": nixScope["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThan(nixScope["x"], 3n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["abort"]("index found, so a default must not be evaluated")))([1n,6n,4n]), "expected": 1n}), "testFindFirstIndexExample2": ({"expr": nixScope["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThan(nixScope["x"], 9n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))("a very specific default")([1n,6n,4n]), "expected": "a very specific default"}), "testFindFirstIndexEmpty": ({"expr": nixScope["lists"]["findFirstIndex"]((nixScope["abort"]("when the list is empty, the predicate is not needed")))(null)([]), "expected": null}), "testFindFirstIndexSingleMatch": ({"expr": nixScope["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["x"], 5n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(null)([5n]), "expected": 0n}), "testFindFirstIndexSingleDefault": ({"expr": nixScope["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return false; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(null)([(nixScope["abort"]("if the predicate doesn't access the value, it must not be evaluated"))]), "expected": null}), "testFindFirstIndexNone": ({"expr": nixScope["builtins"]["tryEval"]((nixScope["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["x"], 2n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(null)([1n,(nixScope["throw"]("the last element must be evaluated when there's no match"))]))), "expected": ({"success": false, "value": false})}), "testFindFirstIndexBig": ({"expr": nixScope["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["x"], 1000000n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(null)((nixScope["range"](0n)(1000000n))), "expected": 1000000n}), "testFindFirstIndexLazy": ({"expr": nixScope["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["x"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(null)([1n,(nixScope["abort"]("list elements after the match must not be evaluated"))]), "expected": 0n}), "testFindFirstExample1": ({"expr": nixScope["lists"]["findFirst"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThan(nixScope["x"], 3n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(7n)([1n,6n,4n]), "expected": 6n}), "testFindFirstExample2": ({"expr": nixScope["lists"]["findFirst"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThan(nixScope["x"], 9n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(7n)([1n,6n,4n]), "expected": 7n}), "testAllUnique_true": ({"expr": nixScope["allUnique"]([3n,2n,4n,1n]), "expected": true}), "testAllUnique_false": ({"expr": nixScope["allUnique"]([3n,2n,3n,4n]), "expected": false}), "testConcatMapAttrs": ({"expr": nixScope["concatMapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const obj = {};
    obj[nixScope["name"]] = nixScope["value"];
    obj[operators.add(nixScope["name"], nixScope["value"])] = nixScope["value"];
    return obj;
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"foo": "bar", "foobar": "baz"})), "expected": ({"foo": "bar", "foobar": "baz", "foobarbaz": "baz"})}), "testFilterAttrs": ({"expr": nixScope["filterAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.notEqual(nixScope["n"], "a"), operators.equal((operators.selectOrDefault(nixScope["v"], ["hello"], false)), true)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((function(){
    const obj = {};
    obj["c"] = ({"hello": true, "world": false});
    if (obj["a"] === undefined) obj["a"] = {};
    obj["a"]["hello"] = true;
    if (obj["b"] === undefined) obj["b"] = {};
    obj["b"]["hello"] = true;
    if (obj["d"] === undefined) obj["d"] = {};
    obj["d"]["hello"] = false;
    return obj;
})()), "expected": (function(){
    const obj = {};
    obj["c"] = ({"hello": true, "world": false});
    if (obj["b"] === undefined) obj["b"] = {};
    obj["b"]["hello"] = true;
    return obj;
})()}), "testFoldlAttrs": ({"expr": ({"example": nixScope["foldlAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return ({"sum": operators.add(nixScope["acc"]["sum"], nixScope["value"]), "names": operators.listConcat(nixScope["acc"]["names"], [nixScope["name"]])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"sum": 0n, "names": []}))(({"foo": 1n, "bar": 10n})), "emptySet": nixScope["foldlAttrs"]((nixScope["throw"]("function not needed")))(123n)({}), "valuesNotNeeded": nixScope["foldlAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["acc"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(3n)(({"z": nixScope["throw"]("value z not needed"), "a": nixScope["throw"]("value a not needed")})), "trivialAcc": nixScope["foldlAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["acc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(operators.multiply(nixScope["acc"], 10n), nixScope["v"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(1n)(({"z": 1n, "a": 2n}))}), "expected": ({"example": ({"sum": 11n, "names": ["bar","foo"]}), "emptySet": 123n, "valuesNotNeeded": 3n, "trivialAcc": 121n})}), "testMergeAttrsListExample1": ({"expr": nixScope["attrsets"]["mergeAttrsList"]([({"a": 0n, "b": 1n}),({"c": 2n, "d": 3n})]), "expected": ({"a": 0n, "b": 1n, "c": 2n, "d": 3n})}), "testMergeAttrsListExample2": ({"expr": nixScope["attrsets"]["mergeAttrsList"]([({"a": 0n}),({"a": 1n})]), "expected": ({"a": 1n})}), "testMergeAttrsListExampleMany": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "list", {enumerable: true, get(){return nixScope["genList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["listToAttrs"]((nixScope["genList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["str"] = (new InterpolatedString(["halfn", "m", ""], [()=>(nixScope["toString"]((operators.divide(nixScope["n"], 2n)))), ()=>(nixScope["toString"](nixScope["m"]))]));
        return nixScope["nameValuePair"](nixScope["str"])(nixScope["str"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(100n))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(100n);}});
        return ({"expr": nixScope["attrsets"]["mergeAttrsList"](nixScope["list"]), "expected": nixScope["foldl'"](nixScope["mergeAttrs"])({})(nixScope["list"])});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testRecursiveUpdateUntil": ({"expr": nixScope["recursiveUpdateUntil"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["l"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["r"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["path"], ["foo"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((function(){
    const obj = {};
    obj["bar"] = 3n;
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["bar"] = 1n;
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["baz"] = 2n;
    return obj;
})())((function(){
    const obj = {};
    obj["baz"] = 4n;
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["bar"] = 1n;
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["quz"] = 2n;
    return obj;
})()), "expected": (function(){
    const obj = {};
    obj["bar"] = 3n;
    obj["baz"] = 4n;
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["bar"] = 1n;
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["quz"] = 2n;
    return obj;
})()}), "testMatchAttrsMatchingExact": ({"expr": nixScope["matchAttrs"](({"cpu": ({"bits": 64n})}))(({"cpu": ({"bits": 64n})})), "expected": true}), "testMatchAttrsMismatch": ({"expr": nixScope["matchAttrs"](({"cpu": ({"bits": 128n})}))(({"cpu": ({"bits": 64n})})), "expected": false}), "testMatchAttrsMatchingImplicit": ({"expr": nixScope["matchAttrs"](({"cpu": {}}))(({"cpu": ({"bits": 64n})})), "expected": true}), "testMatchAttrsMissingAttrs": ({"expr": nixScope["matchAttrs"](({"cpu": {}}))({}), "expected": false}), "testOverrideExistingEmpty": ({"expr": nixScope["overrideExisting"]({})(({"a": 1n})), "expected": {}}), "testOverrideExistingDisjoint": ({"expr": nixScope["overrideExisting"](({"b": 2n}))(({"a": 1n})), "expected": ({"b": 2n})}), "testOverrideExistingOverride": ({"expr": nixScope["overrideExisting"](({"a": 3n, "b": 2n}))(({"a": 1n})), "expected": ({"a": 1n, "b": 2n})}), "testListAttrsReverse": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["exampleSingletonList"] = [({"name": "foo", "value": 1n})];
        Object.defineProperty(nixScope, "exampleAttrs", {enumerable: true, get(){return ({"foo": 1n, "bar": "asdf", "baz": [1n,3n,3n,7n], "fnord": null});}});
        return ({"expr": ({"isReverseToListToAttrs": operators.equal(nixScope["builtins"]["listToAttrs"]((nixScope["attrsToList"](nixScope["exampleAttrs"]))), nixScope["exampleAttrs"]), "isReverseToAttrsToList": operators.equal(nixScope["attrsToList"]((nixScope["builtins"]["listToAttrs"](nixScope["exampleSingletonList"]))), nixScope["exampleSingletonList"]), "testDuplicatePruningBehaviour": nixScope["attrsToList"]((nixScope["builtins"]["listToAttrs"]([({"name": "a", "value": 2n}),({"name": "a", "value": 1n})])))}), "expected": ({"isReverseToAttrsToList": true, "isReverseToListToAttrs": true, "testDuplicatePruningBehaviour": [({"name": "a", "value": 2n})]})});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testAttrsToListsCanDealWithFunctions": nixScope["testingEval"]((nixScope["attrsToList"](({"someFunc": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["a"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})))), "testFix": ({"expr": nixScope["fix"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return ({"a": (operators.ifThenElse(operators.hasAttr(nixScope["x"], "a"), ()=>("a"), ()=>("b")))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), "expected": ({"a": "a"})}), "testToExtension": ({"expr": [(nixScope["fix"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["final"] = arg; runtime.scopeStack.push(nixScope); try { return ({"a": 0n, "c": nixScope["final"]["a"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))),(nixScope["fix"]((nixScope["extends"]((nixScope["toExtension"](({"a": 1n, "b": 2n}))))(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["final"] = arg; runtime.scopeStack.push(nixScope); try { return ({"a": 0n, "c": nixScope["final"]["a"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))),(nixScope["fix"]((nixScope["extends"]((nixScope["toExtension"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return ({"a": 1n, "b": nixScope["prev"]["a"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["final"] = arg; runtime.scopeStack.push(nixScope); try { return ({"a": 0n, "c": nixScope["final"]["a"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))),(nixScope["fix"]((nixScope["extends"]((nixScope["toExtension"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["final"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prev"] = arg; runtime.scopeStack.push(nixScope); try { return ({"a": 1n, "b": nixScope["prev"]["a"], "c": operators.add(nixScope["final"]["a"], 1n)}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["final"] = arg; runtime.scopeStack.push(nixScope); try { return ({"a": 0n, "c": nixScope["final"]["a"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))))))], "expected": [({"a": 0n, "c": 0n}),({"a": 1n, "b": 2n, "c": 1n}),({"a": 1n, "b": 0n, "c": 1n}),({"a": 1n, "b": 0n, "c": 2n})]}), "testMkKeyValueDefault": ({"expr": nixScope["generators"]["mkKeyValueDefault"]({})(":")("f:oo")("bar"), "expected": `f\\:oo:bar`}), "testMkValueString": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "vals", {enumerable: true, get(){return ({"int": 42n, "string": `fo"o`, "bool": true, "bool2": false, "null": null});}});
        return nixScope["mapAttrs"]((nixScope["const"]((nixScope["generators"]["mkValueStringDefault"]({})))))(nixScope["vals"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": ({"int": "42", "string": `fo"o`, "bool": "true", "bool2": "false", "null": "null"})}), "testToKeyValue": ({"expr": nixScope["generators"]["toKeyValue"]({})(({"key": "value", "other=key": "baz"})), "expected": `
      key=value
      other\\=key=baz
    `}), "testToINIEmpty": ({"expr": nixScope["generators"]["toINI"]({})({}), "expected": ""}), "testToINIEmptySection": ({"expr": nixScope["generators"]["toINI"]({})(({"foo": {}, "bar": {}})), "expected": `
      [bar]

      [foo]
    `}), "testToINIDuplicateKeys": ({"expr": nixScope["generators"]["toINI"](({"listsAsDuplicateKeys": true}))((function(){
    const obj = {};
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["bar"] = true;
    if (obj["baz"] === undefined) obj["baz"] = {};
    obj["baz"]["qux"] = [1n,false];
    return obj;
})()), "expected": `
      [baz]
      qux=1
      qux=false

      [foo]
      bar=true
    `}), "testToINIDefaultEscapes": ({"expr": nixScope["generators"]["toINI"]({})(({"no [ and ] allowed unescaped": ({"and also no = in keys": 42n})})), "expected": `
      [no \\[ and \\] allowed unescaped]
      and also no \\= in keys=42
    `}), "testToINIDefaultFull": ({"expr": nixScope["generators"]["toINI"]({})(({"section 1": ({"attribute1": 5n, "x": "Me-se JarJar Binx", "boolean": false}), "foo[]": ({"he\\h=he": "this is okay"})})), "expected": `
      [foo\\[\\]]
      he\\h\\=he=this is okay

      [section 1]
      attribute1=5
      boolean=false
      x=Me-se JarJar Binx
    `}), "testToINIWithGlobalSectionEmpty": ({"expr": nixScope["generators"]["toINIWithGlobalSection"]({})(({"globalSection": {}, "sections": {}})), "expected": `''`}), "testToINIWithGlobalSectionGlobalEmptyIsTheSameAsToINI": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["sections"] = ({"section 1": ({"attribute1": 5n, "x": "Me-se JarJar Binx"}), "foo": ({"he\\h=he": "this is okay"})});
        return ({"expr": nixScope["generators"]["toINIWithGlobalSection"]({})(({"globalSection": {}, "sections": nixScope["sections"]})), "expected": nixScope["generators"]["toINI"]({})(nixScope["sections"])});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testToINIWithGlobalSectionFull": ({"expr": nixScope["generators"]["toINIWithGlobalSection"]({})(({"globalSection": ({"foo": "bar", "test": false}), "sections": ({"section 1": ({"attribute1": 5n, "x": "Me-se JarJar Binx"}), "foo": ({"he\\h=he": "this is okay"})})})), "expected": `
      foo=bar
      test=false

      [foo]
      he\\h\\=he=this is okay

      [section 1]
      attribute1=5
      x=Me-se JarJar Binx
    `}), "testToGitINI": ({"expr": nixScope["generators"]["toGitINI"]((function(){
    const obj = {};
    obj["user"] = ({"email": "user@example.org", "name": "John Doe", "signingKey": "00112233445566778899AABBCCDDEEFF"});
    obj["extra"] = (function(){
    const obj = {};
    obj["boolean"] = true;
    obj["integer"] = 38n;
    obj["name"] = "value";
    if (obj["subsection"] === undefined) obj["subsection"] = {};
    obj["subsection"]["value"] = "test";
    return obj;
})();
    if (obj["gpg"] === undefined) obj["gpg"] = {};
    obj["gpg"]["program"] = "path-to-gpg";
    if (obj["tag"] === undefined) obj["tag"] = {};
    obj["tag"]["gpgSign"] = true;
    if (obj["include"] === undefined) obj["include"] = {};
    obj["include"]["path"] = "~/path/to/config.inc";
    if (obj["includeIf"] === undefined) obj["includeIf"] = {};
    if (obj["includeIf"]["gitdif:~/src/dir"] === undefined) obj["includeIf"]["gitdif:~/src/dir"] = {};
    obj["includeIf"]["gitdif:~/src/dir"]["path"] = "~/path/to/conditional.inc";
    return obj;
})()), "expected": (new InterpolatedString(["\n      [extra]\n      ", "boolean = true\n      ", "integer = 38\n      ", "name = \"value\"\n\n      [extra \"subsection\"]\n      ", "value = \"test\"\n\n      [gpg]\n      ", "program = \"path-to-gpg\"\n\n      [include]\n      ", "path = \"~/path/to/config.inc\"\n\n      [includeIf \"gitdif:~/src/dir\"]\n      ", "path = \"~/path/to/conditional.inc\"\n\n      [tag]\n      ", "gpgSign = true\n\n      [user]\n      ", "email = \"user@example.org\"\n      ", "name = \"John Doe\"\n      ", "signingKey = \"00112233445566778899AABBCCDDEEFF\"\n    "], [()=>(""), ()=>(""), ()=>(""), ()=>(""), ()=>(""), ()=>(""), ()=>(""), ()=>(""), ()=>(""), ()=>(""), ()=>("")]))}), "testToJSONSimple": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["val"] = ({"foobar": ["baz",1n,2n,3n]});
        return ({"expr": nixScope["generators"]["toJSON"]({})(nixScope["val"]), "expected": nixScope["builtins"]["toJSON"](nixScope["val"])});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testToYAMLSimple": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["val"] = ({"list": [({"one": 1n}),({"two": 2n})], "all": 42n});
        return ({"expr": nixScope["generators"]["toYAML"]({})(nixScope["val"]), "expected": nixScope["builtins"]["toJSON"](nixScope["val"])});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testToPretty": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "deriv", {enumerable: true, get(){return nixScope["derivation"](({"name": "test", "builder": "/bin/sh", "system": "aarch64-linux"}));}});
        return ({"expr": nixScope["mapAttrs"]((nixScope["const"]((nixScope["generators"]["toPretty"](({"multiline": false}))))))((function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    nixScope["int"] = 42n;
    nixScope["float"] = 0.1337;
    nixScope["emptystring"] = "";
    nixScope["string"] = "fn";
    nixScope["newlinestring"] = "";
    nixScope["emptylist"] = [];
    nixScope["emptyattrs"] = {};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "bool", {enumerable: true, get(){return true;}});
        Object.defineProperty(nixScope, "path", {enumerable: true, get(){return operators.add((new Path(["/."], [])), "/foo");}});
        Object.defineProperty(nixScope, "null_", {enumerable: true, get(){return null;}});
        Object.defineProperty(nixScope, "function", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "functionArgs", {enumerable: true, get(){return 

// args: {
//    arg,
//    foo,
//    ,
//}
createFunc({"arg": (nixScope)=>(4n),}, null, {}, (nixScope)=>(
                nixScope["arg"]
            ));}});
        Object.defineProperty(nixScope, "list", {enumerable: true, get(){return [3n,4n,nixScope["function"],[false]];}});
        Object.defineProperty(nixScope, "attrs", {enumerable: true, get(){return ({"foo": null, "foo b/ar": "baz"});}});
        Object.defineProperty(nixScope, "drv", {enumerable: true, get(){return nixScope["deriv"];}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})()), "expected": (function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    nixScope["int"] = "42";
    nixScope["float"] = "0.1337";
    nixScope["bool"] = "true";
    nixScope["newlinestring"] = "n";
    nixScope["path"] = "/foo";
    nixScope["null_"] = "null";
    nixScope["function"] = "<function>";
    nixScope["functionArgs"] = "<function, args: {arg?, foo}>";
    nixScope["list"] = (new InterpolatedString(["[ 3 4 ", " [ false ] ]"], [()=>(nixScope["function"])]));
    nixScope["emptylist"] = "[ ]";
    nixScope["attrs"] = "{ foo = null; ";
    nixScope["emptyattrs"] = "{ }";
    nixScope["drv"] = (new InterpolatedString(["<derivation ", ">"], [()=>(nixScope["deriv"]["name"])]));
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "emptystring", {enumerable: true, get(){return `""`;}});
        Object.defineProperty(nixScope, "string", {enumerable: true, get(){return `"fn\`;}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})()});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testToPrettyLimit": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["a"] = {};
        nixScope["a"]["b"] = 1n;
        nixScope["a"]["c"] = nixScope["a"];
        return ({"expr": nixScope["generators"]["toPretty"]({})((nixScope["generators"]["withRecursion"](({"throwOnDepthLimit": false, "depthLimit": 2n}))(nixScope["a"]))), "expected": "{"});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testToPrettyLimitThrow": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["a"] = {};
        nixScope["a"]["b"] = 1n;
        nixScope["a"]["c"] = nixScope["a"];
        return ({"expr": (nixScope["builtins"]["tryEval"]((nixScope["generators"]["toPretty"]({})((nixScope["generators"]["withRecursion"](({"depthLimit": 2n}))(nixScope["a"]))))))["success"], "expected": false});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testWithRecursionDealsWithFunctors": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return ({"__functor": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return 

// args: {
//    a,
//    b,
//}
createFunc({}, null, {}, (nixScope)=>(
                null
            )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])});}});
        Object.defineProperty(nixScope, "a", {enumerable: true, get(){return (function(){
    const obj = {};
    obj["value"] = "1234";
    obj["b"] = nixScope["functor"];
    if (obj["c"] === undefined) obj["c"] = {};
    obj["c"]["d"] = nixScope["functor"];
    return obj;
})();}});
        return ({"expr": nixScope["generators"]["toPretty"]({})((nixScope["generators"]["withRecursion"](({"depthLimit": 1n, "throwOnDepthLimit": false}))(nixScope["a"]))), "expected": "{"});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testToPrettyMultiline": ({"expr": nixScope["mapAttrs"]((nixScope["const"]((nixScope["generators"]["toPretty"]({})))))(({"list": [3n,4n,[false]], "attrs": (function(){
    const obj = {};
    obj["foo"] = null;
    if (obj["bar"] === undefined) obj["bar"] = {};
    obj["bar"]["foo"] = "baz";
    return obj;
})(), "newlinestring": "", "multilinestring": `
        hello
        `, "multilinestring'": `
        hello
        there
        test`})), "expected": ({"list": `
        [
          3
          4
          [
            false
          ]
        ]`, "attrs": `
        {
          bar = {
            foo = "baz";
          };
          foo = null;
        }`, "newlinestring": "''", "multilinestring": `
        `, "multilinestring'": `
        `})}), "testToPrettyAllowPrettyValues": ({"expr": nixScope["generators"]["toPretty"](({"allowPrettyValues": true}))(({"__pretty": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(operators.add("«", nixScope["v"]), "»"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "val": "foo"})), "expected": "«foo»"}), "testToPlistUnescaped": ({"expr": nixScope["mapAttrs"]((nixScope["const"]((nixScope["generators"]["toPlist"]({})))))(({"value": (function(){
    const obj = {};
    if (obj["nested"] === undefined) obj["nested"] = {};
    obj["nested"]["values"] = ({"int": 42n, "float": 0.1337, "bool": true, "emptystring": "", "string": "fn", "newlinestring": "", "path": operators.add((new Path(["/."], [])), "/foo"), "null_": null, "list": [3n,4n,"test"], "emptylist": [], "attrs": ({"foo": null, "foo b/ar": "baz"}), "emptyattrs": {}, "keys are not <escaped>": "and < neither are string values"});
    return obj;
})()})), "expected": ({"value": nixScope["builtins"]["readFile"]((new Path(["./test-to-plist-unescaped-expected.plist"], [])))})}), "testToPlistEscaped": ({"expr": nixScope["mapAttrs"]((nixScope["const"]((nixScope["generators"]["toPlist"](({"escape": true}))))))(({"value": (function(){
    const obj = {};
    if (obj["nested"] === undefined) obj["nested"] = {};
    obj["nested"]["values"] = ({"int": 42n, "float": 0.1337, "bool": true, "emptystring": "", "string": "fn", "newlinestring": "", "path": operators.add((new Path(["/."], [])), "/foo"), "null_": null, "list": [3n,4n,"test"], "emptylist": [], "attrs": ({"foo": null, "foo b/ar": "baz"}), "emptyattrs": {}, "keys are <escaped>": "and < so are string values"});
    return obj;
})()})), "expected": ({"value": nixScope["builtins"]["readFile"]((new Path(["./test-to-plist-escaped-expected.plist"], [])))})}), "testToLuaEmptyAttrSet": ({"expr": nixScope["generators"]["toLua"]({})({}), "expected": `{}`}), "testToLuaEmptyList": ({"expr": nixScope["generators"]["toLua"]({})([]), "expected": `{}`}), "testToLuaListOfVariousTypes": ({"expr": nixScope["generators"]["toLua"]({})([null,43n,3.14159,true]), "expected": `
      {
        nil,
        43,
        3.14159,
        true
      }`}), "testToLuaString": ({"expr": nixScope["generators"]["toLua"]({})(`double-quote (") and single quotes (')`), "expected": `"double-quote (\\") and single quotes (')"`}), "testToLuaAttrsetWithLuaInline": ({"expr": nixScope["generators"]["toLua"]({})(({"x": nixScope["generators"]["mkLuaInline"](`"abc" .. "def"`)})), "expected": `
      {
        ["x"] = ("abc" .. "def")
      }`}), "testToLuaAttrsetWithSpaceInKey": ({"expr": nixScope["generators"]["toLua"]({})(({"some space and double-quote (\")": 42n})), "expected": `
      {
        ["some space and double-quote (\\")"] = 42
      }`}), "testToLuaWithoutMultiline": ({"expr": nixScope["generators"]["toLua"](({"multiline": false}))([41n,43n]), "expected": `{ 41, 43 }`}), "testToLuaEmptyBindings": ({"expr": nixScope["generators"]["toLua"](({"asBindings": true}))({}), "expected": ""}), "testToLuaBindings": ({"expr": nixScope["generators"]["toLua"](({"asBindings": true}))(({"x1": 41n, "_y": ({"a": 43n})})), "expected": `
      _y = {
        ["a"] = 43
      }
      x1 = 41
    `}), "testToLuaPartialTableBindings": ({"expr": nixScope["generators"]["toLua"](({"asBindings": true}))(({"x.y": 42n})), "expected": `
      x.y = 42
    `}), "testToLuaIndentedBindings": ({"expr": nixScope["generators"]["toLua"](({"asBindings": true, "indent": "  "}))(({"x": ({"y": 42n})})), "expected": "  x = {"}), "testToLuaBindingsWithSpace": nixScope["testingThrow"]((nixScope["generators"]["toLua"](({"asBindings": true}))(({"with space": 42n})))), "testToLuaBindingsWithLeadingDigit": nixScope["testingThrow"]((nixScope["generators"]["toLua"](({"asBindings": true}))(({"11eleven": 42n})))), "testToLuaBasicExample": ({"expr": nixScope["generators"]["toLua"]({})((function(){
    const obj = {};
    obj["cmd"] = ["typescript-language-server","--stdio"];
    if (obj["settings"] === undefined) obj["settings"] = {};
    if (obj["settings"]["workspace"] === undefined) obj["settings"]["workspace"] = {};
    obj["settings"]["workspace"]["library"] = nixScope["generators"]["mkLuaInline"](`vim.api.nvim_get_runtime_file("", true)`);
    return obj;
})()), "expected": `
      {
        ["cmd"] = {
          "typescript-language-server",
          "--stdio"
        },
        ["settings"] = {
          ["workspace"] = {
            ["library"] = (vim.api.nvim_get_runtime_file("", true))
          }
        }
      }`}), "testToGNUCommandLine": ({"expr": nixScope["cli"]["toGNUCommandLine"]({})(({"data": nixScope["builtins"]["toJSON"](({"id": 0n})), "X": "PUT", "retry": 3n, "retry-delay": null, "url": ["https://example.com/foo","https://example.com/bar"], "silent": false, "verbose": true})), "expected": ["-X","PUT","--data","{","--retry","3","--url","https://example.com/foo","--url","https://example.com/bar","--verbose"]}), "testToGNUCommandLineSeparator": ({"expr": nixScope["cli"]["toGNUCommandLine"](({"optionValueSeparator": "="}))(({"data": nixScope["builtins"]["toJSON"](({"id": 0n})), "X": "PUT", "retry": 3n, "retry-delay": null, "url": ["https://example.com/foo","https://example.com/bar"], "silent": false, "verbose": true})), "expected": ["-X=PUT","--data={","--retry=3","--url=https://example.com/foo","--url=https://example.com/bar","--verbose"]}), "testToGNUCommandLineShell": ({"expr": nixScope["cli"]["toGNUCommandLineShell"]({})(({"data": nixScope["builtins"]["toJSON"](({"id": 0n})), "X": "PUT", "retry": 3n, "retry-delay": null, "url": ["https://example.com/foo","https://example.com/bar"], "silent": false, "verbose": true})), "expected": "-X PUT --data '{"}), "testSanitizeDerivationNameLeadingDots": nixScope["testSanitizeDerivationName"](({"name": "..foo", "expected": "foo"})), "testSanitizeDerivationNameUnicode": nixScope["testSanitizeDerivationName"](({"name": "fö", "expected": "f-"})), "testSanitizeDerivationNameAscii": nixScope["testSanitizeDerivationName"](({"name": " !", "expected": "-+--.-0123456789-=-?-ABCDEFGHIJKLMNOPQRSTUVWXYZ-_-abcdefghijklmnopqrstuvwxyz-"})), "testSanitizeDerivationNameTooLong": nixScope["testSanitizeDerivationName"](({"name": "This string is loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong", "expected": "loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"})), "testSanitizeDerivationNameTooLongWithInvalid": nixScope["testSanitizeDerivationName"](({"name": "Hello there aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa &&&&&&&&", "expected": "there-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-"})), "testSanitizeDerivationNameEmpty": nixScope["testSanitizeDerivationName"](({"name": "", "expected": "unknown"})), "test: submodule definitions aren't unchecked when evaluating submodule documentation": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "module", {enumerable: true, get(){return 

// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submodule"](nixScope["submodule"])}));
        return obj;
    })()
            ));}});
        Object.defineProperty(nixScope, "submodule", {enumerable: true, get(){return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["bar"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["int"]}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["submoduleWrong"] = nixScope["throw"]("yikes");
    return obj;
})();}});
        Object.defineProperty(nixScope, "options", {enumerable: true, get(){return (nixScope["evalModules"](({"modules": [nixScope["module"]]})))["options"];}});
        Object.defineProperty(nixScope, "renderableOpts", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["o"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["o"]["internal"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["optionAttrSetToDocList"](nixScope["options"])));}});
        return nixScope["builtins"]["deepSeq"](nixScope["renderableOpts"])((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["o"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["o"]["loc"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["renderableOpts"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": [["_module","args"],["foo"],["foo","bar"]]}), "testFreeformOptions": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "submodule", {enumerable: true, get(){return 

// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["freeformType"] = nixScope["lib"]["types"]["attrsOf"]((nixScope["lib"]["types"]["submodule"]((function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["bar"] = nixScope["lib"]["mkOption"]({});
        return obj;
    })())));
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["bar"] = nixScope["lib"]["mkOption"]({});
        return obj;
    })()
            ));}});
        Object.defineProperty(nixScope, "module", {enumerable: true, get(){return 

// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submodule"](nixScope["submodule"])}));
        return obj;
    })()
            ));}});
        Object.defineProperty(nixScope, "options", {enumerable: true, get(){return (nixScope["evalModules"](({"modules": [nixScope["module"]]})))["options"];}});
        Object.defineProperty(nixScope, "locs", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["o"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["o"]["internal"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["optionAttrSetToDocList"](nixScope["options"])));}});
        return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["o"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["o"]["loc"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["locs"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": [["_module","args"],["foo"],["foo","<name>","bar"],["foo","bar"]]}), "testAttrsWithName": ({"expr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "eval", {enumerable: true, get(){return nixScope["evalModules"](({"modules": [({"options": ({"foo": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["attrsWith"](({"placeholder": "MyCustomPlaceholder", "elemType": nixScope["lib"]["types"]["submodule"]((function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["bar"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["int"], "default": 42n}));
    return obj;
})())}))}))})})]}));}});
        Object.defineProperty(nixScope, "opt", {enumerable: true, get(){return nixScope["eval"]["options"]["foo"];}});
        return (nixScope["opt"]["type"]["getSubOptions"](nixScope["opt"]["loc"]))["bar"]["loc"];
    } finally {
        runtime.scopeStack.pop();
    }
})(), "expected": ["foo","<MyCustomPlaceholder>","bar"]}), "testShowOptionWithPlaceholder": ({"expr": nixScope["lib"]["showOption"](["<name>","<myName>","*","{foo}"]), "expected": "<name>.<myName>.*."}), "testCartesianProductOfEmptySet": ({"expr": nixScope["cartesianProduct"]({}), "expected": [{}]}), "testCartesianProductOfOneSet": ({"expr": nixScope["cartesianProduct"](({"a": [1n,2n,3n]})), "expected": [({"a": 1n}),({"a": 2n}),({"a": 3n})]}), "testCartesianProductOfTwoSets": ({"expr": nixScope["cartesianProduct"](({"a": [1n], "b": [10n,20n]})), "expected": [({"a": 1n, "b": 10n}),({"a": 1n, "b": 20n})]}), "testCartesianProductOfTwoSetsWithOneEmpty": ({"expr": nixScope["cartesianProduct"](({"a": [], "b": [10n,20n]})), "expected": []}), "testCartesianProductOfThreeSets": ({"expr": nixScope["cartesianProduct"](({"a": [1n,2n,3n], "b": [10n,20n,30n], "c": [100n,200n,300n]})), "expected": [({"a": 1n, "b": 10n, "c": 100n}),({"a": 1n, "b": 10n, "c": 200n}),({"a": 1n, "b": 10n, "c": 300n}),({"a": 1n, "b": 20n, "c": 100n}),({"a": 1n, "b": 20n, "c": 200n}),({"a": 1n, "b": 20n, "c": 300n}),({"a": 1n, "b": 30n, "c": 100n}),({"a": 1n, "b": 30n, "c": 200n}),({"a": 1n, "b": 30n, "c": 300n}),({"a": 2n, "b": 10n, "c": 100n}),({"a": 2n, "b": 10n, "c": 200n}),({"a": 2n, "b": 10n, "c": 300n}),({"a": 2n, "b": 20n, "c": 100n}),({"a": 2n, "b": 20n, "c": 200n}),({"a": 2n, "b": 20n, "c": 300n}),({"a": 2n, "b": 30n, "c": 100n}),({"a": 2n, "b": 30n, "c": 200n}),({"a": 2n, "b": 30n, "c": 300n}),({"a": 3n, "b": 10n, "c": 100n}),({"a": 3n, "b": 10n, "c": 200n}),({"a": 3n, "b": 10n, "c": 300n}),({"a": 3n, "b": 20n, "c": 100n}),({"a": 3n, "b": 20n, "c": 200n}),({"a": 3n, "b": 20n, "c": 300n}),({"a": 3n, "b": 30n, "c": 100n}),({"a": 3n, "b": 30n, "c": 200n}),({"a": 3n, "b": 30n, "c": 300n})]}), "testMapCartesianProductOfOneSet": ({"expr": nixScope["mapCartesianProduct"]((

// args: {
//    a,
//}
createFunc({}, null, {}, (nixScope)=>(
                operators.multiply(nixScope["a"], 2n)
            ))))(({"a": [1n,2n,3n]})), "expected": [2n,4n,6n]}), "testMapCartesianProductOfTwoSets": ({"expr": nixScope["mapCartesianProduct"]((

// args: {
//    a,
//    b,
//}
createFunc({}, null, {}, (nixScope)=>(
                operators.add(nixScope["a"], nixScope["b"])
            ))))(({"a": [1n], "b": [10n,20n]})), "expected": [11n,21n]}), "testMapCartesianProcutOfTwoSetsWithOneEmpty": ({"expr": nixScope["mapCartesianProduct"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"]["a"], nixScope["x"]["b"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"a": [], "b": [10n,20n]})), "expected": []}), "testMapCartesianProductOfThreeSets": ({"expr": nixScope["mapCartesianProduct"]((

// args: {
//    a,
//    b,
//    c,
//    ,
//}
createFunc({}, null, {}, (nixScope)=>(
                operators.add(operators.add(nixScope["a"], nixScope["b"]), nixScope["c"])
            ))))(({"a": [1n,2n,3n], "b": [10n,20n,30n], "c": [100n,200n,300n]})), "expected": [111n,211n,311n,121n,221n,321n,131n,231n,331n,112n,212n,312n,122n,222n,322n,132n,232n,332n,113n,213n,313n,123n,223n,323n,133n,233n,333n]}), "testShowAttrPathExample": ({"expr": nixScope["showAttrPath"](["foo","10","bar"]), "expected": "foo."}), "testShowAttrPathEmpty": ({"expr": nixScope["showAttrPath"]([]), "expected": "<root attribute path>"}), "testShowAttrPathVarious": ({"expr": nixScope["showAttrPath"]([".","foo","2","a2-b","_bc'de"]), "expected": `".".foo."2".a2-b._bc'de`}), "testGroupBy": ({"expr": nixScope["groupBy"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["toString"]((nixScope["mod"](nixScope["n"])(5n))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["range"](0n)(16n))), "expected": ({"0": [0n,5n,10n,15n], "1": [1n,6n,11n,16n], "2": [2n,7n,12n], "3": [3n,8n,13n], "4": [4n,9n,14n]})}), "testGroupBy'": ({"expr": nixScope["groupBy'"](nixScope["builtins"]["add"])(0n)(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["boolToString"]((operators.greaterThan(nixScope["x"], 2n))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))([5n,1n,2n,3n,4n]), "expected": ({"false": 3n, "true": 12n})}), "testUpdateManyAttrsByPathExample": ({"expr": nixScope["updateManyAttrsByPath"]([({"path": ["a","b"], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return ({"d": nixScope["old"]["c"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"path": ["a","b","c"], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"path": ["x","y"], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return "xy"; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})])((function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    obj["a"]["b"]["c"] = 0n;
    return obj;
})()), "expected": ({"a": ({"b": ({"d": 1n})}), "x": ({"y": "xy"})})}), "testUpdateManyAttrsByPathNone": ({"expr": nixScope["updateManyAttrsByPath"]([])("something"), "expected": "something"}), "testUpdateManyAttrsByPathSingleIncrement": ({"expr": nixScope["updateManyAttrsByPath"]([({"path": [], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})])(0n), "expected": 1n}), "testUpdateManyAttrsByPathMultipleIncrements": ({"expr": nixScope["updateManyAttrsByPath"]([({"path": [], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], "a"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"path": [], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], "b"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"path": [], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], "c"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})])(""), "expected": "abc"}), "testUpdateManyAttrsByPathLazy": ({"expr": nixScope["updateManyAttrsByPath"]([({"path": [], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], nixScope["throw"]("nope")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"path": [], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return "untainted"; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})])((nixScope["throw"]("start"))), "expected": "untainted"}), "testUpdateManyAttrsByPathDeep": ({"expr": nixScope["updateManyAttrsByPath"]([({"path": ["a","b","c"], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})])((function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    obj["a"]["b"]["c"] = 0n;
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    obj["a"]["b"]["z"] = 0n;
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["y"] === undefined) obj["a"]["y"] = {};
    obj["a"]["y"]["z"] = 0n;
    if (obj["x"] === undefined) obj["x"] = {};
    if (obj["x"]["y"] === undefined) obj["x"]["y"] = {};
    obj["x"]["y"]["z"] = 0n;
    return obj;
})()), "expected": (function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    obj["a"]["b"]["c"] = 1n;
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
    obj["a"]["b"]["z"] = 0n;
    if (obj["a"] === undefined) obj["a"] = {};
    if (obj["a"]["y"] === undefined) obj["a"]["y"] = {};
    obj["a"]["y"]["z"] = 0n;
    if (obj["x"] === undefined) obj["x"] = {};
    if (obj["x"]["y"] === undefined) obj["x"]["y"] = {};
    obj["x"]["y"]["z"] = 0n;
    return obj;
})()}), "testUpdateManyAttrsByPathNestedBeforehand": ({"expr": nixScope["updateManyAttrsByPath"]([({"path": ["a"], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["old"], ({"x": nixScope["old"]["b"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}),({"path": ["a","b"], "update": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["old"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["old"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})])((function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    obj["a"]["b"] = 0n;
    return obj;
})()), "expected": (function(){
    const obj = {};
    if (obj["a"] === undefined) obj["a"] = {};
    obj["a"]["b"] = 1n;
    if (obj["a"] === undefined) obj["a"] = {};
    obj["a"]["x"] = 1n;
    return obj;
})()}), "testCommonPrefixLengthEmpty": ({"expr": nixScope["strings"]["commonPrefixLength"]("")("hello"), "expected": 0n}), "testCommonPrefixLengthSame": ({"expr": nixScope["strings"]["commonPrefixLength"]("hello")("hello"), "expected": 5n}), "testCommonPrefixLengthDiffering": ({"expr": nixScope["strings"]["commonPrefixLength"]("hello")("hey"), "expected": 2n}), "testCommonSuffixLengthEmpty": ({"expr": nixScope["strings"]["commonSuffixLength"]("")("hello"), "expected": 0n}), "testCommonSuffixLengthSame": ({"expr": nixScope["strings"]["commonSuffixLength"]("hello")("hello"), "expected": 5n}), "testCommonSuffixLengthDiffering": ({"expr": nixScope["strings"]["commonSuffixLength"]("test")("rest"), "expected": 3n}), "testLevenshteinEmpty": ({"expr": nixScope["strings"]["levenshtein"]("")(""), "expected": 0n}), "testLevenshteinOnlyAdd": ({"expr": nixScope["strings"]["levenshtein"]("")("hello there"), "expected": 11n}), "testLevenshteinOnlyRemove": ({"expr": nixScope["strings"]["levenshtein"]("hello there")(""), "expected": 11n}), "testLevenshteinOnlyTransform": ({"expr": nixScope["strings"]["levenshtein"]("abcdef")("ghijkl"), "expected": 6n}), "testLevenshteinMixed": ({"expr": nixScope["strings"]["levenshtein"]("kitchen")("sitting"), "expected": 5n}), "testLevenshteinAtMostZeroFalse": ({"expr": nixScope["strings"]["levenshteinAtMost"](0n)("foo")("boo"), "expected": false}), "testLevenshteinAtMostZeroTrue": ({"expr": nixScope["strings"]["levenshteinAtMost"](0n)("foo")("foo"), "expected": true}), "testLevenshteinAtMostOneFalse": ({"expr": nixScope["strings"]["levenshteinAtMost"](1n)("car")("ct"), "expected": false}), "testLevenshteinAtMostOneTrue": ({"expr": nixScope["strings"]["levenshteinAtMost"](1n)("car")("cr"), "expected": true}), "testLevenshteinAtMostTwoIsEmpty": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("")(""), "expected": true}), "testLevenshteinAtMostTwoIsZero": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("abcdef"), "expected": true}), "testLevenshteinAtMostTwoIsOne": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("abddef"), "expected": true}), "testLevenshteinAtMostTwoDiff0False": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("aczyef"), "expected": false}), "testLevenshteinAtMostTwoDiff0Outer": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("zbcdez"), "expected": true}), "testLevenshteinAtMostTwoDiff0DelLeft": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("bcdefz"), "expected": true}), "testLevenshteinAtMostTwoDiff0DelRight": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("zabcde"), "expected": true}), "testLevenshteinAtMostTwoDiff1False": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("bddez"), "expected": false}), "testLevenshteinAtMostTwoDiff1DelLeft": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("bcdez"), "expected": true}), "testLevenshteinAtMostTwoDiff1DelRight": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("abcdef")("zbcde"), "expected": true}), "testLevenshteinAtMostTwoDiff2False": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("hello")("hxo"), "expected": false}), "testLevenshteinAtMostTwoDiff2True": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("hello")("heo"), "expected": true}), "testLevenshteinAtMostTwoDiff3": ({"expr": nixScope["strings"]["levenshteinAtMost"](2n)("hello")("ho"), "expected": false}), "testLevenshteinAtMostThreeFalse": ({"expr": nixScope["strings"]["levenshteinAtMost"](3n)("hello")("Holla!"), "expected": false}), "testLevenshteinAtMostThreeTrue": ({"expr": nixScope["strings"]["levenshteinAtMost"](3n)("hello")("Holla"), "expected": true}), "testLazyDerivationIsLazyInDerivationForAttrNames": ({"expr": nixScope["attrNames"]((nixScope["lazyDerivation"](({"derivation": nixScope["throw"]("not lazy enough")})))), "expected": ["drvPath","meta","name","out","outPath","outputName","outputs","system","type"]}), "testLazyDerivationIsLazyInDerivationForPassthruAttr": ({"expr": (nixScope["lazyDerivation"]((function(){
    const obj = {};
    obj["derivation"] = nixScope["throw"]("not lazy enough");
    if (obj["passthru"] === undefined) obj["passthru"] = {};
    obj["passthru"]["tests"] = "whatever is in tests";
    return obj;
})()))["tests"], "expected": "whatever is in tests"}), "testLazyDerivationIsLazyInDerivationForPassthruAttr2": ({"expr": (nixScope["lazyDerivation"]((function(){
    const obj = {};
    obj["derivation"] = nixScope["throw"]("not lazy enough");
    if (obj["passthru"] === undefined) obj["passthru"] = {};
    obj["passthru"]["foo"] = "whatever is in foo";
    return obj;
})()))["foo"], "expected": "whatever is in foo"}), "testLazyDerivationIsLazyInDerivationForMeta": ({"expr": (nixScope["lazyDerivation"](({"derivation": nixScope["throw"]("not lazy enough"), "meta": "whatever is in meta"})))["meta"], "expected": "whatever is in meta"}), "testLazyDerivationReturnsDerivationAttrs": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["derivation"] = ({"type": "derivation", "outputs": ["out"], "out": "test out", "outPath": "test outPath", "outputName": "out", "drvPath": "test drvPath", "name": "test name", "system": "test system", "meta": "test meta"});
        return ({"expr": nixScope["lazyDerivation"](({"derivation": nixScope["derivation"]})), "expected": nixScope["derivation"]});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testOptionalDrvAttr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "mkDerivation", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["derivation"]((operators.merge(nixScope["args"], ({"builder": "builder", "system": "system", "__ignoreNulls": true})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return ({"expr": (nixScope["mkDerivation"](({"name": "foo", "x": nixScope["optionalDrvAttr"](true)(1n), "y": nixScope["optionalDrvAttr"](false)(1n)})))["drvPath"], "expected": (nixScope["mkDerivation"](({"name": "foo", "x": 1n})))["drvPath"]});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testLazyDerivationMultiOutputReturnsDerivationAttrs": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["derivation"] = (function(){
    const obj = {};
    obj["type"] = "derivation";
    obj["outputs"] = ["out","dev"];
    obj["dev"] = "test dev";
    obj["out"] = "test out";
    obj["outPath"] = "test outPath";
    obj["outputName"] = "out";
    obj["drvPath"] = "test drvPath";
    obj["name"] = "test name";
    obj["system"] = "test system";
    if (obj["meta"] === undefined) obj["meta"] = {};
    obj["meta"]["position"] = "/hi:23";
    return obj;
})();
        return ({"expr": nixScope["lazyDerivation"]((function(){
    const obj = {};
    obj["derivation"] = nixScope["derivation"];
    obj["outputs"] = ["out","dev"];
    if (obj["passthru"] === undefined) obj["passthru"] = {};
    if (obj["passthru"]["meta"] === undefined) obj["passthru"]["meta"] = {};
    obj["passthru"]["meta"]["position"] = "/hi:23";
    return obj;
})()), "expected": nixScope["derivation"]});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testTypeDescriptionInt": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["int"];
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "signed integer"}), "testTypeDescriptionIntsPositive": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["ints"]["positive"];
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "positive integer, meaning >0"}), "testTypeDescriptionIntsPositiveOrEnumAuto": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"](nixScope["ints"]["positive"])((nixScope["enum"](["auto"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": `positive integer, meaning >0, or value "auto" (singular enum)`}), "testTypeDescriptionListOfPositive": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["listOf"](nixScope["ints"]["positive"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "list of (positive integer, meaning >0)"}), "testTypeDescriptionListOfInt": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["listOf"](nixScope["int"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "list of signed integer"}), "testTypeDescriptionListOfListOfInt": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["listOf"]((nixScope["listOf"](nixScope["int"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "list of list of signed integer"}), "testTypeDescriptionListOfEitherStrOrBool": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["listOf"]((nixScope["either"](nixScope["str"])(nixScope["bool"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "list of (string or boolean)"}), "testTypeDescriptionEitherListOfStrOrBool": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"]((nixScope["listOf"](nixScope["bool"])))(nixScope["str"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "(list of boolean) or string"}), "testTypeDescriptionEitherStrOrListOfBool": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"](nixScope["str"])((nixScope["listOf"](nixScope["bool"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "string or list of boolean"}), "testTypeDescriptionOneOfListOfStrOrBool": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["oneOf"]([(nixScope["listOf"](nixScope["bool"])),nixScope["str"]]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "(list of boolean) or string"}), "testTypeDescriptionOneOfListOfStrOrBoolOrNumber": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["oneOf"]([(nixScope["listOf"](nixScope["bool"])),nixScope["str"],nixScope["number"]]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "(list of boolean) or string or signed integer or floating point number"}), "testTypeDescriptionEitherListOfBoolOrEitherStringOrNumber": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"]((nixScope["listOf"](nixScope["bool"])))((nixScope["either"](nixScope["str"])(nixScope["number"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "(list of boolean) or string or signed integer or floating point number"}), "testTypeDescriptionEitherEitherListOfBoolOrStringOrNumber": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"]((nixScope["either"]((nixScope["listOf"](nixScope["bool"])))(nixScope["str"])))(nixScope["number"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "(list of boolean) or string or signed integer or floating point number"}), "testTypeDescriptionEitherNullOrBoolOrString": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"]((nixScope["nullOr"](nixScope["bool"])))(nixScope["str"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "null or boolean or string"}), "testTypeDescriptionEitherListOfEitherBoolOrStrOrInt": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"]((nixScope["listOf"]((nixScope["either"](nixScope["bool"])(nixScope["str"])))))(nixScope["int"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "(list of (boolean or string)) or signed integer"}), "testTypeDescriptionEitherIntOrListOrEitherBoolOrStr": ({"expr": (((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["either"](nixScope["int"])((nixScope["listOf"]((nixScope["either"](nixScope["bool"])(nixScope["str"])))));
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["types"]))["description"], "expected": "signed integer or list of (boolean or string)"}), "testTypeFunctionToPropagateFunctionArgs": ({"expr": nixScope["lib"]["functionArgs"](((nixScope["types"]["functionTo"](nixScope["types"]["null"]))["merge"]([])([({"value": 

// args: {
//    a,
//    b,
//}
createFunc({"b": (nixScope)=>(false),}, null, {}, (nixScope)=>(
                null
            ))}),({"value": 

// args: {
//    b,
//    c,
//}
createFunc({"c": (nixScope)=>(false),}, null, {}, (nixScope)=>(
                null
            ))})]))), "expected": ({"a": false, "b": false, "c": true})}), "testGetExe'Output": ({"expr": nixScope["getExe'"](({"type": "derivation", "out": "somelonghash", "bin": "somelonghash"}))("executable"), "expected": "somelonghash/bin/executable"}), "testGetExeOutput": ({"expr": nixScope["getExe"]((function(){
    const obj = {};
    obj["type"] = "derivation";
    obj["out"] = "somelonghash";
    obj["bin"] = "somelonghash";
    if (obj["meta"] === undefined) obj["meta"] = {};
    obj["meta"]["mainProgram"] = "mainProgram";
    return obj;
})()), "expected": "somelonghash/bin/mainProgram"}), "testGetExe'FailureFirstArg": nixScope["testingThrow"]((nixScope["getExe'"]("not a derivation")("executable"))), "testGetExe'FailureSecondArg": nixScope["testingThrow"]((nixScope["getExe'"](({"type": "derivation"}))("dir/executable"))), "testGetLicenseFromSpdxIdOrExamples": ({"expr": [(nixScope["getLicenseFromSpdxIdOr"]("MIT")(null)),(nixScope["getLicenseFromSpdxIdOr"]("mIt")(null)),(nixScope["getLicenseFromSpdxIdOr"]("MY LICENSE")(nixScope["lib"]["licenses"]["free"])),(nixScope["getLicenseFromSpdxIdOr"]("MY LICENSE")(null))], "expected": [nixScope["lib"]["licenses"]["mit"],nixScope["lib"]["licenses"]["mit"],nixScope["lib"]["licenses"]["free"],null]}), "testGetLicenseFromSpdxIdOrThrow": nixScope["testingThrow"]((nixScope["getLicenseFromSpdxIdOr"]("MY LICENSE")((nixScope["throw"]("No SPDX ID matches MY LICENSE"))))), "testPlatformMatch": ({"expr": nixScope["meta"]["platformMatch"](({"system": "x86_64-linux"}))("x86_64-linux"), "expected": true}), "testPlatformMatchAttrs": ({"expr": nixScope["meta"]["platformMatch"]((nixScope["systems"]["elaborate"]("x86_64-linux")))((nixScope["systems"]["elaborate"]("x86_64-linux"))["parsed"]), "expected": true}), "testPlatformMatchNoMatch": ({"expr": nixScope["meta"]["platformMatch"](({"system": "x86_64-darwin"}))("x86_64-linux"), "expected": false}), "testPlatformMatchMissingSystem": ({"expr": nixScope["meta"]["platformMatch"]({})("x86_64-linux"), "expected": false}), "testPackagesFromDirectoryRecursive": ({"expr": nixScope["packagesFromDirectoryRecursive"](({"callPackage": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["overrides"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["import"](nixScope["path"])(nixScope["overrides"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "directory": (new Path(["./packages-from-directory/plain"], []))})), "expected": ({"a": "a", "b": "b", "c": "c", "my-namespace": ({"d": "d", "e": "e", "f": "f", "my-sub-namespace": ({"g": "g", "h": "h"})})})}), "testPackagesFromDirectoryRecursiveStringDirectory": ({"expr": nixScope["packagesFromDirectoryRecursive"](({"callPackage": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["overrides"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["import"](nixScope["path"])(nixScope["overrides"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "directory": nixScope["builtins"]["toString"]((new Path(["./packages-from-directory/plain"], [])))})), "expected": ({"a": "a", "b": "b", "c": "c", "my-namespace": ({"d": "d", "e": "e", "f": "f", "my-sub-namespace": ({"g": "g", "h": "h"})})})}), "testPackagesFromDirectoryRecursiveTopLevelPackageNix": ({"expr": nixScope["packagesFromDirectoryRecursive"](({"callPackage": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["overrides"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["import"](nixScope["path"])(nixScope["overrides"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "directory": (new Path(["./packages-from-directory/plain/c"], []))})), "expected": "c"}), "testMergeTypesSimple": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "mergedType", {enumerable: true, get(){return nixScope["types"]["mergeTypes"](nixScope["types"]["str"])(nixScope["types"]["str"]);}});
        return ({"expr": nixScope["mergedType"]["name"], "expected": "str"});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testMergeTypesFail": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "mergedType", {enumerable: true, get(){return nixScope["types"]["mergeTypes"](nixScope["types"]["str"])(nixScope["types"]["int"]);}});
        return ({"expr": nixScope["types"]["isType"]("merge-error")(nixScope["mergedType"]), "expected": true});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testMergeTypesEnum": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "enumAB", {enumerable: true, get(){return nixScope["lib"]["types"]["enum"](["A","B"]);}});
        Object.defineProperty(nixScope, "enumXY", {enumerable: true, get(){return nixScope["lib"]["types"]["enum"](["X","Y"]);}});
        Object.defineProperty(nixScope, "merged", {enumerable: true, get(){return nixScope["lib"]["types"]["mergeTypes"](nixScope["enumAB"])(nixScope["enumXY"]);}});
        return ({"expr": ({"checkA": nixScope["merged"]["check"]("A"), "checkB": nixScope["merged"]["check"]("B"), "checkX": nixScope["merged"]["check"]("X"), "checkY": nixScope["merged"]["check"]("Y"), "checkC": nixScope["merged"]["check"]("C")}), "expected": ({"checkA": true, "checkB": true, "checkX": true, "checkY": true, "checkC": false})});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testPackagesFromDirectoryNestedScopes": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["makeScope"] = nixScope["lib"]["makeScope"];
        nixScope["recurseIntoAttrs"] = nixScope["lib"]["recurseIntoAttrs"];
        Object.defineProperty(nixScope, "emptyScope", {enumerable: true, get(){return nixScope["makeScope"](nixScope["lib"]["callPackageWith"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return {}; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
        return ({"expr": nixScope["lib"]["filterAttrsRecursive"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["lib"]["elem"](nixScope["name"])(["callPackage","newScope","overrideScope","packages"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["packagesFromDirectoryRecursive"]((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
    const obj = {};
        obj["callPackage"] = nixScope["emptyScope"]["callPackage"];
        obj["newScope"] = nixScope["emptyScope"]["newScope"];
        obj["directory"] = (new Path(["./packages-from-directory/scope"], []));
    return obj;
    } finally {
        runtime.scopeStack.pop();
    }
})()))), "expected": nixScope["lib"]["recurseIntoAttrs"](({"a": "a", "b": "b", "c": "c", "my-namespace": nixScope["lib"]["recurseIntoAttrs"](({"d": "d", "e": "e", "f": "f", "my-sub-namespace": nixScope["lib"]["recurseIntoAttrs"](({"g": "g", "h": "h"}))}))}))});
    } finally {
        runtime.scopeStack.pop();
    }
})(), "testFilesystemResolveDefaultNixFile1": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]((new Path(["./foo.nix"], []))), "expected": (new Path(["./foo.nix"], []))}), "testFilesystemResolveDefaultNixFile2": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]((new Path(["./default.nix"], []))), "expected": (new Path(["./default.nix"], []))}), "testFilesystemResolveDefaultNixDir1": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]((new Path(["./."], []))), "expected": (new Path(["./default.nix"], []))}), "testFilesystemResolveDefaultNixFile1_toString": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]((nixScope["toString"]((new Path(["./foo.nix"], []))))), "expected": nixScope["toString"]((new Path(["./foo.nix"], [])))}), "testFilesystemResolveDefaultNixFile2_toString": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]((nixScope["toString"]((new Path(["./default.nix"], []))))), "expected": nixScope["toString"]((new Path(["./default.nix"], [])))}), "testFilesystemResolveDefaultNixDir1_toString": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]((nixScope["toString"]((new Path(["./."], []))))), "expected": nixScope["toString"]((new Path(["./default.nix"], [])))}), "testFilesystemResolveDefaultNixDir1_toString2": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]((nixScope["toString"]((new Path(["./."], []))))), "expected": operators.add(nixScope["toString"]((new Path(["./."], []))), "/default.nix")}), "testFilesystemResolveDefaultNixNonExistent": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]("/non-existent/this/does/not/exist/for/real/please-dont-mess-with-your-local-fs"), "expected": "/non-existent/this/does/not/exist/for/real/please-dont-mess-with-your-local-fs"}), "testFilesystemResolveDefaultNixNonExistentDir": ({"expr": nixScope["lib"]["filesystem"]["resolveDefaultNix"]("/non-existent/this/does/not/exist/for/real/please-dont-mess-with-your-local-fs/"), "expected": "/non-existent/this/does/not/exist/for/real/please-dont-mess-with-your-local-fs/default.nix"})}));
    } finally {
        runtime.scopeStack.pop();
    }
})()