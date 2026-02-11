import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            return (function(){
        const obj = {};
        obj["imports"] = [(function(){
        const obj = {};
        if (obj["examples"] === undefined) obj["examples"] = {};
        obj["examples"]["merged"] = ({"b": "bee"});
        return obj;
    })(),(function(){
        const obj = {};
        if (obj["examples"] === undefined) obj["examples"] = {};
        obj["examples"]["override"] = nixScope["lib"]["mkForce"](({"b": "bee"}));
        return obj;
    })()];
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["examples"] = nixScope["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"]((nixScope["types"]["unique"](({"message": "We require a single definition, because seeing the whole value at once helps us maintain critical invariants of our system."}))((nixScope["types"]["attrsOf"](nixScope["types"]["str"])))))}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["examples"] = ({"merged": ({"a": "aye"}), "override": ({"a": "aye"}), "badLazyType": ({"a": true})});
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))