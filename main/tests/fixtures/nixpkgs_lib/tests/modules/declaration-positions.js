import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//    options,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "discardPositions", {enumerable: true, get(){return nixScope["lib"]["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
            return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "builtins.unsafeGetAttrPos \"a\" { a = true");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "builtins.unsafeGetAttrPos \"a\" (discardPositions {\n    a = true");
        }
        return (function(){
        const obj = {};
        obj["imports"] = [(function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        if (obj["options"]["imported"] === undefined) obj["options"]["imported"] = {};
        obj["options"]["imported"]["line14"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["int"]}));
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["generated"] = nixScope["discardPositions"](({"line22": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["int"]}))}));
        if (obj["options"] === undefined) obj["options"] = {};
        if (obj["options"]["submoduleLine38"] === undefined) obj["options"]["submoduleLine38"] = {};
        obj["options"]["submoduleLine38"]["extraOptLine27"] = nixScope["lib"]["mkOption"](({"default": 1n, "type": nixScope["lib"]["types"]["int"]}));
        return obj;
    })()];
        obj["config"] = (function(){
        const obj = {};
        if (obj["submoduleLine38"] === undefined) obj["submoduleLine38"] = {};
        obj["submoduleLine38"]["submodDeclLine45"] = (nixScope["options"]["submoduleLine38"]["type"]["getSubOptions"]([]))["submodDeclLine45"]["declarationPositions"];
        return obj;
    })();
        if (obj["options"] === undefined) obj["options"] = {};
        if (obj["options"]["nested"] === undefined) obj["options"]["nested"] = {};
        obj["options"]["nested"]["nestedLine34"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["int"]}));
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["submoduleLine38"] = nixScope["lib"]["mkOption"](({"default": {}, "type": nixScope["lib"]["types"]["submoduleWith"](({"modules": [(
    
    // args: {
    //    options,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["submodDeclLine45"] = nixScope["lib"]["mkOption"]({});
            return obj;
        })()
                ))),({"freeformType": ((_withAttrs)=>{
        const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
        runtime.scopeStack.push(nixScope);
        try {
            return nixScope["lazyAttrsOf"]((nixScope["uniq"](nixScope["unspecified"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(nixScope["lib"]["types"])})]}))}));
        return obj;
    })();
    })(operators.equal(nixScope["builtins"]["unsafeGetAttrPos"]("a")((nixScope["discardPositions"](({"a": true})))), null));
    })(operators.notEqual(nixScope["builtins"]["unsafeGetAttrPos"]("a")(({"a": true})), null));
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))