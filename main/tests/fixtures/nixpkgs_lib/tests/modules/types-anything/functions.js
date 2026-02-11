import { createRuntime, createFunc } from "../../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["config"] = nixScope["lib"]["mkMerge"]([(function(){
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["single-lambda"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["multiple-lambdas"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return ({"x": nixScope["x"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["merging-lambdas"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return ({"x": nixScope["x"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        return obj;
    })(),(function(){
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["multiple-lambdas"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return [nixScope["x"]]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["merging-lambdas"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return ({"y": nixScope["y"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        return obj;
    })()]);
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["valueIsFunction"] = nixScope["lib"]["mkOption"](({"default": nixScope["lib"]["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["isFunction"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["config"]["value"])}));
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["anything"]}));
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["applied"] = nixScope["lib"]["mkOption"](({"default": nixScope["lib"]["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fun"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["fun"](null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["config"]["value"])}));
        return obj;
    })()
            ))