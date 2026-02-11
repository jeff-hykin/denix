
export default // args: {
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["settingsDict"] === undefined) obj["settingsDict"] = {};
        obj["settingsDict"]["a"] = nixScope["config"]["settingsDict"]["b"];
        return obj;
    })()
            ))