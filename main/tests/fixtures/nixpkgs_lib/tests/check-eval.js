import { createRuntime } from "../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
(function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["tests"] = ["misc","systems"];
        Object.defineProperty(nixScope, "all", {enumerable: true, get(){return nixScope["builtins"]["concatLists"]((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["import"]((operators.add((new Path(["./."], [])), (new InterpolatedString(["/", ".nix"], [()=>(nixScope["f"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["tests"])));}});
        return (operators.ifThenElse(operators.equal(nixScope["all"], []), ()=>(null), ()=>(nixScope["throw"]((nixScope["builtins"]["toJSON"](nixScope["all"]))))));
    } finally {
        runtime.scopeStack.pop();
    }
})()