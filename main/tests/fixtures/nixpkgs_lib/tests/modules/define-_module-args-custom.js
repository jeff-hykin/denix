
export default // args: {

//}
createFunc({}, null, {}, (nixScope)=>(
                ({"config": (function(){
        const obj = {};
        if (obj["_module"] === undefined) obj["_module"] = {};
        if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
        obj["_module"]["args"]["custom"] = true;
        return obj;
    })()})
            ))