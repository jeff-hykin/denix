
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["submodule"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"]((function(){
        const obj = {};
        obj["modules"] = [(
    
    // args: {
    //    lib,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"default": nixScope["lib"]["foo"]}));
            return obj;
        })()
                )))];
        if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
        obj["specialArgs"]["lib"] = operators.merge(nixScope["lib"], ({"foo": "foo"}));
        return obj;
    })()), "default": {}}));
        return obj;
    })()
            ))