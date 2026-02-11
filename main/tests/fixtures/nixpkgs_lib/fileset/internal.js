import { createRuntime, createFunc } from "../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//}
createFunc({"lib": (nixScope)=>(nixScope["import"]((new Path(["../."], [])))),}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["isAttrs"] = nixScope["builtins"]["isAttrs"];
            nixScope["isPath"] = nixScope["builtins"]["isPath"];
            nixScope["isString"] = nixScope["builtins"]["isString"];
            nixScope["nixVersion"] = nixScope["builtins"]["nixVersion"];
            nixScope["pathExists"] = nixScope["builtins"]["pathExists"];
            nixScope["readDir"] = nixScope["builtins"]["readDir"];
            nixScope["split"] = nixScope["builtins"]["split"];
            nixScope["trace"] = nixScope["builtins"]["trace"];
            nixScope["typeOf"] = nixScope["builtins"]["typeOf"];
            nixScope["fetchGit"] = nixScope["builtins"]["fetchGit"];
            nixScope["attrNames"] = nixScope["lib"]["attrsets"]["attrNames"];
            nixScope["attrValues"] = nixScope["lib"]["attrsets"]["attrValues"];
            nixScope["mapAttrs"] = nixScope["lib"]["attrsets"]["mapAttrs"];
            nixScope["mapAttrsToList"] = nixScope["lib"]["attrsets"]["mapAttrsToList"];
            nixScope["optionalAttrs"] = nixScope["lib"]["attrsets"]["optionalAttrs"];
            nixScope["zipAttrsWith"] = nixScope["lib"]["attrsets"]["zipAttrsWith"];
            nixScope["pathType"] = nixScope["lib"]["filesystem"]["pathType"];
            nixScope["all"] = nixScope["lib"]["lists"]["all"];
            nixScope["commonPrefix"] = nixScope["lib"]["lists"]["commonPrefix"];
            nixScope["concatLists"] = nixScope["lib"]["lists"]["concatLists"];
            nixScope["elemAt"] = nixScope["lib"]["lists"]["elemAt"];
            nixScope["filter"] = nixScope["lib"]["lists"]["filter"];
            nixScope["findFirst"] = nixScope["lib"]["lists"]["findFirst"];
            nixScope["findFirstIndex"] = nixScope["lib"]["lists"]["findFirstIndex"];
            nixScope["foldl'"] = nixScope["lib"]["lists"]["foldl'"];
            nixScope["head"] = nixScope["lib"]["lists"]["head"];
            nixScope["length"] = nixScope["lib"]["lists"]["length"];
            nixScope["sublist"] = nixScope["lib"]["lists"]["sublist"];
            nixScope["tail"] = nixScope["lib"]["lists"]["tail"];
            nixScope["append"] = nixScope["lib"]["path"]["append"];
            nixScope["splitRoot"] = nixScope["lib"]["path"]["splitRoot"];
            nixScope["hasStorePathPrefix"] = nixScope["lib"]["path"]["hasStorePathPrefix"];
            nixScope["splitStorePath"] = nixScope["lib"]["path"]["splitStorePath"];
            nixScope["components"] = nixScope["lib"]["path"]["subpath"]["components"];
            nixScope["join"] = nixScope["lib"]["path"]["subpath"]["join"];
            nixScope["isStringLike"] = nixScope["lib"]["strings"]["isStringLike"];
            nixScope["concatStringsSep"] = nixScope["lib"]["strings"]["concatStringsSep"];
            nixScope["substring"] = nixScope["lib"]["strings"]["substring"];
            nixScope["stringLength"] = nixScope["lib"]["strings"]["stringLength"];
            nixScope["hasSuffix"] = nixScope["lib"]["strings"]["hasSuffix"];
            nixScope["versionAtLeast"] = nixScope["lib"]["strings"]["versionAtLeast"];
            nixScope["inPureEvalMode"] = nixScope["lib"]["trivial"]["inPureEvalMode"];
            return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["_currentVersion"] = 3n;
        nixScope["_fetchGitSubmodulesMinver"] = "2.4";
        nixScope["_fetchGitShallowMinver"] = "2.4";
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "migrations", {enumerable: true, get(){return [((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["filesetV0"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "parts", {enumerable: true, get(){return nixScope["splitRoot"](nixScope["filesetV0"]["_internalBase"]);}});
            return operators.merge(nixScope["filesetV0"], ({"_internalVersion": 1n, "_internalBaseRoot": nixScope["parts"]["root"], "_internalBaseComponents": nixScope["components"](nixScope["parts"]["subpath"])}));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["filesetV1"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["filesetV1"], ({"_internalVersion": 2n})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["filesetV2"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["filesetV2"], ({"_internalIsEmptyWithoutBase": false, "_internalVersion": 3n})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))];}});
            Object.defineProperty(nixScope, "_noEvalMessage", {enumerable: true, get(){return `
        lib.fileset: Directly evaluating a file set is not supported.
          To turn it into a usable source, use \`lib.fileset.toSource\`.
          To pretty-print the contents, use \`lib.fileset.trace\` or \`lib.fileset.traceVal\`.`;}});
            Object.defineProperty(nixScope, "_emptyWithoutBase", {enumerable: true, get(){return ({"_type": "fileset", "_internalVersion": nixScope["_currentVersion"], "_internalIsEmptyWithoutBase": true, "_noEval": nixScope["throw"](nixScope["_noEvalMessage"])});}});
            Object.defineProperty(nixScope, "_create", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["base"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "parts", {enumerable: true, get(){return nixScope["splitRoot"](nixScope["base"]);}});
            return ({"_type": "fileset", "_internalVersion": nixScope["_currentVersion"], "_internalIsEmptyWithoutBase": false, "_internalBase": nixScope["base"], "_internalBaseRoot": nixScope["parts"]["root"], "_internalBaseComponents": nixScope["components"](nixScope["parts"]["subpath"]), "_internalTree": nixScope["tree"], "_noEval": nixScope["throw"](nixScope["_noEvalMessage"])});
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_coerce", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["context"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["value"], ["_type"], ""), "fileset"), ()=>((operators.ifThenElse(operators.greaterThan(nixScope["value"]["_internalVersion"], nixScope["_currentVersion"]), ()=>(nixScope["throw"]((new InterpolatedString(["\n          ", " is a file set created from a future version of the file set library with a different internal representation:\n              - Internal version of the file set: ", "\n              - Internal version of the library: ", "\n              Make sure to update your Nixpkgs to have a newer version of \\`lib.fileset\\`."], [()=>(nixScope["context"]), ()=>(nixScope["toString"](nixScope["value"]["_internalVersion"])), ()=>(nixScope["toString"](nixScope["_currentVersion"]))])))), ()=>((operators.ifThenElse(operators.lessThan(nixScope["value"]["_internalVersion"], nixScope["_currentVersion"]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "migrationsToApply", {enumerable: true, get(){return nixScope["sublist"](nixScope["value"]["_internalVersion"])((operators.subtract(nixScope["_currentVersion"], nixScope["value"]["_internalVersion"])))(nixScope["migrations"]);}});
            return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["migration"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["migration"](nixScope["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["value"])(nixScope["migrationsToApply"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(nixScope["value"]))))))), ()=>((operators.ifThenElse(operators.negate(nixScope["isPath"](nixScope["value"])), ()=>((operators.ifThenElse(operators.hasAttr(nixScope["value"], "_isLibCleanSourceWith"), ()=>(nixScope["throw"]((new InterpolatedString(["\n          ", " is a \\`lib.sources\\`-based value, but it should be a file set or a path instead.\n              To convert a \\`lib.sources\\`-based value to a file set you can use \\`lib.fileset.fromSource\\`.\n              Note that this only works for sources created from paths."], [()=>(nixScope["context"])])))), ()=>((operators.ifThenElse(nixScope["isStringLike"](nixScope["value"]), ()=>(nixScope["throw"]((new InterpolatedString(["\n          ", " (\"", "\") is a string-like value, but it should be a file set or a path instead.\n              Paths represented as strings are not supported by \\`lib.fileset\\`, use \\`lib.sources\\` or derivations instead."], [()=>(nixScope["context"]), ()=>(nixScope["toString"](nixScope["value"]))])))), ()=>(nixScope["throw"]((new InterpolatedString(["", " is of type ", ", but it should be a file set or a path instead."], [()=>(nixScope["context"]), ()=>(nixScope["typeOf"](nixScope["value"]))])))))))))), ()=>((operators.ifThenElse(operators.negate(nixScope["pathExists"](nixScope["value"])), ()=>(nixScope["throw"]((new InterpolatedString(["\n        ", " (", ") is a path that does not exist.\n            To create a file set from a path that may not exist, use \\`lib.fileset.maybeMissing\\`."], [()=>(nixScope["context"]), ()=>(nixScope["toString"](nixScope["value"]))])))), ()=>(nixScope["_singleton"](nixScope["value"])))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_coerceMany", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["functionContext"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["list"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "filesets", {enumerable: true, get(){return nixScope["map"]((
    
    // args: {
    //    context,
    //    value,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["_coerce"]((new InterpolatedString(["", ": ", ""], [()=>(nixScope["functionContext"]), ()=>(nixScope["context"])])))(nixScope["value"])
                ))))(nixScope["list"]);}});
            Object.defineProperty(nixScope, "firstWithBase", {enumerable: true, get(){return nixScope["findFirst"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["fileset"]["_internalIsEmptyWithoutBase"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(null)(nixScope["filesets"]);}});
            Object.defineProperty(nixScope, "firstBaseRoot", {enumerable: true, get(){return nixScope["firstWithBase"]["_internalBaseRoot"];}});
            Object.defineProperty(nixScope, "differentIndex", {enumerable: true, get(){return nixScope["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.negate(nixScope["fileset"]["_internalIsEmptyWithoutBase"]), operators.notEqual(nixScope["firstBaseRoot"], nixScope["fileset"]["_internalBaseRoot"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(null)(nixScope["filesets"]);}});
            return (operators.ifThenElse(operators.and(operators.notEqual(nixScope["firstWithBase"], null), operators.notEqual(nixScope["differentIndex"], null)), ()=>(nixScope["throw"]((new InterpolatedString(["\n        ", ": Filesystem roots are not the same:\n            ", ": Filesystem root is \"", "\"\n            ", ": Filesystem root is \"", "\"\n            Different filesystem roots are not supported."], [()=>(nixScope["functionContext"]), ()=>((nixScope["head"](nixScope["list"]))["context"]), ()=>(nixScope["toString"](nixScope["firstBaseRoot"])), ()=>((nixScope["elemAt"](nixScope["list"])(nixScope["differentIndex"]))["context"]), ()=>(nixScope["toString"]((nixScope["elemAt"](nixScope["filesets"])(nixScope["differentIndex"]))["_internalBaseRoot"]))])))), ()=>(nixScope["filesets"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_singleton", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "type", {enumerable: true, get(){return nixScope["pathType"](nixScope["path"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["type"], "directory"), ()=>(nixScope["_create"](nixScope["path"])(nixScope["type"])), ()=>(nixScope["_create"]((nixScope["dirOf"](nixScope["path"])))((function(){
        const obj = {};
        obj[nixScope["baseNameOf"](nixScope["path"])] = nixScope["type"];
        return obj;
    })()))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_directoryEntries", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["value"], "directory"), ()=>(nixScope["readDir"](nixScope["path"])), ()=>(operators.merge(nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return null; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["readDir"](nixScope["path"]))), nixScope["value"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_normaliseTreeFilter", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.or(operators.equal(nixScope["tree"], "directory"), nixScope["isAttrs"](nixScope["tree"])), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "entries", {enumerable: true, get(){return nixScope["_directoryEntries"](nixScope["path"])(nixScope["tree"]);}});
            Object.defineProperty(nixScope, "normalisedSubtrees", {enumerable: true, get(){return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_normaliseTreeFilter"]((operators.add(nixScope["path"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["entries"]);}});
            Object.defineProperty(nixScope, "subtreeValues", {enumerable: true, get(){return nixScope["attrValues"](nixScope["normalisedSubtrees"]);}});
            return (operators.ifThenElse(nixScope["all"](nixScope["isNull"])(nixScope["subtreeValues"]), ()=>(null), ()=>((operators.ifThenElse(nixScope["all"](nixScope["isString"])(nixScope["subtreeValues"]), ()=>("directory"), ()=>(nixScope["normalisedSubtrees"]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(nixScope["tree"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_normaliseTreeMinimal", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.or(operators.equal(nixScope["tree"], "directory"), nixScope["isAttrs"](nixScope["tree"])), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "entries", {enumerable: true, get(){return nixScope["_directoryEntries"](nixScope["path"])(nixScope["tree"]);}});
            Object.defineProperty(nixScope, "normalisedSubtrees", {enumerable: true, get(){return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_normaliseTreeMinimal"]((operators.add(nixScope["path"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["entries"]);}});
            Object.defineProperty(nixScope, "subtreeValues", {enumerable: true, get(){return nixScope["attrValues"](nixScope["normalisedSubtrees"]);}});
            return (operators.ifThenElse(nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["value"], "emptyDir"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["subtreeValues"]), ()=>("emptyDir"), ()=>((operators.ifThenElse(operators.or(operators.equal(nixScope["tree"], "directory"), nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["isString"](nixScope["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["subtreeValues"])), ()=>("directory"), ()=>((operators.ifThenElse(nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(nixScope["isNull"](nixScope["value"]), operators.equal(nixScope["value"], "emptyDir")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["subtreeValues"]), ()=>(null), ()=>(nixScope["normalisedSubtrees"])))))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(nixScope["tree"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_printMinimalTree", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["base"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "treeSuffix", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isAttrs"](nixScope["tree"]), ()=>(""), ()=>((operators.ifThenElse(operators.equal(nixScope["tree"], "directory"), ()=>(" (all files in directory)"), ()=>((new InterpolatedString([" (", ")"], [()=>(nixScope["tree"])])))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "traceTreeAttrs", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prevLine"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["indent"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prevLine"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "subtree", {enumerable: true, get(){return nixScope["tree"][nixScope["name"]];}});
            Object.defineProperty(nixScope, "thisLine", {enumerable: true, get(){return nixScope["trace"]((new InterpolatedString(["", "- ", "", ""], [()=>(nixScope["indent"]), ()=>(nixScope["name"]), ()=>(nixScope["treeSuffix"](nixScope["subtree"]))])))(nixScope["prevLine"]);}});
            return (operators.ifThenElse(operators.or(operators.equal(nixScope["subtree"], null), operators.equal(nixScope["subtree"], "emptyDir")), ()=>(nixScope["prevLine"]), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["subtree"]), ()=>(nixScope["traceTreeAttrs"](nixScope["thisLine"])((new InterpolatedString(["", "  "], [()=>(nixScope["indent"])])))(nixScope["subtree"])), ()=>(nixScope["thisLine"]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["prevLine"])((nixScope["attrNames"](nixScope["tree"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "firstLine", {enumerable: true, get(){return (operators.ifThenElse(operators.or(operators.equal(nixScope["tree"], null), operators.equal(nixScope["tree"], "emptyDir")), ()=>(nixScope["trace"]("(empty)")(null)), ()=>(nixScope["trace"]((new InterpolatedString(["", "", ""], [()=>(nixScope["toString"](nixScope["base"])), ()=>(nixScope["treeSuffix"](nixScope["tree"]))])))(null))));}});
            return (operators.ifThenElse(nixScope["isAttrs"](nixScope["tree"]), ()=>(nixScope["traceTreeAttrs"](nixScope["firstLine"])("")(nixScope["tree"])), ()=>(nixScope["firstLine"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_printFileset", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["fileset"]["_internalIsEmptyWithoutBase"], ()=>(nixScope["trace"]("(empty)")(null)), ()=>(nixScope["_printMinimalTree"](nixScope["fileset"]["_internalBase"])((nixScope["_normaliseTreeMinimal"](nixScope["fileset"]["_internalBase"])(nixScope["fileset"]["_internalTree"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_toSourceFilter", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "tree", {enumerable: true, get(){return nixScope["_normaliseTreeFilter"](nixScope["fileset"]["_internalBase"])(nixScope["fileset"]["_internalTree"]);}});
            Object.defineProperty(nixScope, "baseString", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["fileset"]["_internalBaseComponents"], []), ()=>("/"), ()=>(operators.add(operators.add("/", nixScope["concatStringsSep"]("/")(nixScope["fileset"]["_internalBaseComponents"])), "/"))));}});
            Object.defineProperty(nixScope, "baseLength", {enumerable: true, get(){return nixScope["stringLength"](nixScope["baseString"]);}});
            Object.defineProperty(nixScope, "inTree", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["components"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "recurse", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["index"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["localTree"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isAttrs"](nixScope["localTree"]), ()=>((operators.ifThenElse(operators.greaterThanOrEqual(nixScope["index"], nixScope["length"](nixScope["components"])), ()=>(true), ()=>(nixScope["recurse"]((operators.add(nixScope["index"], 2n)))(nixScope["localTree"][nixScope["elemAt"](nixScope["components"])(nixScope["index"])]))))), ()=>(operators.notEqual(nixScope["localTree"], null)))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope["recurse"](0n)(nixScope["tree"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "empty", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return false; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "nonEmpty", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "pathSlash", {enumerable: true, get(){return operators.add(nixScope["path"], "/");}});
            return operators.and(((operators.ifThenElse(operators.equal(nixScope["substring"](0n)((nixScope["stringLength"](nixScope["pathSlash"])))(nixScope["baseString"]), nixScope["pathSlash"]), ()=>(true), ()=>((operators.ifThenElse(operators.notEqual(nixScope["substring"](0n)(nixScope["baseLength"])(nixScope["pathSlash"]), nixScope["baseString"]), ()=>(false), ()=>(nixScope["inTree"]((nixScope["split"]("/")((nixScope["substring"](nixScope["baseLength"])((-1n))(nixScope["path"])))))))))))), (operators.or(operators.notEqual(nixScope["type"], "unknown"), nixScope["throw"]((new InterpolatedString(["\n            lib.fileset.toSource: \\`fileset\\` contains a file that cannot be added to the store: ", "\n                This file is neither a regular file nor a symlink, the only file types supported by the Nix store.\n                Therefore the file set cannot be added to the Nix store as is. Make sure to not include that file to avoid this error."], [()=>(nixScope["path"])]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (operators.ifThenElse(operators.or(nixScope["fileset"]["_internalIsEmptyWithoutBase"], operators.equal(nixScope["tree"], null)), ()=>(nixScope["empty"]), ()=>(nixScope["nonEmpty"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_fromSourceFilter", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["root"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["sourceFilter"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "fromDirEntry", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pathString"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["sourceFilter"](nixScope["pathString"])(nixScope["type"])), ()=>(null), ()=>((operators.ifThenElse(operators.equal(nixScope["type"], "directory"), ()=>(nixScope["fromDir"](nixScope["path"])(nixScope["pathString"])), ()=>(nixScope["type"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "fromDir", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pathString"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["fromDirEntry"]((operators.add(nixScope["path"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])))))((operators.add(nixScope["pathString"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["readDir"](nixScope["path"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "rootPathType", {enumerable: true, get(){return nixScope["pathType"](nixScope["root"]);}});
            Object.defineProperty(nixScope, "rootString", {enumerable: true, get(){return operators.add("/", nixScope["concatStringsSep"]("/")((nixScope["components"]((nixScope["splitRoot"](nixScope["root"]))["subpath"]))));}});
            return (operators.ifThenElse(operators.equal(nixScope["rootPathType"], "directory"), ()=>(nixScope["_create"](nixScope["root"])((nixScope["fromDir"](nixScope["root"])(nixScope["rootString"])))), ()=>(nixScope["_create"]((nixScope["dirOf"](nixScope["root"])))((function(){
        const obj = {};
        obj[nixScope["baseNameOf"](nixScope["root"])] = nixScope["rootPathType"];
        return obj;
    })()))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_toList", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "recurse", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isAttrs"](nixScope["tree"]), ()=>(nixScope["concatLists"]((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["recurse"]((operators.add(nixScope["path"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])))))(nixScope["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["tree"])))), ()=>((operators.ifThenElse(operators.equal(nixScope["tree"], "directory"), ()=>(nixScope["recurse"](nixScope["path"])((nixScope["readDir"](nixScope["path"])))), ()=>((operators.ifThenElse(operators.equal(nixScope["tree"], null), ()=>([]), ()=>([nixScope["path"]]))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (operators.ifThenElse(nixScope["fileset"]["_internalIsEmptyWithoutBase"], ()=>([]), ()=>(nixScope["recurse"](nixScope["fileset"]["_internalBase"])(nixScope["fileset"]["_internalTree"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_shortenTreeBase", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["targetBaseComponents"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "recurse", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["index"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.lessThan(nixScope["index"], nixScope["length"](nixScope["fileset"]["_internalBaseComponents"])), ()=>((function(){
        const obj = {};
        obj[nixScope["elemAt"](nixScope["fileset"]["_internalBaseComponents"])(nixScope["index"])] = nixScope["recurse"]((operators.add(nixScope["index"], 1n)));
        return obj;
    })()), ()=>(nixScope["fileset"]["_internalTree"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope["recurse"]((nixScope["length"](nixScope["targetBaseComponents"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_lengthenTreeBase", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["targetBaseComponents"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "recurse", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["index"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(nixScope["isAttrs"](nixScope["tree"]), operators.lessThan(nixScope["index"], nixScope["length"](nixScope["targetBaseComponents"]))), ()=>(nixScope["recurse"]((operators.add(nixScope["index"], 1n)))((operators.selectOrDefault(nixScope["tree"], [nixScope["elemAt"](nixScope["targetBaseComponents"])(nixScope["index"])], null)))), ()=>(nixScope["tree"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope["recurse"]((nixScope["length"](nixScope["fileset"]["_internalBaseComponents"])))(nixScope["fileset"]["_internalTree"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_unionMany", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["filesets"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "filesetsWithBase", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["fileset"]["_internalIsEmptyWithoutBase"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["filesets"]);}});
            Object.defineProperty(nixScope, "firstWithBase", {enumerable: true, get(){return nixScope["head"](nixScope["filesetsWithBase"]);}});
            Object.defineProperty(nixScope, "commonBaseComponents", {enumerable: true, get(){return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["components"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["el"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["commonPrefix"](nixScope["components"])(nixScope["el"]["_internalBaseComponents"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["firstWithBase"]["_internalBaseComponents"])((nixScope["tail"](nixScope["filesetsWithBase"])));}});
            Object.defineProperty(nixScope, "commonBase", {enumerable: true, get(){return nixScope["append"](nixScope["firstWithBase"]["_internalBaseRoot"])((nixScope["join"](nixScope["commonBaseComponents"])));}});
            Object.defineProperty(nixScope, "trees", {enumerable: true, get(){return nixScope["map"]((nixScope["_shortenTreeBase"](nixScope["commonBaseComponents"])))(nixScope["filesetsWithBase"]);}});
            Object.defineProperty(nixScope, "resultTree", {enumerable: true, get(){return nixScope["_unionTrees"](nixScope["trees"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["filesetsWithBase"], []), ()=>(nixScope["_emptyWithoutBase"]), ()=>(nixScope["_create"](nixScope["commonBase"])(nixScope["resultTree"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_unionTrees", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["trees"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "stringIndex", {enumerable: true, get(){return nixScope["findFirstIndex"](nixScope["isString"])(null)(nixScope["trees"]);}});
            Object.defineProperty(nixScope, "withoutNull", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tree"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["tree"], null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["trees"]);}});
            return (operators.ifThenElse(operators.notEqual(nixScope["stringIndex"], null), ()=>(nixScope["elemAt"](nixScope["trees"])(nixScope["stringIndex"])), ()=>((operators.ifThenElse(operators.equal(nixScope["withoutNull"], []), ()=>(null), ()=>(nixScope["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_unionTrees"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["withoutNull"])))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_intersection", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset1"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset2"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "commonBaseComponentsLength", {enumerable: true, get(){return nixScope["length"]((nixScope["commonPrefix"](nixScope["fileset1"]["_internalBaseComponents"])(nixScope["fileset2"]["_internalBaseComponents"])));}});
            Object.defineProperty(nixScope, "longestBaseFileset", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["commonBaseComponentsLength"], nixScope["length"](nixScope["fileset1"]["_internalBaseComponents"])), ()=>(nixScope["fileset2"]), ()=>((operators.ifThenElse(operators.equal(nixScope["commonBaseComponentsLength"], nixScope["length"](nixScope["fileset2"]["_internalBaseComponents"])), ()=>(nixScope["fileset1"]), ()=>(null))))));}});
            Object.defineProperty(nixScope, "resultIsEmptyWithoutBase", {enumerable: true, get(){return operators.or(operators.or(nixScope["fileset1"]["_internalIsEmptyWithoutBase"], nixScope["fileset2"]["_internalIsEmptyWithoutBase"]), operators.equal(nixScope["longestBaseFileset"], null));}});
            Object.defineProperty(nixScope, "tree1", {enumerable: true, get(){return nixScope["_lengthenTreeBase"](nixScope["longestBaseFileset"]["_internalBaseComponents"])(nixScope["fileset1"]);}});
            Object.defineProperty(nixScope, "tree2", {enumerable: true, get(){return nixScope["_lengthenTreeBase"](nixScope["longestBaseFileset"]["_internalBaseComponents"])(nixScope["fileset2"]);}});
            Object.defineProperty(nixScope, "resultTree", {enumerable: true, get(){return nixScope["_intersectTree"](nixScope["tree1"])(nixScope["tree2"]);}});
            return (operators.ifThenElse(nixScope["resultIsEmptyWithoutBase"], ()=>(nixScope["_emptyWithoutBase"]), ()=>(nixScope["_create"](nixScope["longestBaseFileset"]["_internalBase"])(nixScope["resultTree"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_intersectTree", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(nixScope["isAttrs"](nixScope["lhs"]), nixScope["isAttrs"](nixScope["rhs"])), ()=>(nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_intersectTree"](nixScope["lhs"][nixScope["name"]]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["builtins"]["intersectAttrs"](nixScope["lhs"])(nixScope["rhs"])))), ()=>((operators.ifThenElse(operators.or(operators.equal(nixScope["lhs"], null), nixScope["isString"](nixScope["rhs"])), ()=>(nixScope["lhs"]), ()=>(nixScope["rhs"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_difference", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["positive"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["negative"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "commonBaseComponentsLength", {enumerable: true, get(){return nixScope["length"]((nixScope["commonPrefix"](nixScope["positive"]["_internalBaseComponents"])(nixScope["negative"]["_internalBaseComponents"])));}});
            Object.defineProperty(nixScope, "negativeTreeWithPositiveBase", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["commonBaseComponentsLength"], nixScope["length"](nixScope["positive"]["_internalBaseComponents"])), ()=>(nixScope["_shortenTreeBase"](nixScope["positive"]["_internalBaseComponents"])(nixScope["negative"])), ()=>((operators.ifThenElse(operators.equal(nixScope["commonBaseComponentsLength"], nixScope["length"](nixScope["negative"]["_internalBaseComponents"])), ()=>(nixScope["_lengthenTreeBase"](nixScope["positive"]["_internalBaseComponents"])(nixScope["negative"])), ()=>(null))))));}});
            Object.defineProperty(nixScope, "resultingTree", {enumerable: true, get(){return nixScope["_differenceTree"](nixScope["positive"]["_internalBase"])(nixScope["positive"]["_internalTree"])(nixScope["negativeTreeWithPositiveBase"]);}});
            return (operators.ifThenElse(nixScope["positive"]["_internalIsEmptyWithoutBase"], ()=>(nixScope["_emptyWithoutBase"]), ()=>((operators.ifThenElse(nixScope["negative"]["_internalIsEmptyWithoutBase"], ()=>(nixScope["positive"]), ()=>(nixScope["_create"](nixScope["positive"]["_internalBase"])(nixScope["resultingTree"])))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_differenceTree", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.or(operators.equal(nixScope["lhs"], null), nixScope["isString"](nixScope["rhs"])), ()=>(null), ()=>((operators.ifThenElse(operators.equal(nixScope["rhs"], null), ()=>(nixScope["lhs"]), ()=>(nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhsValue"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_differenceTree"]((operators.add(nixScope["path"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])))))(nixScope["lhsValue"])((operators.selectOrDefault(nixScope["rhs"], [nixScope["name"]], null))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["_directoryEntries"](nixScope["path"])(nixScope["lhs"]))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_fileFilter", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["predicate"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["root"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "fromFile", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["predicate"](({"name": nixScope["name"], "type": nixScope["type"], "hasExt": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ext"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["hasSuffix"]((new InterpolatedString([".", ""], [()=>(nixScope["ext"])])))(nixScope["name"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "lib.fileset.fileFilter: The predicate function passed as the first argument must be able to handle extra attributes for future compatibility. If you're using `{ name, file, hasExt }:`, use `{ name, file, hasExt, ... }:` instead.": null})), ()=>(nixScope["type"]), ()=>(null))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "fromDir", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["type"], "directory"), ()=>(nixScope["fromDir"]((operators.add(nixScope["path"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])))))), ()=>(nixScope["fromFile"](nixScope["name"])(nixScope["type"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["readDir"](nixScope["path"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "rootType", {enumerable: true, get(){return nixScope["pathType"](nixScope["root"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["rootType"], "directory"), ()=>(nixScope["_create"](nixScope["root"])((nixScope["fromDir"](nixScope["root"])))), ()=>(nixScope["_create"]((nixScope["dirOf"](nixScope["root"])))((function(){
        const obj = {};
        obj[nixScope["baseNameOf"](nixScope["root"])] = nixScope["fromFile"]((nixScope["baseNameOf"](nixScope["root"])))(nixScope["rootType"]);
        return obj;
    })()))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_mirrorStorePath", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["localPath"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["storePath"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "recurse", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["focusedStorePath"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["type"], "directory"), ()=>(nixScope["recurse"]((operators.add(nixScope["focusedStorePath"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])))))), ()=>(nixScope["type"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["builtins"]["readDir"](nixScope["focusedStorePath"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope["_create"](nixScope["localPath"])((nixScope["recurse"](nixScope["storePath"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "_fromFetchGit", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["function"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["argument"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["extraFetchGitAttrs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "tryStorePath", {enumerable: true, get(){return (operators.ifThenElse(nixScope["pathExists"]((operators.add(nixScope["path"], "/.git"))), ()=>(nixScope["throw"]((new InterpolatedString(["\n            lib.fileset.", ": The ", " (", ") is a store path within a working tree of a Git repository.\n                This indicates that a source directory was imported into the store using a method such as \\`import \"${./.}\"\\` or \\`path:.\\`.\n                This function currently does not support such a use case, since it currently relies on \\`builtins.fetchGit\\`.\n                You could make this work by using a fetcher such as \\`fetchGit\\` instead of copying the whole repository.\n                If you can't avoid copying the repo to the store, see https://github.com/NixOS/nix/issues/9292."], [()=>(nixScope["function"]), ()=>(nixScope["argument"]), ()=>(nixScope["toString"](nixScope["path"]))])))), ()=>(nixScope["_singleton"](nixScope["path"]))));}});
            Object.defineProperty(nixScope, "tryFetchGit", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "fetchResult", {enumerable: true, get(){return nixScope["fetchGit"]((operators.merge(({"url": nixScope["path"]}), operators.merge(nixScope["optionalAttrs"]((nixScope["versionAtLeast"](nixScope["nixVersion"])(nixScope["_fetchGitShallowMinver"])))(({"shallow": true})), nixScope["extraFetchGitAttrs"]))));}});
            return (operators.ifThenElse(operators.negate(nixScope["pathExists"]((operators.add(nixScope["path"], "/.git")))), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.", ": Expected the ", " (", ") to point to a local working tree of a Git repository, but it's not."], [()=>(nixScope["function"]), ()=>(nixScope["argument"]), ()=>(nixScope["toString"](nixScope["path"]))])))), ()=>(nixScope["_mirrorStorePath"](nixScope["path"])(nixScope["fetchResult"]["outPath"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            return (operators.ifThenElse(operators.negate(nixScope["isPath"](nixScope["path"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.", ": Expected the ", " to be a path, but it's a ", " instead."], [()=>(nixScope["function"]), ()=>(nixScope["argument"]), ()=>(nixScope["typeOf"](nixScope["path"]))])))), ()=>((operators.ifThenElse(operators.notEqual(nixScope["pathType"](nixScope["path"]), "directory"), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.", ": Expected the ", " (", ") to be a directory, but it's a file instead."], [()=>(nixScope["function"]), ()=>(nixScope["argument"]), ()=>(nixScope["toString"](nixScope["path"]))])))), ()=>((operators.ifThenElse(nixScope["hasStorePathPrefix"](nixScope["path"]), ()=>(nixScope["tryStorePath"]), ()=>(nixScope["tryFetchGit"])))))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))