import { createRuntime } from "./main/runtime.js"
const runtime = createRuntime()
//
//
({"greeting": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["name"] = "World";
        return (new InterpolatedString(["Hello, ", "!"], [()=>(nixScope["name"])]));
    } finally {
        runtime.scopeStack.pop();
    }
})(), "multiple": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["first"] = "John";
        nixScope["last"] = "Doe";
        return (new InterpolatedString(["", " ", ""], [()=>(nixScope["first"]), ()=>(nixScope["last"])]));
    } finally {
        runtime.scopeStack.pop();
    }
})(), "withExpr": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["x"] = 21n;
        return (new InterpolatedString(["The answer is ", ""], [()=>(nixScope["toString"]((operators.multiply(nixScope["x"], 2n))))]));
    } finally {
        runtime.scopeStack.pop();
    }
})(), "nested": (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["inner"] = "nested";
        return (new InterpolatedString(["This is ", " ", "polation"], [()=>(nixScope["inner"]), ()=>("inter")]));
    } finally {
        runtime.scopeStack.pop();
    }
})()})
