
export default // args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["_file"] = "optionTypeFile.nix";
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["theType"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["optionType"]}));
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["theOption"] = nixScope["lib"]["mkOption"](({"type": nixScope["config"]["theType"], "default": {}}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["theType"] = nixScope["lib"]["mkMerge"]([(nixScope["lib"]["types"]["submodule"]((function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["nested"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["int"]}));
        return obj;
    })())),(nixScope["lib"]["types"]["submodule"]((function(){
        const obj = {};
        obj["_file"] = "other.nix";
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["nested"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["str"]}));
        return obj;
    })()))]);
        return obj;
    })()
            ))