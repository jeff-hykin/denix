import { createRuntime } from "../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
(function(arg){
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
        nixScope["match"] = nixScope["lib"]["strings"]["match"];
        nixScope["split"] = nixScope["lib"]["strings"]["split"];
        nixScope["storeDir"] = nixScope["lib"]["strings"]["storeDir"];
        nixScope["boolToString"] = nixScope["lib"]["boolToString"];
        nixScope["filter"] = nixScope["lib"]["filter"];
        nixScope["isString"] = nixScope["lib"]["isString"];
        nixScope["readFile"] = nixScope["lib"]["readFile"];
        nixScope["pathIsRegularFile"] = nixScope["lib"]["filesystem"]["pathIsRegularFile"];
        Object.defineProperty(nixScope, "cleanSourceFilter", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "baseName", {enumerable: true, get(){return nixScope["baseNameOf"]((nixScope["toString"](nixScope["name"])));}});
        return operators.negate((operators.or(operators.or(operators.or(operators.or(operators.or(operators.or(operators.or((operators.or(operators.equal(nixScope["baseName"], ".git"), operators.and(operators.equal(nixScope["type"], "directory"), (operators.or(operators.or(operators.or(operators.equal(nixScope["baseName"], ".svn"), operators.equal(nixScope["baseName"], "CVS")), operators.equal(nixScope["baseName"], ".hg")), operators.equal(nixScope["baseName"], ".jj")))))), nixScope["lib"]["hasSuffix"]("~")(nixScope["baseName"])), operators.notEqual(nixScope["match"]("^")(nixScope["baseName"]), null)), operators.notEqual(nixScope["match"]("^")(nixScope["baseName"]), null)), nixScope["lib"]["hasSuffix"](".o")(nixScope["baseName"])), nixScope["lib"]["hasSuffix"](".so")(nixScope["baseName"])), (operators.and(operators.equal(nixScope["type"], "symlink"), nixScope["lib"]["hasPrefix"]("result")(nixScope["baseName"])))), (operators.equal(nixScope["type"], "unknown")))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "cleanSource", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["src"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["cleanSourceWith"](({"filter": nixScope["cleanSourceFilter"], "src": nixScope["src"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "cleanSourceWith", {enumerable: true, get(){return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "filter": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_type"] = arg; runtime.scopeStack.push(nixScope); try { return true; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); })(),"name": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return null; })(),
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
        Object.defineProperty(nixScope, "orig", {enumerable: true, get(){return nixScope["toSourceAttributes"](nixScope["src"]);}});
        return nixScope["fromSourceAttributes"]((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
    const obj = {};
        obj["origSrc"] = nixScope["orig"]["origSrc"];
        obj["filter"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["filter"](nixScope["path"])(nixScope["type"]), nixScope["orig"]["filter"](nixScope["path"])(nixScope["type"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        obj["name"] = (operators.ifThenElse(operators.notEqual(nixScope["name"], null), ()=>(nixScope["name"]), ()=>(nixScope["orig"]["name"])));
    return obj;
    } finally {
        runtime.scopeStack.pop();
    }
})());
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        Object.defineProperty(nixScope, "trace", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["src"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "attrs", {enumerable: true, get(){return nixScope["toSourceAttributes"](nixScope["src"]);}});
        return operators.merge(nixScope["fromSourceAttributes"]((operators.merge(nixScope["attrs"], ({"filter": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "r", {enumerable: true, get(){return nixScope["attrs"]["filter"](nixScope["path"])(nixScope["type"]);}});
        return nixScope["builtins"]["trace"]((new InterpolatedString(["", ".filter ", " = ", ""], [()=>(nixScope["attrs"]["name"]), ()=>(nixScope["path"]), ()=>(nixScope["boolToString"](nixScope["r"]))])))(nixScope["r"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})))), ({"satisfiesSubpathInvariant": operators.and(operators.hasAttr(nixScope["src"], "satisfiesSubpathInvariant"), nixScope["src"]["satisfiesSubpathInvariant"])}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "sourceByRegex", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["src"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["regexes"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "isFiltered", {enumerable: true, get(){return operators.hasAttr(nixScope["src"], "_isLibCleanSourceWith");}});
        Object.defineProperty(nixScope, "origSrc", {enumerable: true, get(){return (operators.ifThenElse(nixScope["isFiltered"], ()=>(nixScope["src"]["origSrc"]), ()=>(nixScope["src"])));}});
        return nixScope["lib"]["cleanSourceWith"](({"filter": ((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "relPath", {enumerable: true, get(){return nixScope["lib"]["removePrefix"]((operators.add(nixScope["toString"](nixScope["origSrc"]), "/")))((nixScope["toString"](nixScope["path"])));}});
        return nixScope["lib"]["any"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["re"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["match"](nixScope["re"])(nixScope["relPath"]), null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["regexes"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])), "src": nixScope["src"]}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "sourceFilesBySuffices", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["src"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["exts"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "filter", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "base", {enumerable: true, get(){return nixScope["baseNameOf"]((nixScope["toString"](nixScope["name"])));}});
        return operators.or(operators.equal(nixScope["type"], "directory"), nixScope["lib"]["any"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ext"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["hasSuffix"](nixScope["ext"])(nixScope["base"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["exts"]));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return nixScope["cleanSourceWith"](({"filter": nixScope["filter"], "src": nixScope["src"]}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "pathIsGitRepo", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return operators.hasAttr((nixScope["_commitIdFromGitRepoOrError"](nixScope["path"])), "value"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "commitIdFromGitRepo", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "commitIdOrError", {enumerable: true, get(){return nixScope["_commitIdFromGitRepoOrError"](nixScope["path"]);}});
        return operators.selectOrDefault(nixScope["commitIdOrError"], ["value"], (nixScope["throw"](nixScope["commitIdOrError"]["error"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "_commitIdFromGitRepoOrError", {enumerable: true, get(){return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "readCommitFromFile", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "fileName", {enumerable: true, get(){return operators.add(nixScope["path"], (new InterpolatedString(["/", ""], [()=>(nixScope["file"])])));}});
        Object.defineProperty(nixScope, "packedRefsName", {enumerable: true, get(){return operators.add(nixScope["path"], "/packed-refs");}});
        Object.defineProperty(nixScope, "absolutePath", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["base"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["lib"]["hasPrefix"]("/")(nixScope["path"]), ()=>(nixScope["path"]), ()=>(nixScope["toString"]((operators.add((new Path(["/."], [])), (new InterpolatedString(["", "/", ""], [()=>(nixScope["base"]), ()=>(nixScope["path"])])))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return (operators.ifThenElse(nixScope["pathIsRegularFile"](nixScope["path"]), ()=>((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "m", {enumerable: true, get(){return nixScope["match"]("^gitdir: (.*)$")((nixScope["lib"]["fileContents"](nixScope["path"])));}});
        return (operators.ifThenElse(operators.equal(nixScope["m"], null), ()=>(({"error": operators.add("File contains no gitdir reference: ", nixScope["path"])})), ()=>((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "gitDir", {enumerable: true, get(){return nixScope["absolutePath"]((nixScope["dirOf"](nixScope["path"])))((nixScope["lib"]["head"](nixScope["m"])));}});
        Object.defineProperty(nixScope, "commonDir''", {enumerable: true, get(){return (operators.ifThenElse(nixScope["pathIsRegularFile"]((new InterpolatedString(["", "/commondir"], [()=>(nixScope["gitDir"])]))), ()=>(nixScope["lib"]["fileContents"]((new InterpolatedString(["", "/commondir"], [()=>(nixScope["gitDir"])])))), ()=>(nixScope["gitDir"])));}});
        Object.defineProperty(nixScope, "commonDir'", {enumerable: true, get(){return nixScope["lib"]["removeSuffix"]("/")(nixScope["commonDir''"]);}});
        Object.defineProperty(nixScope, "commonDir", {enumerable: true, get(){return nixScope["absolutePath"](nixScope["gitDir"])(nixScope["commonDir'"]);}});
        Object.defineProperty(nixScope, "refFile", {enumerable: true, get(){return nixScope["lib"]["removePrefix"]((new InterpolatedString(["", "/"], [()=>(nixScope["commonDir"])])))((new InterpolatedString(["", "/", ""], [()=>(nixScope["gitDir"]), ()=>(nixScope["file"])])));}});
        return nixScope["readCommitFromFile"](nixScope["refFile"])(nixScope["commonDir"]);
    } finally {
        runtime.scopeStack.pop();
    }
})())));
    } finally {
        runtime.scopeStack.pop();
    }
})()), ()=>((operators.ifThenElse(nixScope["pathIsRegularFile"](nixScope["fileName"]), ()=>((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "fileContent", {enumerable: true, get(){return nixScope["lib"]["fileContents"](nixScope["fileName"]);}});
        Object.defineProperty(nixScope, "matchRef", {enumerable: true, get(){return nixScope["match"]("^ref: (.*)$")(nixScope["fileContent"]);}});
        return (operators.ifThenElse(operators.equal(nixScope["matchRef"], null), ()=>(({"value": nixScope["fileContent"]})), ()=>(nixScope["readCommitFromFile"]((nixScope["lib"]["head"](nixScope["matchRef"])))(nixScope["path"]))));
    } finally {
        runtime.scopeStack.pop();
    }
})()), ()=>((operators.ifThenElse(nixScope["pathIsRegularFile"](nixScope["packedRefsName"]), ()=>((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "fileContent", {enumerable: true, get(){return nixScope["readFile"](nixScope["packedRefsName"]);}});
        Object.defineProperty(nixScope, "matchRef", {enumerable: true, get(){return nixScope["match"]((new InterpolatedString(["([a-z0-9]+) ", ""], [()=>(nixScope["file"])])));}});
        Object.defineProperty(nixScope, "isRef", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["s"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["isString"](nixScope["s"]), operators.notEqual((nixScope["matchRef"](nixScope["s"])), null)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "refs", {enumerable: true, get(){return nixScope["filter"](nixScope["isRef"])((nixScope["split"]("")(nixScope["fileContent"])));}});
        return (operators.ifThenElse(operators.equal(nixScope["refs"], []), ()=>(({"error": operators.add(operators.add(operators.add("Could not find ", nixScope["file"]), " in "), nixScope["packedRefsName"])})), ()=>(({"value": nixScope["lib"]["head"]((nixScope["matchRef"]((nixScope["lib"]["head"](nixScope["refs"])))))}))));
    } finally {
        runtime.scopeStack.pop();
    }
})()), ()=>(({"error": operators.add("Not a .git directory: ", nixScope["toString"](nixScope["path"]))}))))))))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return nixScope["readCommitFromFile"]("HEAD");
    } finally {
        runtime.scopeStack.pop();
    }
})();}});
        Object.defineProperty(nixScope, "pathHasContext", {enumerable: true, get(){return operators.selectOrDefault(nixScope["builtins"], ["hasContext"], (nixScope["lib"]["hasPrefix"](nixScope["storeDir"])));}});
        Object.defineProperty(nixScope, "canCleanSource", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["src"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.hasAttr(nixScope["src"], "_isLibCleanSourceWith"), operators.negate((nixScope["pathHasContext"]((nixScope["toString"](nixScope["src"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "toSourceAttributes", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["src"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "isFiltered", {enumerable: true, get(){return operators.hasAttr(nixScope["src"], "_isLibCleanSourceWith");}});
        return ({"origSrc": (operators.ifThenElse(nixScope["isFiltered"], ()=>(nixScope["src"]["origSrc"]), ()=>(nixScope["src"]))), "filter": (operators.ifThenElse(nixScope["isFiltered"], ()=>(nixScope["src"]["filter"]), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return true; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))), "name": (operators.ifThenElse(nixScope["isFiltered"], ()=>(nixScope["src"]["name"]), ()=>("source")))});
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "fromSourceAttributes", {enumerable: true, get(){return (function(arg){
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
                        return ({"_isLibCleanSourceWith": true, "origSrc": nixScope["origSrc"], "filter": nixScope["filter"], "name": nixScope["name"], "outPath": nixScope["builtins"]["path"](({"filter": nixScope["filter"], "name": nixScope["name"], "path": nixScope["origSrc"]}))})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        Object.defineProperty(nixScope, "urlToName", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["url"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["stringLength"] = nixScope["lib"]["strings"]["stringLength"];
        Object.defineProperty(nixScope, "base", {enumerable: true, get(){return nixScope["baseNameOf"]((nixScope["lib"]["removeSuffix"]("/")((nixScope["lib"]["last"]((nixScope["lib"]["splitString"](":")((nixScope["toString"](nixScope["url"])))))))));}});
        Object.defineProperty(nixScope, "removeExt", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "matchExt", {enumerable: true, get(){return nixScope["match"]("(.*)")(nixScope["name"]);}});
        return (operators.ifThenElse(operators.notEqual(nixScope["matchExt"], null), ()=>(nixScope["lib"]["head"](nixScope["matchExt"])), ()=>(nixScope["name"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "shrink", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "v", {enumerable: true, get(){return nixScope["f"](nixScope["x"]);}});
        return (operators.ifThenElse(operators.lessThan(nixScope["stringLength"](nixScope["v"]), nixScope["stringLength"](nixScope["x"])), ()=>(nixScope["shrink"](nixScope["f"])(nixScope["v"])), ()=>(nixScope["x"])));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return nixScope["shrink"](nixScope["removeExt"])(nixScope["base"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "shortRev", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "baseRev", {enumerable: true, get(){return nixScope["baseNameOf"]((nixScope["toString"](nixScope["rev"])));}});
        Object.defineProperty(nixScope, "matchHash", {enumerable: true, get(){return nixScope["match"]("[a-f0-9]+")(nixScope["baseRev"]);}});
        Object.defineProperty(nixScope, "matchVer", {enumerable: true, get(){return nixScope["match"]("([A-Za-z]+[-_. ]?)*(v)?([0-9.]+.*)")(nixScope["baseRev"]);}});
        return (operators.ifThenElse(operators.notEqual(nixScope["matchHash"], null), ()=>(nixScope["builtins"]["substring"](0n)(7n)(nixScope["baseRev"])), ()=>((operators.ifThenElse(operators.notEqual(nixScope["matchVer"], null), ()=>(nixScope["lib"]["last"](nixScope["matchVer"])), ()=>(nixScope["baseRev"]))))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "revOrTag", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tag"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.notEqual(nixScope["tag"], null), ()=>(nixScope["tag"]), ()=>((operators.ifThenElse(operators.notEqual(nixScope["rev"], null), ()=>(nixScope["rev"]), ()=>("HEAD")))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "repoRevToNameFull", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["repo_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rev_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["suffix_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "repo", {enumerable: true, get(){return nixScope["urlToName"](nixScope["repo_"]);}});
        Object.defineProperty(nixScope, "rev", {enumerable: true, get(){return (operators.ifThenElse(operators.notEqual(nixScope["rev_"], null), ()=>((new InterpolatedString(["-", ""], [()=>(nixScope["shortRev"](nixScope["rev_"]))]))), ()=>("")));}});
        Object.defineProperty(nixScope, "suffix", {enumerable: true, get(){return (operators.ifThenElse(operators.notEqual(nixScope["suffix_"], null), ()=>((new InterpolatedString(["-", ""], [()=>(nixScope["suffix_"])]))), ()=>("")));}});
        return (new InterpolatedString(["", "", "", "-source"], [()=>(nixScope["repo"]), ()=>(nixScope["rev"]), ()=>(nixScope["suffix"])]));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "repoRevToName", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["kind"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["kind"], "source"), ()=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["repo"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["suffix"] = arg; runtime.scopeStack.push(nixScope); try { return "source"; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ()=>((operators.ifThenElse(operators.equal(nixScope["kind"], "versioned"), ()=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["repo"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rev"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["suffix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["repoRevToNameFull"](nixScope["repo"])(nixScope["rev"])(null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ()=>((operators.ifThenElse(operators.equal(nixScope["kind"], "full"), ()=>(nixScope["repoRevToNameFull"]), ()=>(nixScope["throw"]("repoRevToName: invalid kind")))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return ({"pathType": nixScope["lib"]["warnIf"]((nixScope["lib"]["oldestSupportedReleaseIsAtLeast"](2305n)))("lib.sources.pathType has been moved to lib.filesystem.pathType.")(nixScope["lib"]["filesystem"]["pathType"]), "pathIsDirectory": nixScope["lib"]["warnIf"]((nixScope["lib"]["oldestSupportedReleaseIsAtLeast"](2305n)))("lib.sources.pathIsDirectory has been moved to lib.filesystem.pathIsDirectory.")(nixScope["lib"]["filesystem"]["pathIsDirectory"]), "pathIsRegularFile": nixScope["lib"]["warnIf"]((nixScope["lib"]["oldestSupportedReleaseIsAtLeast"](2305n)))("lib.sources.pathIsRegularFile has been moved to lib.filesystem.pathIsRegularFile.")(nixScope["lib"]["filesystem"]["pathIsRegularFile"]), "pathIsGitRepo": nixScope["pathIsGitRepo"], "commitIdFromGitRepo": nixScope["commitIdFromGitRepo"], "cleanSource": nixScope["cleanSource"], "cleanSourceWith": nixScope["cleanSourceWith"], "cleanSourceFilter": nixScope["cleanSourceFilter"], "pathHasContext": nixScope["pathHasContext"], "canCleanSource": nixScope["canCleanSource"], "urlToName": nixScope["urlToName"], "shortRev": nixScope["shortRev"], "revOrTag": nixScope["revOrTag"], "repoRevToName": nixScope["repoRevToName"], "sourceByRegex": nixScope["sourceByRegex"], "sourceFilesBySuffices": nixScope["sourceFilesBySuffices"], "trace": nixScope["trace"]});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })