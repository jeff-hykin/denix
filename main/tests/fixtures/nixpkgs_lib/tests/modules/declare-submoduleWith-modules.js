
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["submodule"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"modules": [(function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["inner"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
        return obj;
    })()]})), "default": {}}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["submodule"] = nixScope["lib"]["mkMerge"]([(
    
    // args: {
    //    lib,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["outer"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
            return obj;
        })()
                ))),({"inner": true, "outer": true})]);
        return obj;
    })()
            ))