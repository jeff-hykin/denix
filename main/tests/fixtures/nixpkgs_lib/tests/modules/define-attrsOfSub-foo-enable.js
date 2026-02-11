
export default (function(){
    const obj = {};
    if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
    if (obj["attrsOfSub"]["foo"] === undefined) obj["attrsOfSub"]["foo"] = {};
    obj["attrsOfSub"]["foo"]["enable"] = true;
    return obj;
})()