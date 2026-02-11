
export default // args: {
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"config": (function(){
        const obj = {};
        obj["result"] = ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.services.foos == {\n          \"\" = {\n            bar = \"baz\"");
        }
        return true;
    })(operators.equal(nixScope["config"]["services"]["foos"], ({"": ({"bar": "baz"})})));
        if (obj["services"] === undefined) obj["services"] = {};
        if (obj["services"]["foo"] === undefined) obj["services"]["foo"] = {};
        obj["services"]["foo"]["enable"] = true;
        if (obj["services"] === undefined) obj["services"] = {};
        if (obj["services"]["foo"] === undefined) obj["services"]["foo"] = {};
        obj["services"]["foo"]["bar"] = "baz";
        return obj;
    })()})
            ))