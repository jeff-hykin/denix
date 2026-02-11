
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": ({"value": nixScope["lib"]["mkOption"](({"default": "12", "type": nixScope["lib"]["types"]["coercedTo"](nixScope["lib"]["types"]["str"])(nixScope["lib"]["toInt"])(nixScope["lib"]["types"]["ints"]["s8"])}))})})
            ))