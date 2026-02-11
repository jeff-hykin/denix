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
            nixScope["types"] = nixScope["lib"]["types"];
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["attrsOf"] = nixScope["types"]["attrsOf"];
            nixScope["listOf"] = nixScope["types"]["listOf"];
            nixScope["unique"] = nixScope["types"]["unique"];
            nixScope["nullOr"] = nixScope["types"]["nullOr"];
            nixScope["functionTo"] = nixScope["types"]["functionTo"];
            nixScope["coercedTo"] = nixScope["types"]["coercedTo"];
            nixScope["either"] = nixScope["types"]["either"];
            return ({"imports": [(
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["attrsWith"] = nixScope["mkOption"](({"type": nixScope["attrsOf"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedAttrsWith"] = nixScope["mkOption"](({"type": nixScope["attrsOf"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["listOf"] = nixScope["mkOption"](({"type": nixScope["listOf"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedListOf"] = nixScope["mkOption"](({"type": nixScope["listOf"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["unique"] = nixScope["mkOption"](({"type": nixScope["unique"](({"message": ""}))((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedUnique"] = nixScope["mkOption"](({"type": nixScope["unique"](({"message": ""}))((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["nullOr"] = nixScope["mkOption"](({"type": nixScope["nullOr"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedNullOr"] = nixScope["mkOption"](({"type": nixScope["nullOr"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["functionTo"] = nixScope["mkOption"](({"type": nixScope["functionTo"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedFunctionTo"] = nixScope["mkOption"](({"type": nixScope["functionTo"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["coercedTo"] = nixScope["mkOption"](({"type": nixScope["coercedTo"]((nixScope["listOf"](nixScope["types"]["str"])))(nixScope["lib"]["id"])((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["either"] = nixScope["mkOption"](({"type": nixScope["either"]((nixScope["listOf"](nixScope["types"]["str"])))((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedEither"] = nixScope["mkOption"](({"type": nixScope["either"]((nixScope["listOf"](nixScope["types"]["str"])))((nixScope["listOf"](nixScope["types"]["str"])))}));
            return obj;
        })()
                ))),(
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedAttrsWith"] = nixScope["mkOption"](({"type": nixScope["attrsOf"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedListOf"] = nixScope["mkOption"](({"type": nixScope["listOf"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedUnique"] = nixScope["mkOption"](({"type": nixScope["unique"](({"message": ""}))((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedNullOr"] = nixScope["mkOption"](({"type": nixScope["nullOr"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedFunctionTo"] = nixScope["mkOption"](({"type": nixScope["functionTo"]((nixScope["listOf"](nixScope["types"]["str"])))}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedEither"] = nixScope["mkOption"](({"type": nixScope["either"]((nixScope["listOf"](nixScope["types"]["str"])))((nixScope["listOf"](nixScope["types"]["str"])))}));
            return obj;
        })()
                )))]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))