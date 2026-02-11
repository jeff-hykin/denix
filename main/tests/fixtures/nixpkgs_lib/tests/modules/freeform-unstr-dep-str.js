
export default // args: {
//    lib,
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["nullOr"](nixScope["lib"]["types"]["str"]), "default": null}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["foo"] = nixScope["lib"]["mkIf"]((operators.notEqual(nixScope["config"]["value"], null)))(nixScope["config"]["value"]);
        return obj;
    })()
            ))