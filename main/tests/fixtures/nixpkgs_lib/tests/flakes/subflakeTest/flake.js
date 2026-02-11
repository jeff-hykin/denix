import { createRuntime, createFunc } from "../../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default ({"outputs": 

// args: {
//    self,
//    subflake,
//    callLocklessFlake,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "x", {enumerable: true, get(){return (nixScope["callLocklessFlake"](({"path": nixScope["subflake"], "inputs": {}})))["subflakeOutput"];}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))})