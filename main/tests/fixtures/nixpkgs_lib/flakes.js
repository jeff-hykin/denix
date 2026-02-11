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
            Object.defineProperty(nixScope, "callLocklessFlake", {enumerable: true, get(){return 
    
    // args: {
    //    path,
    //    inputs,
    //}
    createFunc({"inputs": (nixScope)=>({}),}, null, {}, (nixScope)=>(
                    (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "self", {enumerable: true, get(){return operators.merge(({"outPath": nixScope["path"]}), ((nixScope["import"]((operators.add(nixScope["path"], "/flake.nix"))))["outputs"]((operators.merge(nixScope["inputs"], ({"self": nixScope["self"]}))))));}});
                return nixScope["self"];
            } finally {
                runtime.scopeStack.pop();
            }
        })()
                ));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))