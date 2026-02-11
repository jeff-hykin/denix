
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["config"] = nixScope["lib"]["mkMerge"]([(function(){
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["int"] = 0n;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["bool"] = false;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["string"] = "";
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["path"] = (new Path(["./."], []));
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["null"] = null;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["float"] = 0.1;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["list"] = [1n,"a",({"x": null})];
        return obj;
    })(),(function(){
        const obj = {};
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["int"] = 0n;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["bool"] = false;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["string"] = "";
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["path"] = (new Path(["./."], []));
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["null"] = null;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["float"] = 0.1;
        if (obj["value"] === undefined) obj["value"] = {};
        obj["value"]["list"] = [1n,"a",({"x": null})];
        return obj;
    })()]);
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["anything"]}));
        return obj;
    })()
            ))