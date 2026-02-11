import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "toGNUCommandLineShell", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["options"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["escapeShellArgs"]((nixScope["toGNUCommandLine"](nixScope["options"])(nixScope["attrs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "toGNUCommandLine", {enumerable: true, get(){return 
    
    // args: {
    //    mkOptionName,
    //    mkBool,
    //    mkList,
    //    mkOption,
    //    optionValueSeparator,
    //    ,
    //}
    createFunc({"mkOptionName": (nixScope)=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["builtins"]["stringLength"](nixScope["k"]), 1n), ()=>((new InterpolatedString(["-", ""], [()=>(nixScope["k"])]))), ()=>((new InterpolatedString(["--", ""], [()=>(nixScope["k"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),"mkBool": (nixScope)=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["optional"](nixScope["v"])((nixScope["mkOptionName"](nixScope["k"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),"mkList": (nixScope)=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["concatMap"]((nixScope["mkOption"](nixScope["k"])))(nixScope["v"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),"mkOption": (nixScope)=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["v"], null), ()=>([]), ()=>((operators.ifThenElse(operators.equal(nixScope["optionValueSeparator"], null), ()=>([(nixScope["mkOptionName"](nixScope["k"])),(nixScope["lib"]["generators"]["mkValueStringDefault"]({})(nixScope["v"]))]), ()=>([(new InterpolatedString(["", "", "", ""], [()=>(nixScope["mkOptionName"](nixScope["k"])), ()=>(nixScope["optionValueSeparator"]), ()=>(nixScope["lib"]["generators"]["mkValueStringDefault"]({})(nixScope["v"]))]))])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),"optionValueSeparator": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["options"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "render", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["builtins"]["isBool"](nixScope["v"]), ()=>(nixScope["mkBool"](nixScope["k"])(nixScope["v"])), ()=>((operators.ifThenElse(nixScope["builtins"]["isList"](nixScope["v"]), ()=>(nixScope["mkList"](nixScope["k"])(nixScope["v"])), ()=>(nixScope["mkOption"](nixScope["k"])(nixScope["v"]))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return nixScope["builtins"]["concatLists"]((nixScope["lib"]["mapAttrsToList"](nixScope["render"])(nixScope["options"])));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))