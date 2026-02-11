
export default (function(){
    const obj = {};
    if (obj["bare-submodule"] === undefined) obj["bare-submodule"] = {};
    obj["bare-submodule"]["nested"] = 42n;
    if (obj["bare-submodule"] === undefined) obj["bare-submodule"] = {};
    obj["bare-submodule"]["deep"] = 420n;
    return obj;
})()