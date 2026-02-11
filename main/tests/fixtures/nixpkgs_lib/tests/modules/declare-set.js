
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["set"] = nixScope["lib"]["mkOption"](({"default": {}, "example": ({"a": 1n}), "type": nixScope["lib"]["types"]["attrsOf"](nixScope["lib"]["types"]["int"]), "description": `
          Some descriptive text
        `}));
        return obj;
    })()
            ))