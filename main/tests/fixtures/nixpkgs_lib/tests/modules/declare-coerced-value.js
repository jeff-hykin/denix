
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": ({"value": nixScope["lib"]["mkOption"](({"default": 42n, "type": nixScope["lib"]["types"]["coercedTo"](nixScope["lib"]["types"]["int"])(nixScope["builtins"]["toString"])(nixScope["lib"]["types"]["str"])}))})})
            ))