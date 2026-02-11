import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"freeformType": ((_withAttrs)=>{
        const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
        runtime.scopeStack.push(nixScope);
        try {
            return nixScope["attrsOf"]((nixScope["either"](nixScope["str"])((nixScope["attrsOf"](nixScope["str"])))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(nixScope["lib"]["types"])})
            ))