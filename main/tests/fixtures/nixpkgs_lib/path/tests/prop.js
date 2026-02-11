import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//
//
//
//
//
//
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
        nixScope["normalise"] = nixScope["lib"]["path"]["subpath"]["normalise"];
        nixScope["isValid"] = nixScope["lib"]["path"]["subpath"]["isValid"];
        nixScope["assertMsg"] = nixScope["lib"]["asserts"]["assertMsg"];
        Object.defineProperty(nixScope, "lib", {enumerable: true, get(){return nixScope["import"](nixScope["libpath"]);}});
        Object.defineProperty(nixScope, "strings", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["readFile"]((operators.add(nixScope["dir"], (new InterpolatedString(["/", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["builtins"]["attrNames"]((nixScope["builtins"]["readDir"](nixScope["dir"])))));}});
        Object.defineProperty(nixScope, "normaliseAndCheck", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["str"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "originalValid", {enumerable: true, get(){return nixScope["isValid"](nixScope["str"]);}});
        Object.defineProperty(nixScope, "tryOnce", {enumerable: true, get(){return nixScope["builtins"]["tryEval"]((nixScope["normalise"](nixScope["str"])));}});
        Object.defineProperty(nixScope, "tryTwice", {enumerable: true, get(){return nixScope["builtins"]["tryEval"]((nixScope["normalise"](nixScope["tryOnce"]["value"])));}});
        Object.defineProperty(nixScope, "absConcatOrig", {enumerable: true, get(){return operators.add((new Path(["/."], [])), (operators.add("/", nixScope["str"])));}});
        Object.defineProperty(nixScope, "absConcatNormalised", {enumerable: true, get(){return operators.add((new Path(["/."], [])), (operators.add("/", nixScope["tryOnce"]["value"])));}});
        return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (\n      originalValid -> tryOnce.success\n    ) \"Even though string \\\"${str}\\\" is valid as a subpath, the normalisation for it failed\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (\n      !originalValid -> !tryOnce.success\n    ) \"Even though string \\\"${str}\\\" is invalid as a subpath, the normalisation for it succeeded\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (\n      originalValid -> tryTwice.success\n    ) \"For valid subpath \\\"${str}\\\", the normalisation \\\"${tryOnce.value}\\\" was not a valid subpath\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (originalValid -> tryOnce.value == tryTwice.value)\n      \"For valid subpath \\\"${str}\\\", normalising it once gives \\\"${tryOnce.value}\\\" but normalising it twice gives a different result: \\\"${tryTwice.value}\\\"\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (originalValid -> absConcatOrig == absConcatNormalised)\n      \"For valid subpath \\\"${str}\\\", appending to an absolute Nix path value gives \\\"${absConcatOrig}\\\", but appending the normalised result \\\"${tryOnce.value}\\\" gives a different value \\\"${absConcatNormalised}\\\"\"");
    }
    return (operators.ifThenElse(nixScope["tryOnce"]["success"], ()=>(nixScope["tryOnce"]["value"]), ()=>("")));
})(nixScope["assertMsg"]((operators.implication(nixScope["originalValid"], operators.equal(nixScope["absConcatOrig"], nixScope["absConcatNormalised"]))))((new InterpolatedString(["For valid subpath ", ", appending to an absolute Nix path value gives ", ", but appending the normalised result ", " gives a different value ", ""], [()=>(nixScope["str"]), ()=>(nixScope["absConcatOrig"]), ()=>(nixScope["tryOnce"]["value"]), ()=>(nixScope["absConcatNormalised"])]))));
})(nixScope["assertMsg"]((operators.implication(nixScope["originalValid"], operators.equal(nixScope["tryOnce"]["value"], nixScope["tryTwice"]["value"]))))((new InterpolatedString(["For valid subpath ", ", normalising it once gives ", " but normalising it twice gives a different result: ", ""], [()=>(nixScope["str"]), ()=>(nixScope["tryOnce"]["value"]), ()=>(nixScope["tryTwice"]["value"])]))));
})(nixScope["assertMsg"]((operators.implication(nixScope["originalValid"], nixScope["tryTwice"]["success"])))((new InterpolatedString(["For valid subpath ", ", the normalisation ", " was not a valid subpath"], [()=>(nixScope["str"]), ()=>(nixScope["tryOnce"]["value"])]))));
})(nixScope["assertMsg"]((operators.implication(operators.negate(nixScope["originalValid"]), operators.negate(nixScope["tryOnce"]["success"]))))((new InterpolatedString(["Even though string ", " is invalid as a subpath, the normalisation for it succeeded"], [()=>(nixScope["str"])]))));
})(nixScope["assertMsg"]((operators.implication(nixScope["originalValid"], nixScope["tryOnce"]["success"])))((new InterpolatedString(["Even though string ", " is valid as a subpath, the normalisation for it failed"], [()=>(nixScope["str"])]))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return nixScope["lib"]["genAttrs"](nixScope["strings"])(nixScope["normaliseAndCheck"]);
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })