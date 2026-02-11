import { createRuntime } from "../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "lib", {enumerable: true, get(){return nixScope["import"]((new Path(["../../.."], [])));}});
        Object.defineProperty(nixScope, "evaluation", {enumerable: true, get(){return nixScope["lib"]["evalModules"](({"modules": [{},((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return {}; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),(new Path(["./a.nix"], [])),(new Path(["./b.nix"], []))]}));}});
        Object.defineProperty(nixScope, "actual", {enumerable: true, get(){return nixScope["evaluation"]["graph"];}});
        Object.defineProperty(nixScope, "expected", {enumerable: true, get(){return [({"key": ":anon-1", "file": "<unknown-file>", "imports": [], "disabled": false}),({"key": ":anon-2", "file": "<unknown-file>", "imports": [], "disabled": false}),({"key": nixScope["toString"]((new Path(["./a.nix"], []))), "file": nixScope["toString"]((new Path(["./a.nix"], []))), "imports": [({"key": (new InterpolatedString(["", ":anon-1"], [()=>(nixScope["toString"]((new Path(["./a.nix"], []))))])), "file": nixScope["toString"]((new Path(["./a.nix"], []))), "imports": [({"key": (new InterpolatedString(["", ":anon-1:anon-1"], [()=>(nixScope["toString"]((new Path(["./a.nix"], []))))])), "file": nixScope["toString"]((new Path(["./a.nix"], []))), "imports": [], "disabled": false})], "disabled": false})], "disabled": false}),({"key": nixScope["toString"]((new Path(["./b.nix"], []))), "file": nixScope["toString"]((new Path(["./b.nix"], []))), "imports": [({"key": "explicit-key", "file": nixScope["toString"]((new Path(["./b.nix"], []))), "imports": [], "disabled": false})], "disabled": true})];}});
        return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "actual == expected");
    }
    return null;
})(operators.equal(nixScope["actual"], nixScope["expected"]));
    } finally {
        runtime.scopeStack.pop();
    }
})()