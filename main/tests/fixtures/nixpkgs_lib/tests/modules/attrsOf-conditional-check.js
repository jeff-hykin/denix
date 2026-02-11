
export default // args: {
//    lib,
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["conditionalWorks"] = nixScope["lib"]["mkOption"](({"default": operators.negate(operators.hasAttr(nixScope["config"]["value"], "foo"))}));
        if (obj["config"] === undefined) obj["config"] = {};
        if (obj["config"]["value"] === undefined) obj["config"]["value"] = {};
        obj["config"]["value"]["foo"] = nixScope["lib"]["mkIf"](false)("should not be defined");
        return obj;
    })()
            ))