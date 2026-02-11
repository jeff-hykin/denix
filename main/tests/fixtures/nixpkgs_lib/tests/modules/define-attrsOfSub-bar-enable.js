
export default (function(){
    const obj = {};
    if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
    if (obj["attrsOfSub"]["bar"] === undefined) obj["attrsOfSub"]["bar"] = {};
    obj["attrsOfSub"]["bar"]["enable"] = true;
    return obj;
})()