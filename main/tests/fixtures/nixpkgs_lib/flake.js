import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default ({"description": "Library of low-level helper functions for nix expressions.", "outputs": 

// args: {
//    self,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "lib0", {enumerable: true, get(){return nixScope["import"]((new Path(["./."], [])));}});
            return ({"lib": nixScope["lib0"]["extend"]((nixScope["import"]((new Path(["./flake-version-info.nix"], [])))(nixScope["self"])))});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))})