import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /* Helper function to implement a fallback for the bit operators
   `bitAnd`, `bitOr` and `bitXor` on older nix version.
   See ./trivial.nix
*/(function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "intToBits", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.or(operators.equal(nixScope["x"], 0n), operators.equal(nixScope["x"], -1n)), ()=>([]), ()=>((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "headbit", {enumerable: true, get(){return (operators.ifThenElse(operators.notEqual(operators.multiply((operators.divide(nixScope["x"], 2n)), 2n), nixScope["x"]), ()=>(1n), ()=>(0n)));}});
        Object.defineProperty(nixScope, "tailbits", {enumerable: true, get(){return (operators.ifThenElse(operators.lessThan(nixScope["x"], 0n), ()=>(operators.subtract((operators.divide((operators.add(nixScope["x"], 1n)), 2n)), 1n)), ()=>(operators.divide(nixScope["x"], 2n))));}});
        return operators.listConcat([nixScope["headbit"]], (nixScope["intToBits"](nixScope["tailbits"])));
    } finally {
        runtime.scopeStack.pop();
    }
})()))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "bitsToInt", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["l"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["signum"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["l"], []), ()=>(((operators.ifThenElse(operators.equal(nixScope["signum"], 0n), ()=>(0n), ()=>(-1n))))), ()=>(operators.add((nixScope["builtins"]["head"](nixScope["l"])), (operators.multiply(2n, (nixScope["bitsToInt"]((nixScope["builtins"]["tail"](nixScope["l"])))(nixScope["signum"])))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "xsignum", {enumerable: true, get(){return (operators.ifThenElse(operators.lessThan(nixScope["x"], 0n), ()=>(1n), ()=>(0n)));}});
        Object.defineProperty(nixScope, "ysignum", {enumerable: true, get(){return (operators.ifThenElse(operators.lessThan(nixScope["y"], 0n), ()=>(1n), ()=>(0n)));}});
        Object.defineProperty(nixScope, "zipListsWith'", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fst"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["snd"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(operators.equal(nixScope["fst"], []), operators.equal(nixScope["snd"], [])), ()=>([]), ()=>((operators.ifThenElse(operators.equal(nixScope["fst"], []), ()=>(operators.listConcat([(nixScope["f"](nixScope["xsignum"])((nixScope["builtins"]["head"](nixScope["snd"]))))], (nixScope["zipListsWith'"]([])((nixScope["builtins"]["tail"](nixScope["snd"])))))), ()=>((operators.ifThenElse(operators.equal(nixScope["snd"], []), ()=>(operators.listConcat([(nixScope["f"]((nixScope["builtins"]["head"](nixScope["fst"])))(nixScope["ysignum"]))], (nixScope["zipListsWith'"]((nixScope["builtins"]["tail"](nixScope["fst"])))([])))), ()=>(operators.listConcat([(nixScope["f"]((nixScope["builtins"]["head"](nixScope["fst"])))((nixScope["builtins"]["head"](nixScope["snd"]))))], (nixScope["zipListsWith'"]((nixScope["builtins"]["tail"](nixScope["fst"])))((nixScope["builtins"]["tail"](nixScope["snd"])))))))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "(builtins.isInt x) && (builtins.isInt y)");
    }
    return nixScope["bitsToInt"]((nixScope["zipListsWith'"]((nixScope["intToBits"](nixScope["x"])))((nixScope["intToBits"](nixScope["y"])))))((nixScope["f"](nixScope["xsignum"])(nixScope["ysignum"])));
})(operators.and((nixScope["builtins"]["isInt"](nixScope["x"])), (nixScope["builtins"]["isInt"](nixScope["y"]))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])