import { createRuntime, createFunc } from "../../../../../../../../../../../../../../../runtime.js"
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
            nixScope["types"] = nixScope["lib"]["types"];
            return (function(){
        const obj = {};
        obj["imports"] = [(
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"options": ({"fun": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["functionTo"]((nixScope["types"]["submodule"]((function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["a"] = nixScope["lib"]["mkOption"](({"default": "a"}));
            return obj;
        })())))}))})})
                ))),(
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"options": ({"fun": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["functionTo"]((nixScope["types"]["submodule"]((function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["b"] = nixScope["lib"]["mkOption"](({"default": "b"}));
            return obj;
        })())))}))})})
                )))];
        obj["options"] = ({"result": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["str"], "default": nixScope["lib"]["concatStringsSep"](" ")((nixScope["lib"]["attrValues"]((nixScope["config"]["fun"]((nixScope["throw"]("shouldn't use input param")))))))})), "optionsResult": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["str"], "default": nixScope["lib"]["concatStringsSep"](" ")((nixScope["lib"]["concatLists"]((nixScope["lib"]["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["k"], "_module"), ()=>([]), ()=>([(nixScope["lib"]["showOption"](nixScope["v"]["loc"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(((nixScope["options"]["fun"]["type"]["getSubOptions"](["fun"]))))))))}))});
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["fun"] = nixScope["lib"]["mkMerge"]([((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["input"] = arg; runtime.scopeStack.push(nixScope); try { return ({"b": "bee"}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))]);
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))