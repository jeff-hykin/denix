
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": ({"value": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["ints"]["positive"]}))})})
            ))