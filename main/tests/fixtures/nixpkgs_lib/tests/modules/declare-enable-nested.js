
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["set"] = ({"enable": nixScope["lib"]["mkOption"](({"default": false, "example": true, "type": nixScope["lib"]["types"]["bool"], "description": `
            Some descriptive text
          `}))});
        return obj;
    })()
            ))