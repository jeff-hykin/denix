import { createRuntime, createFunc } from "../../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["types"] = nixScope["lib"]["types"];
            return (function(){
        const obj = {};
        obj["options"] = ({"fun": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["functionTo"](nixScope["types"]["str"])})), "result": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["str"], "default": nixScope["config"]["fun"]("input")}))});
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["fun"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["input"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["input is ", ""], [()=>(nixScope["input"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))