
export default (function(){
    const obj = {};
    if (obj["submodule"] === undefined) obj["submodule"] = {};
    obj["submodule"]["config"] = true;
    return obj;
})()