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
        Object.defineProperty(nixScope, "commonH", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["hashTypes"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "hashNames", {enumerable: true, get(){return operators.listConcat(["hash"], nixScope["hashTypes"]);}});
        Object.defineProperty(nixScope, "hashSet", {enumerable: true, get(){return nixScope["lib"]["genAttrs"](nixScope["hashNames"])((nixScope["lib"]["const"]({})));}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "fakeH", {enumerable: true, get(){return ({"hash": nixScope["lib"]["fakeHash"], "sha256": nixScope["lib"]["fakeSha256"], "sha512": nixScope["lib"]["fakeSha512"]});}});
        return (function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    nixScope["proxyImpureEnvVars"] = ["http_proxy","https_proxy","ftp_proxy","all_proxy","no_proxy","HTTP_PROXY","HTTPS_PROXY","FTP_PROXY","ALL_PROXY","NO_PROXY","NIX_SSL_CERT_FILE"];
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "normalizeHash", {enumerable: true, get(){return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "hashTypes": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return ["sha256"]; })(),"required": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return true; })(),
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
        nixScope["concatMapStringsSep"] = nixScope["lib"]["concatMapStringsSep"];
        nixScope["head"] = nixScope["lib"]["head"];
        nixScope["tail"] = nixScope["lib"]["tail"];
        nixScope["throwIf"] = nixScope["lib"]["throwIf"];
        nixScope["attrsToList"] = nixScope["lib"]["attrsets"]["attrsToList"];
        nixScope["intersectAttrs"] = nixScope["lib"]["attrsets"]["intersectAttrs"];
        nixScope["removeAttrs"] = nixScope["lib"]["attrsets"]["removeAttrs"];
        nixScope["optionalAttrs"] = nixScope["lib"]["attrsets"]["optionalAttrs"];
        nixScope["hashNames"] = nixScope["commonH"](nixScope["hashTypes"])["hashNames"];
        nixScope["hashSet"] = nixScope["commonH"](nixScope["hashTypes"])["hashSet"];
        return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.hasAttr(nixScope["args"], "outputHash"), ()=>(nixScope["args"]), ()=>((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "h", {enumerable: true, get(){return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "hashesAsNVPairs", {enumerable: true, get(){return nixScope["attrsToList"]((nixScope["intersectAttrs"](nixScope["hashSet"])(nixScope["args"])));}});
        return (operators.ifThenElse(operators.equal(nixScope["hashesAsNVPairs"], []), ()=>(nixScope["throwIf"](nixScope["required"])("fetcher called without `hash`")(null)), ()=>((operators.ifThenElse(operators.notEqual(nixScope["tail"](nixScope["hashesAsNVPairs"]), []), ()=>(nixScope["throw"]((new InterpolatedString(["fetcher called with mutually-incompatible arguments: ", ""], [()=>(nixScope["concatMapStringsSep"](", ")(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["a"]["name"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["hashesAsNVPairs"]))])))), ()=>(nixScope["head"](nixScope["hashesAsNVPairs"])))))));
    } finally {
        runtime.scopeStack.pop();
    }
})();}});
        return operators.merge(nixScope["removeAttrs"](nixScope["args"])(nixScope["hashNames"]), (nixScope["optionalAttrs"]((operators.notEqual(nixScope["h"], null)))(({"outputHashAlgo": (operators.ifThenElse(operators.equal(nixScope["h"]["name"], "hash"), ()=>(null), ()=>(nixScope["h"]["name"]))), "outputHash": (operators.ifThenElse(operators.equal(nixScope["h"]["value"], ""), ()=>(operators.selectOrDefault(nixScope["fakeH"], [nixScope["h"]["name"]], (nixScope["throw"]((new InterpolatedString(["no “fake hash” defined for ", ""], [()=>(nixScope["h"]["name"])])))))), ()=>(nixScope["h"]["value"])))}))));
    } finally {
        runtime.scopeStack.pop();
    }
})()))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        Object.defineProperty(nixScope, "withNormalizedHash", {enumerable: true, get(){return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "hashTypes": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return ["sha256"]; })(),
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fetcher"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["intersectAttrs"] = nixScope["lib"]["attrsets"]["intersectAttrs"];
        nixScope["removeAttrs"] = nixScope["lib"]["attrsets"]["removeAttrs"];
        nixScope["functionArgs"] = nixScope["lib"]["trivial"]["functionArgs"];
        nixScope["setFunctionArgs"] = nixScope["lib"]["trivial"]["setFunctionArgs"];
        nixScope["hashSet"] = nixScope["commonH"](nixScope["hashTypes"])["hashSet"];
        Object.defineProperty(nixScope, "fArgs", {enumerable: true, get(){return nixScope["functionArgs"](nixScope["fetcher"]);}});
        Object.defineProperty(nixScope, "normalize", {enumerable: true, get(){return nixScope["normalizeHash"](({"hashTypes": nixScope["hashTypes"], "required": operators.negate(nixScope["fArgs"]["outputHash"])}));}});
        return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "fArgs ? outputHash && fArgs ? outputHashAlgo");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "intersectAttrs fArgs hashSet == { }");
    }
    return nixScope["setFunctionArgs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["fetcher"]((nixScope["normalize"](nixScope["args"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((operators.merge(nixScope["removeAttrs"](nixScope["fArgs"])(["outputHash","outputHashAlgo"]), ({"hash": nixScope["fArgs"]["outputHash"]}))));
})(operators.equal(nixScope["intersectAttrs"](nixScope["fArgs"])(nixScope["hashSet"]), {}));
})(operators.and(operators.hasAttr(nixScope["fArgs"], "outputHash"), operators.hasAttr(nixScope["fArgs"], "outputHashAlgo")));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})();
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })