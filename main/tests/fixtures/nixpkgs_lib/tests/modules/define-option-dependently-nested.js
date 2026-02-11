
export default // args: {
//    lib,
//    options,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["set"] = operators.merge(({"value": (operators.ifThenElse(operators.hasAttrPath(nixScope["options"], "set", "enable"), ()=>(360n), ()=>(7n)))}), nixScope["lib"]["optionalAttrs"]((operators.hasAttrPath(nixScope["options"], "set", "enable")))(({"enable": true})));
        return obj;
    })()
            ))