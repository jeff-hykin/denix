
export default (function(){
    const obj = {};
    if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
    obj["attrsOfSub"]["bar"] = {};
    return obj;
})()