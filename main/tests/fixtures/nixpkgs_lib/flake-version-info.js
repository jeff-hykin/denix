import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//
//
//
//
//
//
//
(function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["finalLib"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prevLib"] = arg; runtime.scopeStack.push(nixScope); try { return ({"trivial": operators.merge(nixScope["prevLib"]["trivial"], ({"versionSuffix": (new InterpolatedString([".", ".", ""], [()=>(nixScope["finalLib"]["substring"](0n)(8n)((operators.selectOrDefault(nixScope["self"], ["lastModifiedDate"], "19700101")))), ()=>(operators.selectOrDefault(nixScope["self"], ["shortRev"], "dirty"))])), "revisionWithDefault": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["default"] = arg; runtime.scopeStack.push(nixScope); try { return operators.selectOrDefault(nixScope["self"], ["rev"], nixScope["default"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])