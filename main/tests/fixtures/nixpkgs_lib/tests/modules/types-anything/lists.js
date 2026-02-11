
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["config"] = nixScope["lib"]["mkMerge"]([({"value": ["a value"]}),({"value": ["another value"]})]);
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["anything"]}));
        return obj;
    })()
            ))