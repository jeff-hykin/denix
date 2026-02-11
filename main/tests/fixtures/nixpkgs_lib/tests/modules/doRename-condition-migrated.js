
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
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "config.services.foo.bar == \"baz\"");
        }
        return true;
    })(operators.equal(nixScope["config"]["services"]["foo"]["bar"], "baz"));
    })(operators.equal(nixScope["config"]["services"]["foos"], ({"": ({"bar": "baz"})})));
        if (obj["services"] === undefined) obj["services"] = {};
        if (obj["services"]["foos"] === undefined) obj["services"]["foos"] = {};
        if (obj["services"]["foos"][""] === undefined) obj["services"]["foos"][""] = {};
        obj["services"]["foos"][""]["bar"] = "baz";
        return obj;
    })()})
            ))