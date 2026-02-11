import { createRuntime } from "../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /**
  Functions for querying information about the filesystem
  without copying any files to the Nix store.
*/(function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["readDir"] = nixScope["builtins"]["readDir"];
        nixScope["pathExists"] = nixScope["builtins"]["pathExists"];
        nixScope["toString"] = nixScope["builtins"]["toString"];
        nixScope["pathIsDirectory"] = nixScope["lib"]["filesystem"]["pathIsDirectory"];
        nixScope["pathIsRegularFile"] = nixScope["lib"]["filesystem"]["pathIsRegularFile"];
        nixScope["pathType"] = nixScope["lib"]["filesystem"]["pathType"];
        nixScope["packagesFromDirectoryRecursive"] = nixScope["lib"]["filesystem"]["packagesFromDirectoryRecursive"];
        nixScope["hasSuffix"] = nixScope["lib"]["strings"]["hasSuffix"];
        return ({"pathType": operators.selectOrDefault(nixScope["builtins"], ["readFileType"], ((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["pathExists"](nixScope["path"])), ()=>(nixScope["abort"]((new InterpolatedString(["lib.filesystem.pathType: Path ", " does not exist."], [()=>(nixScope["toString"](nixScope["path"]))])))), ()=>((operators.ifThenElse(operators.equal(nixScope["dirOf"](nixScope["path"]), nixScope["path"]), ()=>("directory"), ()=>((nixScope["readDir"]((nixScope["dirOf"](nixScope["path"]))))[nixScope["baseNameOf"](nixScope["path"])])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), "pathIsDirectory": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["pathExists"](nixScope["path"]), operators.equal(nixScope["pathType"](nixScope["path"]), "directory")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "pathIsRegularFile": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["pathExists"](nixScope["path"]), operators.equal(nixScope["pathType"](nixScope["path"]), "regular")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "haskellPathsInDir": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["root"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "root-files", {enumerable: true, get(){return nixScope["builtins"]["attrNames"]((nixScope["builtins"]["readDir"](nixScope["root"])));}});
        Object.defineProperty(nixScope, "root-files-with-paths", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return ({"name": nixScope["file"], "value": operators.add(nixScope["root"], (new InterpolatedString(["/", ""], [()=>(nixScope["file"])])))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["root-files"]);}});
        Object.defineProperty(nixScope, "cabal-subdirs", {enumerable: true, get(){return nixScope["builtins"]["filter"](((function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return nixScope["builtins"]["pathExists"]((operators.add(nixScope["value"], (new InterpolatedString(["/", ".cabal"], [()=>(nixScope["name"])])))))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })))(nixScope["root-files-with-paths"]);}});
        return nixScope["builtins"]["listToAttrs"](nixScope["cabal-subdirs"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "locateDominatingFile": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pattern"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "go", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "files", {enumerable: true, get(){return nixScope["builtins"]["attrNames"]((nixScope["builtins"]["readDir"](nixScope["path"])));}});
        Object.defineProperty(nixScope, "matches", {enumerable: true, get(){return nixScope["builtins"]["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["match"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["match"], null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["map"]((nixScope["builtins"]["match"](nixScope["pattern"])))(nixScope["files"])));}});
        return (operators.ifThenElse(operators.notEqual(nixScope["builtins"]["length"](nixScope["matches"]), 0n), ()=>(({"path": nixScope["path"], "matches": nixScope["matches"]})), ()=>((operators.ifThenElse(operators.equal(nixScope["path"], (new Path(["/."], []))), ()=>(null), ()=>(nixScope["go"]((nixScope["dirOf"](nixScope["path"])))))))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "parent", {enumerable: true, get(){return nixScope["dirOf"](nixScope["file"]);}});
        Object.defineProperty(nixScope, "isDir", {enumerable: true, get(){return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "base", {enumerable: true, get(){return nixScope["baseNameOf"](nixScope["file"]);}});
        Object.defineProperty(nixScope, "type", {enumerable: true, get(){return operators.selectOrDefault((nixScope["builtins"]["readDir"](nixScope["parent"])), [nixScope["base"]], null);}});
        return operators.or(operators.equal(nixScope["file"], (new Path(["/."], []))), operators.equal(nixScope["type"], "directory"));
    } finally {
        runtime.scopeStack.pop();
    }
})();}});
        return nixScope["go"](((operators.ifThenElse(nixScope["isDir"], ()=>(nixScope["file"]), ()=>(nixScope["parent"])))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "listFilesRecursive": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["dir"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["flatten"]((nixScope["lib"]["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["type"], "directory"), ()=>(nixScope["lib"]["filesystem"]["listFilesRecursive"]((operators.add(nixScope["dir"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])))))), ()=>(operators.add(nixScope["dir"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["builtins"]["readDir"](nixScope["dir"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "packagesFromDirectoryRecursive": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["concatMapAttrs"] = nixScope["lib"]["concatMapAttrs"];
        nixScope["id"] = nixScope["lib"]["id"];
        nixScope["makeScope"] = nixScope["lib"]["makeScope"];
        nixScope["recurseIntoAttrs"] = nixScope["lib"]["recurseIntoAttrs"];
        nixScope["removeSuffix"] = nixScope["lib"]["removeSuffix"];
        Object.defineProperty(nixScope, "processDir", {enumerable: true, get(){return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        "args": arg,
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return nixScope["concatMapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "path", {enumerable: true, get(){return operators.add(nixScope["directory"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])])));}});
        return (operators.ifThenElse(operators.equal(nixScope["type"], "directory"), ()=>((function(){
    const obj = {};
    obj[(new InterpolatedString(["", ""], [()=>(nixScope["name"])]))] = nixScope["packagesFromDirectoryRecursive"]((operators.merge(nixScope["args"], ({"directory": nixScope["path"]}))));
    return obj;
})()), ()=>((operators.ifThenElse(operators.and(operators.equal(nixScope["type"], "regular"), nixScope["hasSuffix"](".nix")(nixScope["name"])), ()=>((function(){
    const obj = {};
    obj[(new InterpolatedString(["", ""], [()=>(nixScope["removeSuffix"](".nix")(nixScope["name"]))]))] = nixScope["callPackage"](nixScope["path"])({});
    return obj;
})()), ()=>((operators.ifThenElse(operators.equal(nixScope["type"], "regular"), ()=>({}), ()=>(nixScope["throw"]((new InterpolatedString(["\n              lib.filesystem.packagesFromDirectoryRecursive: Unsupported file type ", " at path ", "\n            "], [()=>(nixScope["type"]), ()=>(nixScope["toString"](nixScope["path"]))]))))))))))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["builtins"]["readDir"](nixScope["directory"])))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "newScope": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["throw"]("lib.packagesFromDirectoryRecursive: newScope wasn't passed in args"); })(),
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        "args": arg,
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "defaultPath", {enumerable: true, get(){return operators.add(nixScope["directory"], "/package.nix");}});
        return (operators.ifThenElse(nixScope["pathExists"](nixScope["defaultPath"]), ()=>(nixScope["callPackage"](nixScope["defaultPath"])({})), ()=>((operators.ifThenElse(operators.hasAttr(nixScope["args"], "newScope"), ()=>(nixScope["recurseIntoAttrs"]((nixScope["makeScope"](nixScope["newScope"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["processDir"]((operators.merge(nixScope["args"], (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
    const obj = {};
        obj["callPackage"] = nixScope["self"]["callPackage"];
        obj["newScope"] = nixScope["self"]["newScope"];
    return obj;
    } finally {
        runtime.scopeStack.pop();
    }
})()))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))), ()=>(nixScope["processDir"](nixScope["args"])))))));
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });
    } finally {
        runtime.scopeStack.pop();
    }
})(), "resolveDefaultNix": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["pathIsDirectory"](nixScope["v"]), ()=>(operators.add(nixScope["v"], "/default.nix")), ()=>((operators.ifThenElse(operators.and(nixScope["lib"]["isString"](nixScope["v"]), nixScope["hasSuffix"]("/")(nixScope["v"])), ()=>(operators.add(nixScope["v"], "default.nix")), ()=>(nixScope["v"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })