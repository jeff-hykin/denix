
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["imports"] = [(function(){
        const obj = {};
        obj["_file"] = "the-file.nix";
        if (obj["submodule"] === undefined) obj["submodule"] = {};
        obj["submodule"]["value"] = 10n;
        return obj;
    })()];
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["submodule"] = nixScope["lib"]["mkOption"](({"default": {}, "type": nixScope["lib"]["types"]["submoduleWith"](({"modules": [(
    
    // args: {
    //    options,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["value"] = nixScope["lib"]["mkOption"]({});
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["internalFiles"] = nixScope["lib"]["mkOption"](({"default": nixScope["options"]["value"]["files"]}));
            return obj;
        })()
                )))]}))}));
        return obj;
    })()
            ))