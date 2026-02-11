
export default (function(){
    const obj = {};
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["enable"] = nixScope["abort"]("oops");
    return obj;
})()