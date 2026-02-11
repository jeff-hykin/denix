
export default // args: {
//    lib,
//    options,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"config": operators.merge(({"value": (operators.ifThenElse(operators.hasAttr(nixScope["options"], "enable"), ()=>(360n), ()=>(7n)))}), nixScope["lib"]["optionalAttrs"]((operators.hasAttr(nixScope["options"], "enable")))(({"enable": true})))})
            ))