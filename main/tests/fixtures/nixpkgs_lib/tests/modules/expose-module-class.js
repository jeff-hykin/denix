
export default // args: {
//    _class,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": ({"foo": nixScope["lib"]["mkOption"](({"default": nixScope["_class"]}))})})
            ))