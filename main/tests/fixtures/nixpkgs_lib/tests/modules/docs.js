import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /*
  A basic documentation generating module.
  Declares and defines a `docs` option, suitable for making assertions about
  the extraction "phase" of documentation generation.
*/

// args: {
//    lib,
//    options,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["head"] = nixScope["lib"]["head"];
            nixScope["length"] = nixScope["lib"]["length"];
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            Object.defineProperty(nixScope, "traceListSeq", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["l"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["traceSeq"](nixScope["b"])(nixScope["a"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["v"])(nixScope["l"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["docs"] = nixScope["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"](nixScope["types"]["raw"]), "description": `
          All options to be rendered, without any visibility filtering applied.
        `}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["docs"] = nixScope["lib"]["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["values"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.greaterThan(nixScope["length"](nixScope["values"]), 1n), ()=>(nixScope["traceListSeq"](nixScope["values"])(nixScope["abort"])((new InterpolatedString(["Multiple options with the same name: ", ""], [()=>(nixScope["name"])])))), ()=>(((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "length values == 1");
        }
        return nixScope["head"](nixScope["values"]);
    })(operators.equal(nixScope["length"](nixScope["values"]), 1n))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const obj = {};
        obj[nixScope["opt"]["name"]] = nixScope["opt"];
        return obj;
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["lib"]["optionAttrSetToDocList"](nixScope["options"])))));
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))