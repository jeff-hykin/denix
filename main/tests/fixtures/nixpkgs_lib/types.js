
export default //
//
createFunc({}, null, {}, (nixScope)=>(
                /*let*/ createScope(nixScope=>{
            nixScope.elem = nixScope.lib["elem"];
            nixScope.flip = nixScope.lib["flip"];
            nixScope.isAttrs = nixScope.lib["isAttrs"];
            nixScope.isBool = nixScope.lib["isBool"];
            nixScope.isDerivation = nixScope.lib["isDerivation"];
            nixScope.isFloat = nixScope.lib["isFloat"];
            nixScope.isFunction = nixScope.lib["isFunction"];
            nixScope.isInt = nixScope.lib["isInt"];
            nixScope.isList = nixScope.lib["isList"];
            nixScope.isString = nixScope.lib["isString"];
            nixScope.isStorePath = nixScope.lib["isStorePath"];
            nixScope.throwIf = nixScope.lib["throwIf"];
            nixScope.toDerivation = nixScope.lib["toDerivation"];
            nixScope.toList = nixScope.lib["toList"];
            nixScope.all = nixScope.lib["lists"]["all"];
            nixScope.concatLists = nixScope.lib["lists"]["concatLists"];
            nixScope.count = nixScope.lib["lists"]["count"];
            nixScope.elemAt = nixScope.lib["lists"]["elemAt"];
            nixScope.filter = nixScope.lib["lists"]["filter"];
            nixScope["foldl'"] = nixScope.lib["lists"]["foldl'"];
            nixScope.head = nixScope.lib["lists"]["head"];
            nixScope.imap1 = nixScope.lib["lists"]["imap1"];
            nixScope.last = nixScope.lib["lists"]["last"];
            nixScope.length = nixScope.lib["lists"]["length"];
            nixScope.tail = nixScope.lib["lists"]["tail"];
            nixScope.attrNames = nixScope.lib["attrsets"]["attrNames"];
            nixScope.filterAttrs = nixScope.lib["attrsets"]["filterAttrs"];
            nixScope.hasAttr = nixScope.lib["attrsets"]["hasAttr"];
            nixScope.mapAttrs = nixScope.lib["attrsets"]["mapAttrs"];
            nixScope.optionalAttrs = nixScope.lib["attrsets"]["optionalAttrs"];
            nixScope.zipAttrsWith = nixScope.lib["attrsets"]["zipAttrsWith"];
            nixScope.getFiles = nixScope.lib["options"]["getFiles"];
            nixScope.getValues = nixScope.lib["options"]["getValues"];
            nixScope.mergeDefaultOption = nixScope.lib["options"]["mergeDefaultOption"];
            nixScope.mergeEqualOption = nixScope.lib["options"]["mergeEqualOption"];
            nixScope.mergeOneOption = nixScope.lib["options"]["mergeOneOption"];
            nixScope.mergeUniqueOption = nixScope.lib["options"]["mergeUniqueOption"];
            nixScope.showFiles = nixScope.lib["options"]["showFiles"];
            nixScope.showOption = nixScope.lib["options"]["showOption"];
            nixScope.concatMapStringsSep = nixScope.lib["strings"]["concatMapStringsSep"];
            nixScope.concatStringsSep = nixScope.lib["strings"]["concatStringsSep"];
            nixScope.escapeNixString = nixScope.lib["strings"]["escapeNixString"];
            nixScope.hasInfix = nixScope.lib["strings"]["hasInfix"];
            nixScope.isStringLike = nixScope.lib["strings"]["isStringLike"];
            nixScope.boolToString = nixScope.lib["trivial"]["boolToString"];
            nixScope.mergeDefinitions = nixScope.lib["modules"]["mergeDefinitions"];
            nixScope.fixupOptionType = nixScope.lib["modules"]["fixupOptionType"];
            nixScope.mergeOptionDecls = nixScope.lib["modules"]["mergeOptionDecls"];
            defGetter(nixScope, "inAttrPosSuffix", (nixScope) => createFunc(/*arg:*/ "v", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "name", null, {}, (nixScope)=>(
                        /*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "pos", (nixScope) => nixScope.builtins["unsafeGetAttrPos"](nixScope.name)(nixScope.v));
                return (operators.ifThenElse(operators.equal(nixScope.pos, null), ()=>(""), ()=>((new InterpolatedString([" at ", ":", ":", ""], [()=>(nixScope.pos["file"]), ()=>(nixScope.toString(nixScope.pos["line"])), ()=>(nixScope.toString(nixScope.pos["column"]))])))));
            })
                    ))
                )));
            defGetter(nixScope, "elemTypeFunctor", (nixScope) => createFunc(/*arg:*/ "name", null, {}, (nixScope)=>(
                    createFunc({}, "payload", {}, (nixScope)=>(
                        ({"name": nixScope.name, "payload": nixScope.payload, "wrappedDeprecationMessage": nixScope.makeWrappedDeprecationMessage(nixScope.payload), "type": nixScope.outer_types["types"][nixScope.name], "binOp": createFunc(/*arg:*/ "a", null, {}, (nixScope)=>(
                            createFunc(/*arg:*/ "b", null, {}, (nixScope)=>(
                                /*let*/ createScope(nixScope=>{
                            defGetter(nixScope, "merged", (nixScope) => nixScope.a["elemType"]["typeMerge"](nixScope.b["elemType"]["functor"]));
                        return (operators.ifThenElse(operators.equal(nixScope.merged, null), ()=>(null), ()=>(({"elemType": nixScope.merged}))));
                    })
                            ))
                        ))})
                    ))
                )));
            defGetter(nixScope, "makeWrappedDeprecationMessage", (nixScope) => createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                    createFunc({}, null, {}, (nixScope)=>(
                        nixScope.lib["warn"]((new InterpolatedString(["\n      The deprecated \\`", "functor.wrapped\\` attribute ", "is accessed, use \\`", "nestedTypes.elemType\\` instead.\n    "], [()=>(nixScope.lib["optionalString"]((operators.notEqual(nixScope.loc, null)))("type.")), ()=>(nixScope.lib["optionalString"]((operators.notEqual(nixScope.loc, null)))((new InterpolatedString(["of the option `", "` "], [()=>(nixScope.showOption(nixScope.loc))])))), ()=>(nixScope.lib["optionalString"]((operators.notEqual(nixScope.loc, null)))("type."))])))(nixScope.payload["elemType"])
                    ))
                )));
            defGetter(nixScope, "outer_types", (nixScope) => /*rec*/createScope(nixScope=>{
            defGetter(nixScope, "isType", (nixScope) => createFunc(/*arg:*/ "type", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                        operators.equal((operators.selectOrDefault(nixScope.x, ["_type"], "")), nixScope.type)
                    ))
                )));
            defGetter(nixScope, "setType", (nixScope) => createFunc(/*arg:*/ "typeName", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "value", null, {}, (nixScope)=>(
                        operators.merge(nixScope.value, ({"_type": nixScope.typeName}))
                    ))
                )));
            defGetter(nixScope, "defaultTypeMerge", (nixScope) => createFunc(/*arg:*/ "f", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "f'", null, {}, (nixScope)=>(
                        /*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "mergedWrapped", (nixScope) => nixScope.f["wrapped"]["typeMerge"](nixScope["f'"]["wrapped"]["functor"]));
                    defGetter(nixScope, "mergedPayload", (nixScope) => nixScope.f["binOp"](nixScope.f["payload"])(nixScope["f'"]["payload"]));
                    defGetter(nixScope, "hasPayload", (nixScope) => ((_cond)=>{
                if (!_cond) {
                    throw new Error("assertion failed: " + "(f'.payload != null) == (f.payload != null)");
                }
                return operators.notEqual(nixScope.f["payload"], null);
            })(operators.equal((operators.notEqual(nixScope["f'"]["payload"], null)), (operators.notEqual(nixScope.f["payload"], null)))));
                    defGetter(nixScope, "hasWrapped", (nixScope) => ((_cond)=>{
                if (!_cond) {
                    throw new Error("assertion failed: " + "(f'.wrapped != null) == (f.wrapped != null)");
                }
                return operators.notEqual(nixScope.f["wrapped"], null);
            })(operators.equal((operators.notEqual(nixScope["f'"]["wrapped"], null)), (operators.notEqual(nixScope.f["wrapped"], null)))));
                    defGetter(nixScope, "typeFromPayload", (nixScope) => (operators.ifThenElse(operators.equal(nixScope.mergedPayload, null), ()=>(null), ()=>(nixScope.f["type"](nixScope.mergedPayload)))));
                    defGetter(nixScope, "typeFromWrapped", (nixScope) => (operators.ifThenElse(operators.equal(nixScope.mergedWrapped, null), ()=>(null), ()=>(nixScope.f["type"](nixScope.mergedWrapped)))));
                return (operators.ifThenElse(operators.notEqual(nixScope.f["name"], nixScope["f'"]["name"]), ()=>(null), ()=>((operators.ifThenElse(nixScope.hasPayload, ()=>((operators.ifThenElse(operators.hasAttr(nixScope.f, "wrappedDeprecationMessage"), ()=>(nixScope.typeFromPayload), ()=>((operators.ifThenElse(nixScope.hasWrapped, ()=>(nixScope.throw((new InterpolatedString(["\n            Type ", " defines both \\`functor.payload\\` and \\`functor.wrapped\\` at the same time, which is not supported.\n\n            Use either \\`functor.payload\\` or \\`functor.wrapped\\` but not both.\n\n            If your code worked before remove either \\`functor.wrapped\\` or \\`functor.payload\\` from the type definition.\n          "], [()=>(nixScope.f["name"])])))), ()=>(nixScope.typeFromPayload))))))), ()=>((operators.ifThenElse(nixScope.hasWrapped, ()=>(nixScope.typeFromWrapped), ()=>(nixScope.f["type"])))))))));
            })
                    ))
                )));
            defGetter(nixScope, "defaultFunctor", (nixScope) => createFunc(/*arg:*/ "name", null, {}, (nixScope)=>(
                    ({"name": nixScope.name, "type": operators.selectOrDefault(nixScope.types, [nixScope.name], null), "wrapped": null, "payload": null, "binOp": createFunc(/*arg:*/ "a", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "b", null, {}, (nixScope)=>(
                            null
                        ))
                    ))})
                )));
            defGetter(nixScope, "isOptionType", (nixScope) => nixScope.isType("option-type"));
            defGetter(nixScope, "mkOptionType", (nixScope) => createFunc({"description": (nixScope)=>(null),"descriptionClass": (nixScope)=>(null),"check": (nixScope)=>((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    true
                )))),"merge": (nixScope)=>(nixScope.mergeDefaultOption),"emptyValue": (nixScope)=>({}),"getSubOptions": (nixScope)=>(createFunc(/*arg:*/ "prefix", null, {}, (nixScope)=>(
                    {}
                ))),"getSubModules": (nixScope)=>(null),"substSubModules": (nixScope)=>(createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                    null
                ))),"typeMerge": (nixScope)=>(nixScope.defaultTypeMerge(nixScope.functor)),"functor": (nixScope)=>(nixScope.defaultFunctor(nixScope.name)),"deprecationMessage": (nixScope)=>(null),"nestedTypes": (nixScope)=>({}),}, null, {}, (nixScope)=>(
                    ({"_type": "option-type", "name": nixScope.name, "check": nixScope.check, "merge": nixScope.merge, "emptyValue": nixScope.emptyValue, "getSubOptions": nixScope.getSubOptions, "getSubModules": nixScope.getSubModules, "substSubModules": nixScope.substSubModules, "typeMerge": nixScope.typeMerge, "deprecationMessage": nixScope.deprecationMessage, "nestedTypes": nixScope.nestedTypes, "descriptionClass": nixScope.descriptionClass, "functor": (operators.ifThenElse(operators.hasAttr(nixScope.functor, "wrappedDeprecationMessage"), ()=>(operators.merge(nixScope.functor, ({"wrapped": nixScope.functor["wrappedDeprecationMessage"](({"loc": null}))}))), ()=>(nixScope.functor))), "description": (operators.ifThenElse(operators.equal(nixScope.description, null), ()=>(nixScope.name), ()=>(nixScope.description)))})
                )));
            defGetter(nixScope, "optionDescriptionPhrase", (nixScope) => createFunc(/*arg:*/ "unparenthesize", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "t", null, {}, (nixScope)=>(
                        (operators.ifThenElse(nixScope.unparenthesize((operators.selectOrDefault(nixScope.t, ["descriptionClass"], null))), ()=>(nixScope.t["description"]), ()=>((new InterpolatedString(["(", ")"], [()=>(nixScope.t["description"])])))))
                    ))
                )));
            defGetter(nixScope, "noCheckForDocsModule", (nixScope) => createScope(nixScope=>{
        const obj = {};
        obj._file = "<built-in module that disables checks for the purpose of documentation generation>";
        if (obj["config"] === undefined) obj["config"] = {};
        if (obj["config"]["_module"] === undefined) obj["config"]["_module"] = {};
        obj["config"]["_module"]["check"] = nixScope.lib["mkForce"](false);
        return obj;
    }));
            defGetter(nixScope, "types", (nixScope) => /*rec*/createScope(nixScope=>{
            defGetter(nixScope, "raw", (nixScope) => nixScope.mkOptionType(({"name": "raw", "description": "raw value", "descriptionClass": "noun", "check": createFunc(/*arg:*/ "value", null, {}, (nixScope)=>(
                    true
                )), "merge": nixScope.mergeOneOption})));
            defGetter(nixScope, "anything", (nixScope) => nixScope.mkOptionType(({"name": "anything", "description": "anything", "descriptionClass": "noun", "check": createFunc(/*arg:*/ "value", null, {}, (nixScope)=>(
                    true
                )), "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                        /*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "getType", (nixScope) => createFunc(/*arg:*/ "value", null, {}, (nixScope)=>(
                            (operators.ifThenElse(operators.and(nixScope.isAttrs(nixScope.value), nixScope.isStringLike(nixScope.value)), ()=>("stringCoercibleSet"), ()=>(nixScope.builtins["typeOf"](nixScope.value))))
                        )));
                    defGetter(nixScope, "commonType", (nixScope) => nixScope["foldl'"]((createFunc(/*arg:*/ "type", null, {}, (nixScope)=>(
                            createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                (operators.ifThenElse(operators.equal(nixScope.getType(nixScope.def["value"]), nixScope.type), ()=>(nixScope.type), ()=>(nixScope.throw((new InterpolatedString(["The option `", "' has conflicting option types in ", ""], [()=>(nixScope.showOption(nixScope.loc)), ()=>(nixScope.showFiles((nixScope.getFiles(nixScope.defs))))]))))))
                            ))
                        ))))((nixScope.getType((nixScope.head(nixScope.defs))["value"])))(nixScope.defs));
                    defGetter(nixScope, "mergeFunction", (nixScope) => operators.selectOrDefault(({"set": (nixScope.attrsOf(nixScope.anything))["merge"], "stringCoercibleSet": nixScope.mergeOneOption, "lambda": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                            createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "arg", null, {}, (nixScope)=>(
                                    nixScope.anything["merge"]((operators.listConcat(nixScope.loc, ["<function body>"])))((nixScope.map((createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                        ({"file": nixScope.def["file"], "value": nixScope.def["value"](nixScope.arg)})
                                    ))))(nixScope.defs)))
                                ))
                            ))
                        ))}), [nixScope.commonType], nixScope.mergeEqualOption));
                return nixScope.mergeFunction(nixScope.loc)(nixScope.defs);
            })
                    ))
                ))})));
            defGetter(nixScope, "unspecified", (nixScope) => nixScope.mkOptionType(({"name": "unspecified", "description": "unspecified value", "descriptionClass": "noun"})));
            defGetter(nixScope, "bool", (nixScope) => nixScope.mkOptionType(({"name": "bool", "description": "boolean", "descriptionClass": "noun", "check": nixScope.isBool, "merge": nixScope.mergeEqualOption})));
            defGetter(nixScope, "boolByOr", (nixScope) => nixScope.mkOptionType(({"name": "boolByOr", "description": "boolean (merged using or)", "descriptionClass": "noun", "check": nixScope.isBool, "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                        nixScope["foldl'"]((createFunc(/*arg:*/ "result", null, {}, (nixScope)=>(
                            createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                operators.or(nixScope.result, nixScope.def["value"])
                            ))
                        ))))(false)(nixScope.defs)
                    ))
                ))})));
            defGetter(nixScope, "int", (nixScope) => nixScope.mkOptionType(({"name": "int", "description": "signed integer", "descriptionClass": "noun", "check": nixScope.isInt, "merge": nixScope.mergeEqualOption})));
            defGetter(nixScope, "ints", (nixScope) => /*let*/ createScope(nixScope=>{
            defGetter(nixScope, "betweenDesc", (nixScope) => createFunc(/*arg:*/ "lowest", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "highest", null, {}, (nixScope)=>(
                        (new InterpolatedString(["", " and ", " (both inclusive)"], [()=>(nixScope.toString(nixScope.lowest)), ()=>(nixScope.toString(nixScope.highest))]))
                    ))
                )));
            defGetter(nixScope, "between", (nixScope) => createFunc(/*arg:*/ "lowest", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "highest", null, {}, (nixScope)=>(
                        ((_cond)=>{
                if (!_cond) {
                    throw new Error("assertion failed: " + "lib.assertMsg (lowest <= highest) \"ints.between: lowest must be smaller than highest\"");
                }
                return operators.merge(nixScope.addCheck(nixScope.int)((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                            operators.and(operators.greaterThanOrEqual(nixScope.x, nixScope.lowest), operators.lessThanOrEqual(nixScope.x, nixScope.highest))
                        )))), ({"name": "intBetween", "description": (new InterpolatedString(["integer between ", ""], [()=>(nixScope.betweenDesc(nixScope.lowest)(nixScope.highest))]))}));
            })(nixScope.lib["assertMsg"]((operators.lessThanOrEqual(nixScope.lowest, nixScope.highest)))("ints.between: lowest must be smaller than highest"))
                    ))
                )));
            defGetter(nixScope, "ign", (nixScope) => createFunc(/*arg:*/ "lowest", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "highest", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "name", null, {}, (nixScope)=>(
                            createFunc(/*arg:*/ "docStart", null, {}, (nixScope)=>(
                                operators.merge(nixScope.between(nixScope.lowest)(nixScope.highest), ({"name": nixScope.name, "description": operators.add(nixScope.docStart, (new InterpolatedString(["; between ", ""], [()=>(nixScope.betweenDesc(nixScope.lowest)(nixScope.highest))])))}))
                            ))
                        ))
                    ))
                )));
            defGetter(nixScope, "unsign", (nixScope) => createFunc(/*arg:*/ "bit", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "range", null, {}, (nixScope)=>(
                        nixScope.ign(0n)((operators.subtract(nixScope.range, 1n)))((new InterpolatedString(["unsignedInt", ""], [()=>(nixScope.toString(nixScope.bit))])))((new InterpolatedString(["", " bit unsigned integer"], [()=>(nixScope.toString(nixScope.bit))])))
                    ))
                )));
            defGetter(nixScope, "sign", (nixScope) => createFunc(/*arg:*/ "bit", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "range", null, {}, (nixScope)=>(
                        nixScope.ign((operators.subtract(0n, (operators.divide(nixScope.range, 2n)))))((operators.subtract(operators.divide(nixScope.range, 2n), 1n)))((new InterpolatedString(["signedInt", ""], [()=>(nixScope.toString(nixScope.bit))])))((new InterpolatedString(["", " bit signed integer"], [()=>(nixScope.toString(nixScope.bit))])))
                    ))
                )));
        return ({"between": nixScope.between, "unsigned": operators.merge(nixScope.addCheck(nixScope.types["int"])((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.greaterThanOrEqual(nixScope.x, 0n)
                )))), ({"name": "unsignedInt", "description": "unsigned integer, meaning >=0", "descriptionClass": "nonRestrictiveClause"})), "positive": operators.merge(nixScope.addCheck(nixScope.types["int"])((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.greaterThan(nixScope.x, 0n)
                )))), ({"name": "positiveInt", "description": "positive integer, meaning >0", "descriptionClass": "nonRestrictiveClause"})), "u8": nixScope.unsign(8n)(256n), "u16": nixScope.unsign(16n)(65536n), "u32": nixScope.unsign(32n)(4294967296n), "s8": nixScope.sign(8n)(256n), "s16": nixScope.sign(16n)(65536n), "s32": nixScope.sign(32n)(4294967296n)});
    }));
            defGetter(nixScope, "port", (nixScope) => nixScope.ints["u16"]);
            defGetter(nixScope, "float", (nixScope) => nixScope.mkOptionType(({"name": "float", "description": "floating point number", "descriptionClass": "noun", "check": nixScope.isFloat, "merge": nixScope.mergeEqualOption})));
            defGetter(nixScope, "number", (nixScope) => nixScope.either(nixScope.int)(nixScope.float));
            defGetter(nixScope, "numbers", (nixScope) => /*let*/ createScope(nixScope=>{
            defGetter(nixScope, "betweenDesc", (nixScope) => createFunc(/*arg:*/ "lowest", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "highest", null, {}, (nixScope)=>(
                        (new InterpolatedString(["", " and ", " (both inclusive)"], [()=>(nixScope.builtins["toJSON"](nixScope.lowest)), ()=>(nixScope.builtins["toJSON"](nixScope.highest))]))
                    ))
                )));
        return ({"between": createFunc(/*arg:*/ "lowest", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "highest", null, {}, (nixScope)=>(
                        ((_cond)=>{
                if (!_cond) {
                    throw new Error("assertion failed: " + "lib.assertMsg (lowest <= highest) \"numbers.between: lowest must be smaller than highest\"");
                }
                return operators.merge(nixScope.addCheck(nixScope.number)((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                            operators.and(operators.greaterThanOrEqual(nixScope.x, nixScope.lowest), operators.lessThanOrEqual(nixScope.x, nixScope.highest))
                        )))), ({"name": "numberBetween", "description": (new InterpolatedString(["integer or floating point number between ", ""], [()=>(nixScope.betweenDesc(nixScope.lowest)(nixScope.highest))]))}));
            })(nixScope.lib["assertMsg"]((operators.lessThanOrEqual(nixScope.lowest, nixScope.highest)))("numbers.between: lowest must be smaller than highest"))
                    ))
                )), "nonnegative": operators.merge(nixScope.addCheck(nixScope.number)((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.greaterThanOrEqual(nixScope.x, 0n)
                )))), ({"name": "numberNonnegative", "description": "nonnegative integer or floating point number, meaning >=0", "descriptionClass": "nonRestrictiveClause"})), "positive": operators.merge(nixScope.addCheck(nixScope.number)((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.greaterThan(nixScope.x, 0n)
                )))), ({"name": "numberPositive", "description": "positive integer or floating point number, meaning >0", "descriptionClass": "nonRestrictiveClause"}))});
    }));
            defGetter(nixScope, "str", (nixScope) => nixScope.mkOptionType(({"name": "str", "description": "string", "descriptionClass": "noun", "check": nixScope.isString, "merge": nixScope.mergeEqualOption})));
            defGetter(nixScope, "nonEmptyStr", (nixScope) => nixScope.mkOptionType(createScope(nixScope=>{
        const obj = {};
            obj.name = "nonEmptyStr";
            obj.description = "non-empty string";
            obj.descriptionClass = "noun";
            obj.check = createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.and(nixScope.str["check"](nixScope.x), operators.equal(nixScope.builtins["match"]("[ ")(nixScope.x), null))
                ));
            obj.merge = nixScope.str.merge
        return obj;
    })));
            defGetter(nixScope, "singleLineStr", (nixScope) => /*let*/ createScope(nixScope=>{
            nixScope.check = nixScope.strMatching("[^")["check"];
            nixScope.merge = nixScope.strMatching("[^")["merge"];
        return nixScope.mkOptionType(({"name": "singleLineStr", "description": "(optionally newline-terminated) single-line string", "descriptionClass": "noun", "check": nixScope.check, "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                        nixScope.lib["removeSuffix"]("")((nixScope.merge(nixScope.loc)(nixScope.defs)))
                    ))
                ))}));
    }));
            defGetter(nixScope, "strMatching", (nixScope) => createFunc(/*arg:*/ "pattern", null, {}, (nixScope)=>(
                    nixScope.mkOptionType(createScope(nixScope=>{
            const obj = {};
                obj.name = (new InterpolatedString(["strMatching ", ""], [()=>(nixScope.escapeNixString(nixScope.pattern))]));
                obj.description = (new InterpolatedString(["string matching the pattern ", ""], [()=>(nixScope.pattern)]));
                obj.descriptionClass = "noun";
                obj.check = createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                        operators.and(nixScope.str["check"](nixScope.x), operators.notEqual(nixScope.builtins["match"](nixScope.pattern)(nixScope.x), null))
                    ));
                obj.merge = nixScope.str.merge
                obj.functor = operators.merge(nixScope.defaultFunctor("strMatching"), ({"type": createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                        nixScope.strMatching(nixScope.payload["pattern"])
                    )), "payload": ({"pattern": nixScope.pattern}), "binOp": createFunc(/*arg:*/ "lhs", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "rhs", null, {}, (nixScope)=>(
                            (operators.ifThenElse(operators.equal(nixScope.lhs, nixScope.rhs), ()=>(nixScope.lhs), ()=>(null)))
                        ))
                    ))}));
            return obj;
        }))
                )));
            defGetter(nixScope, "separatedString", (nixScope) => createFunc(/*arg:*/ "sep", null, {}, (nixScope)=>(
                    nixScope.mkOptionType(/*rec*/createScope(nixScope=>{
            nixScope.name = "separatedString";
            nixScope.descriptionClass = "noun";
                defGetter(nixScope, "description", (nixScope) => (operators.ifThenElse(operators.equal(nixScope.sep, ""), ()=>("Concatenated string"), ()=>((new InterpolatedString(["strings concatenated with ", ""], [()=>(nixScope.builtins["toJSON"](nixScope.sep))]))))));
                defGetter(nixScope, "check", (nixScope) => nixScope.isString);
                defGetter(nixScope, "merge", (nixScope) => createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            nixScope.concatStringsSep(nixScope.sep)((nixScope.getValues(nixScope.defs)))
                        ))
                    )));
                defGetter(nixScope, "functor", (nixScope) => operators.merge((nixScope.defaultFunctor(nixScope.name)), ({"payload": ({"sep": nixScope.sep}), "type": createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                        nixScope.types["separatedString"](nixScope.payload["sep"])
                    )), "binOp": createFunc(/*arg:*/ "lhs", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "rhs", null, {}, (nixScope)=>(
                            (operators.ifThenElse(operators.equal(nixScope.lhs["sep"], nixScope.rhs["sep"]), ()=>(createScope(nixScope=>{
                    const obj = {};
                        obj.sep = nixScope.lhs.sep
                    return obj;
                })), ()=>(null)))
                        ))
                    ))})));
                return nixScope;
        }))
                )));
            defGetter(nixScope, "lines", (nixScope) => nixScope.separatedString(""));
            defGetter(nixScope, "commas", (nixScope) => nixScope.separatedString(","));
            defGetter(nixScope, "envVar", (nixScope) => nixScope.separatedString(":"));
            defGetter(nixScope, "string", (nixScope) => nixScope.lib["warn"]("The type `types.string` is deprecated. See https://github.com/NixOS/nixpkgs/pull/66346 for better alternative types.")((operators.merge(nixScope.separatedString(""), ({"name": "string"})))));
            defGetter(nixScope, "passwdEntry", (nixScope) => createFunc(/*arg:*/ "entryType", null, {}, (nixScope)=>(
                    operators.merge(nixScope.addCheck(nixScope.entryType)((createFunc(/*arg:*/ "str", null, {}, (nixScope)=>(
                        operators.negate((operators.or(nixScope.hasInfix(":")(nixScope.str), nixScope.hasInfix("")(nixScope.str))))
                    )))), ({"name": (new InterpolatedString(["passwdEntry ", ""], [()=>(nixScope.entryType["name"])])), "description": (new InterpolatedString(["", ", not containing newlines or colons"], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                        operators.equal(nixScope.class, "noun")
                    ))))(nixScope.entryType))])), "descriptionClass": "nonRestrictiveClause"}))
                )));
            defGetter(nixScope, "attrs", (nixScope) => nixScope.mkOptionType(({"name": "attrs", "description": "attribute set", "check": nixScope.isAttrs, "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                    nixScope["foldl'"]((createFunc(/*arg:*/ "res", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                            operators.merge(nixScope.res, nixScope.def["value"])
                        ))
                    ))))({})
                )), "emptyValue": ({"value": {}})})));
            defGetter(nixScope, "package", (nixScope) => nixScope.mkOptionType(({"name": "package", "descriptionClass": "noun", "check": createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.or(nixScope.isDerivation(nixScope.x), nixScope.isStorePath(nixScope.x))
                )), "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                        /*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "res", (nixScope) => nixScope.mergeOneOption(nixScope.loc)(nixScope.defs));
                return (operators.ifThenElse(operators.or(nixScope.builtins["isPath"](nixScope.res), (operators.and(nixScope.builtins["isString"](nixScope.res), operators.negate(nixScope.builtins["hasContext"](nixScope.res))))), ()=>(nixScope.toDerivation(nixScope.res)), ()=>(nixScope.res)));
            })
                    ))
                ))})));
            defGetter(nixScope, "shellPackage", (nixScope) => operators.merge(nixScope.package, ({"check": createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.and(nixScope.isDerivation(nixScope.x), nixScope.hasAttr("shellPath")(nixScope.x))
                ))})));
            defGetter(nixScope, "pkgs", (nixScope) => nixScope.addCheck((operators.merge(nixScope.unique(({"message": "A Nixpkgs pkgs set can not be merged with another pkgs set."}))(nixScope.attrs), ({"name": "pkgs", "descriptionClass": "noun", "description": "Nixpkgs package set"}))))((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.equal((operators.selectOrDefault(nixScope.x, ["_type"], null)), "pkgs")
                )))));
            defGetter(nixScope, "path", (nixScope) => nixScope.pathWith(({"absolute": true})));
            defGetter(nixScope, "pathInStore", (nixScope) => nixScope.pathWith(({"inStore": true})));
            defGetter(nixScope, "pathWith", (nixScope) => createFunc({"inStore": (nixScope)=>(null),"absolute": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                    nixScope.throwIf((operators.and(operators.and(operators.and(operators.notEqual(nixScope.inStore, null), operators.notEqual(nixScope.absolute, null)), nixScope.inStore), operators.negate(nixScope.absolute))))("In pathWith, inStore means the path must be absolute")(nixScope.mkOptionType)(({"name": "path", "description": (operators.add(operators.add(((operators.ifThenElse(operators.equal(nixScope.absolute, null), ()=>(""), ()=>(((operators.ifThenElse(nixScope.absolute, ()=>("absolute "), ()=>("relative ")))))))), "path"), ((operators.ifThenElse(operators.equal(nixScope.inStore, null), ()=>(""), ()=>(((operators.ifThenElse(nixScope.inStore, ()=>(" in the Nix store"), ()=>(" not in the Nix store")))))))))), "descriptionClass": "noun", "merge": nixScope.mergeEqualOption, "functor": operators.merge(nixScope.defaultFunctor("path"), ({"type": nixScope.pathWith, "payload": ({"inStore": nixScope.inStore, "absolute": nixScope.absolute}), "binOp": createFunc(/*arg:*/ "lhs", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "rhs", null, {}, (nixScope)=>(
                            (operators.ifThenElse(operators.equal(nixScope.lhs, nixScope.rhs), ()=>(nixScope.lhs), ()=>(null)))
                        ))
                    ))})), "check": createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                        /*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "isInStore", (nixScope) => nixScope.lib["path"]["hasStorePathPrefix"](((operators.ifThenElse(nixScope.builtins["isPath"](nixScope.x), ()=>(nixScope.x), ()=>(operators.add((new Path(["/."], [])), nixScope.builtins["unsafeDiscardStringContext"](nixScope.x))))))));
                    defGetter(nixScope, "isAbsolute", (nixScope) => operators.equal(nixScope.builtins["substring"](0n)(1n)((nixScope.toString(nixScope.x))), "/"));
                    defGetter(nixScope, "isExpectedType", (nixScope) => ((operators.ifThenElse(operators.or(operators.equal(nixScope.inStore, null), nixScope.inStore), ()=>(nixScope.isStringLike(nixScope.x)), ()=>(nixScope.isString(nixScope.x))))));
                return operators.and(operators.and(nixScope.isExpectedType, (operators.or(operators.equal(nixScope.inStore, null), operators.equal(nixScope.inStore, nixScope.isInStore)))), (operators.or(operators.equal(nixScope.absolute, null), operators.equal(nixScope.absolute, nixScope.isAbsolute))));
            })
                    ))}))
                )));
            defGetter(nixScope, "listOf", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    nixScope.mkOptionType(/*rec*/createScope(nixScope=>{
            nixScope.nestedTypes = {};
            nixScope.name = "listOf";
            nixScope.description = (new InterpolatedString(["list of ", ""], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                        operators.or(operators.equal(nixScope.class, "noun"), operators.equal(nixScope.class, "composite"))
                    ))))(nixScope.elemType))]));
            nixScope.descriptionClass = "composite";
            nixScope.emptyValue = ({"value": []});
            .nestedTypes["elemType"] = nixScope.elemType;
                defGetter(nixScope, "check", (nixScope) => nixScope.isList);
                defGetter(nixScope, "merge", (nixScope) => createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            nixScope.map((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                                nixScope.x["value"]
                            ))))((nixScope.filter((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                                operators.hasAttr(nixScope.x, "value")
                            ))))((nixScope.concatLists((nixScope.imap1((createFunc(/*arg:*/ "n", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                    nixScope.imap1((createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                                        createFunc(/*arg:*/ "def'", null, {}, (nixScope)=>(
                                            (nixScope.mergeDefinitions((operators.listConcat(nixScope.loc, [(new InterpolatedString(["[definition ", "-entry ", "]"], [()=>(nixScope.toString(nixScope.n)), ()=>(nixScope.toString(nixScope.m))]))])))(nixScope.elemType)([createScope(nixScope=>{
                                    const obj = {};
                                        obj.file = nixScope.def.file
                                        obj.value = nixScope["def'"];
                                    return obj;
                                })]))["optionalValue"]
                                        ))
                                    ))))(nixScope.def["value"])
                                ))
                            ))))(nixScope.defs)))))))
                        ))
                    )));
                defGetter(nixScope, "getSubOptions", (nixScope) => createFunc(/*arg:*/ "prefix", null, {}, (nixScope)=>(
                        nixScope.elemType["getSubOptions"]((operators.listConcat(nixScope.prefix, ["*"])))
                    )));
                defGetter(nixScope, "getSubModules", (nixScope) => nixScope.elemType["getSubModules"]);
                defGetter(nixScope, "substSubModules", (nixScope) => createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                        nixScope.listOf((nixScope.elemType["substSubModules"](nixScope.m)))
                    )));
                defGetter(nixScope, "functor", (nixScope) => operators.merge((nixScope.elemTypeFunctor(nixScope.name)(({"elemType": nixScope.elemType}))), ({"type": createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                        nixScope.types["listOf"](nixScope.payload["elemType"])
                    ))})));
                return nixScope;
        }))
                )));
            defGetter(nixScope, "nonEmptyListOf", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    /*let*/ createScope(nixScope=>{
                defGetter(nixScope, "list", (nixScope) => nixScope.addCheck((nixScope.types["listOf"](nixScope.elemType)))((createFunc(/*arg:*/ "l", null, {}, (nixScope)=>(
                        operators.notEqual(nixScope.l, [])
                    )))));
            return operators.merge(nixScope.list, ({"description": (new InterpolatedString(["non-empty ", ""], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                        operators.equal(nixScope.class, "noun")
                    ))))(nixScope.list))])), "emptyValue": {}, "substSubModules": createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                        nixScope.nonEmptyListOf((nixScope.elemType["substSubModules"](nixScope.m)))
                    ))}));
        })
                )));
            defGetter(nixScope, "attrsOf", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    nixScope.attrsWith(({"elemType": nixScope.elemType}))
                )));
            defGetter(nixScope, "lazyAttrsOf", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    nixScope.attrsWith(({"elemType": nixScope.elemType, "lazy": true}))
                )));
            defGetter(nixScope, "attrsWith", (nixScope) => /*let*/ createScope(nixScope=>{
            defGetter(nixScope, "pushPositions", (nixScope) => nixScope.map((createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                    nixScope.mapAttrs((createFunc(/*arg:*/ "n", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "v", null, {}, (nixScope)=>(
                            createScope(nixScope=>{
                    const obj = {};
                        obj.file = nixScope.def.file
                        obj.value = nixScope.v;
                    return obj;
                })
                        ))
                    ))))(nixScope.def["value"])
                )))));
            defGetter(nixScope, "binOp", (nixScope) => createFunc(/*arg:*/ "lhs", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "rhs", null, {}, (nixScope)=>(
                        /*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "elemType", (nixScope) => nixScope.lhs["elemType"]["typeMerge"](nixScope.rhs["elemType"]["functor"]));
                    defGetter(nixScope, "lazy", (nixScope) => (operators.ifThenElse(operators.equal(nixScope.lhs["lazy"], nixScope.rhs["lazy"]), ()=>(nixScope.lhs["lazy"]), ()=>(null))));
                    defGetter(nixScope, "placeholder", (nixScope) => (operators.ifThenElse(operators.equal(nixScope.lhs["placeholder"], nixScope.rhs["placeholder"]), ()=>(nixScope.lhs["placeholder"]), ()=>((operators.ifThenElse(operators.equal(nixScope.lhs["placeholder"], "name"), ()=>(nixScope.rhs["placeholder"]), ()=>((operators.ifThenElse(operators.equal(nixScope.rhs["placeholder"], "name"), ()=>(nixScope.lhs["placeholder"]), ()=>(null))))))))));
                return (operators.ifThenElse(operators.or(operators.or(operators.equal(nixScope.elemType, null), operators.equal(nixScope.lazy, null)), operators.equal(nixScope.placeholder, null)), ()=>(null), ()=>(({"elemType": nixScope.elemType, "lazy": nixScope.lazy, "placeholder": nixScope.placeholder}))));
            })
                    ))
                )));
        return createFunc({"lazy": (nixScope)=>(false),"placeholder": (nixScope)=>("name"),}, null, {}, (nixScope)=>(
                    nixScope.mkOptionType(createScope(nixScope=>{
            const obj = {};
            obj.name = (operators.ifThenElse(nixScope.lazy, ()=>("lazyAttrsOf"), ()=>("attrsOf")));
            obj.description = operators.add(((operators.ifThenElse(nixScope.lazy, ()=>("lazy attribute set"), ()=>("attribute set")))), (new InterpolatedString([" of ", ""], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                        operators.or(operators.equal(nixScope.class, "noun"), operators.equal(nixScope.class, "composite"))
                    ))))(nixScope.elemType))])));
            obj.descriptionClass = "composite";
            obj.check = nixScope.isAttrs;
            obj.merge = (operators.ifThenElse(nixScope.lazy, ()=>((createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            nixScope.zipAttrsWith((createFunc(/*arg:*/ "name", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                                    /*let*/ createScope(nixScope=>{
                                defGetter(nixScope, "merged", (nixScope) => nixScope.mergeDefinitions((operators.listConcat(nixScope.loc, [nixScope.name])))(nixScope.elemType)(nixScope.defs));
                            return operators.selectOrDefault(nixScope.merged, ["optionalValue", "value"], operators.selectOrDefault(nixScope.elemType, ["emptyValue", "value"], nixScope.merged["mergedValue"]));
                        })
                                ))
                            ))))((nixScope.pushPositions(nixScope.defs)))
                        ))
                    )))), ()=>((createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            nixScope.mapAttrs((createFunc(/*arg:*/ "n", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "v", null, {}, (nixScope)=>(
                                    nixScope.v["value"]
                                ))
                            ))))((nixScope.filterAttrs((createFunc(/*arg:*/ "n", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "v", null, {}, (nixScope)=>(
                                    operators.hasAttr(nixScope.v, "value")
                                ))
                            ))))((nixScope.zipAttrsWith((createFunc(/*arg:*/ "name", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                                    (nixScope.mergeDefinitions((operators.listConcat(nixScope.loc, [nixScope.name])))(nixScope.elemType)((nixScope.defs)))["optionalValue"]
                                ))
                            ))))((nixScope.pushPositions(nixScope.defs)))))))
                        ))
                    ))))));
            obj.emptyValue = ({"value": {}});
            obj.getSubOptions = createFunc(/*arg:*/ "prefix", null, {}, (nixScope)=>(
                        nixScope.elemType["getSubOptions"]((operators.listConcat(nixScope.prefix, [(new InterpolatedString(["<", ">"], [()=>(nixScope.placeholder)]))])))
                    ));
            obj.getSubModules = nixScope.elemType["getSubModules"];
            obj.substSubModules = createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                        nixScope.attrsWith(({"elemType": nixScope.elemType["substSubModules"](nixScope.m), "lazy": nixScope.lazy, "placeholder": nixScope.placeholder}))
                    ));
            obj.functor = operators.merge((nixScope.elemTypeFunctor("attrsWith")(({"elemType": nixScope.elemType, "lazy": nixScope.lazy, "placeholder": nixScope.placeholder}))), ({"binOp": nixScope.binOp}));
            if (obj["nestedTypes"] === undefined) obj["nestedTypes"] = {};
            obj["nestedTypes"]["elemType"] = nixScope.elemType;
            return obj;
        }))
                ));
    }));
            defGetter(nixScope, "loaOf", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    operators.merge(nixScope.types["attrsOf"](nixScope.elemType), createScope(nixScope=>{
            const obj = {};
            obj.name = "loaOf";
            obj.deprecationMessage = operators.add(operators.add("Mixing lists with attribute values is no longer", " possible; please use `types.attrsOf` instead. See"), " https://github.com/NixOS/nixpkgs/issues/1800 for the motivation.");
            if (obj["nestedTypes"] === undefined) obj["nestedTypes"] = {};
            obj["nestedTypes"]["elemType"] = nixScope.elemType;
            return obj;
        }))
                )));
            defGetter(nixScope, "attrTag", (nixScope) => createFunc(/*arg:*/ "tags", null, {}, (nixScope)=>(
                    /*let*/ createScope(nixScope=>{
                defGetter(nixScope, "tags_", (nixScope) => nixScope.tags);
            return /*let*/ createScope(nixScope=>{
                defGetter(nixScope, "tags", (nixScope) => nixScope.mapAttrs((createFunc(/*arg:*/ "n", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "opt", null, {}, (nixScope)=>(
                            nixScope.builtins["addErrorContext"]((new InterpolatedString(["while checking that attrTag tag ", " is an option with a type", ""], [()=>(nixScope.lib["strings"]["escapeNixIdentifier"](nixScope.n)), ()=>(nixScope.inAttrPosSuffix(nixScope.tags_)(nixScope.n))])))((operators.merge(nixScope.throwIf((operators.notEqual(operators.selectOrDefault(nixScope.opt, ["_type"], null), "option")))((new InterpolatedString(["In attrTag, each tag value must be an option, but tag ", " ", ""], [()=>(nixScope.lib["strings"]["escapeNixIdentifier"](nixScope.n)), ()=>((operators.ifThenElse(operators.hasAttr(nixScope.opt, "_type"), ()=>((operators.ifThenElse(operators.equal(nixScope.opt["_type"], "option-type"), ()=>("was a bare type, not wrapped in mkOption."), ()=>((new InterpolatedString(["was of type ", "."], [()=>(nixScope.lib["strings"]["escapeNixString"](nixScope.opt["_type"]))])))))), ()=>("was not."))))])))(nixScope.opt), ({"declarations": operators.selectOrDefault(nixScope.opt, ["declarations"], (/*let*/ createScope(nixScope=>{
                        defGetter(nixScope, "pos", (nixScope) => nixScope.builtins["unsafeGetAttrPos"](nixScope.n)(nixScope.tags_));
                    return (operators.ifThenElse(operators.equal(nixScope.pos, null), ()=>([]), ()=>([nixScope.pos["file"]])));
                }))), "declarationPositions": operators.selectOrDefault(nixScope.opt, ["declarationPositions"], (/*let*/ createScope(nixScope=>{
                        defGetter(nixScope, "pos", (nixScope) => nixScope.builtins["unsafeGetAttrPos"](nixScope.n)(nixScope.tags_));
                    return (operators.ifThenElse(operators.equal(nixScope.pos, null), ()=>([]), ()=>([nixScope.pos])));
                })))}))))
                        ))
                    ))))(nixScope.tags_));
                defGetter(nixScope, "choicesStr", (nixScope) => nixScope.concatMapStringsSep(", ")(nixScope.lib["strings"]["escapeNixIdentifier"])((nixScope.attrNames(nixScope.tags))));
            return nixScope.mkOptionType(({"name": "attrTag", "description": "attribute-tagged union", "descriptionClass": "noun", "getSubOptions": createFunc(/*arg:*/ "prefix", null, {}, (nixScope)=>(
                        nixScope.mapAttrs((createFunc(/*arg:*/ "tagName", null, {}, (nixScope)=>(
                            createFunc(/*arg:*/ "tagOption", null, {}, (nixScope)=>(
                                operators.merge(nixScope.tagOption, ({"loc": operators.listConcat(nixScope.prefix, [nixScope.tagName])}))
                            ))
                        ))))(nixScope.tags)
                    )), "check": createFunc(/*arg:*/ "v", null, {}, (nixScope)=>(
                        operators.and(operators.and(nixScope.isAttrs(nixScope.v), operators.equal(nixScope.length((nixScope.attrNames(nixScope.v))), 1n)), operators.hasAttr(nixScope.tags, nixScope.head((nixScope.attrNames(nixScope.v)))))
                    )), "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            /*let*/ createScope(nixScope=>{
                        defGetter(nixScope, "choice", (nixScope) => nixScope.head((nixScope.attrNames((nixScope.head(nixScope.defs))["value"]))));
                        defGetter(nixScope, "checkedValueDefs", (nixScope) => nixScope.map((createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                ((_cond)=>{
                        if (!_cond) {
                            throw new Error("assertion failed: " + "(length (attrNames def.value)) == 1");
                        }
                        return (operators.ifThenElse(operators.notEqual((nixScope.head((nixScope.attrNames(nixScope.def["value"])))), nixScope.choice), ()=>(nixScope.throw((new InterpolatedString(["The option `", "` is defined both as `", "` and `", "`, in ", "."], [()=>(nixScope.showOption(nixScope.loc)), ()=>(nixScope.choice), ()=>(nixScope.head((nixScope.attrNames(nixScope.def["value"])))), ()=>(nixScope.showFiles((nixScope.getFiles(nixScope.defs))))])))), ()=>(createScope(nixScope=>{
                        const obj = {};
                            obj.file = nixScope.def.file
                            obj.value = nixScope.def["value"][nixScope.choice];
                        return obj;
                    }))));
                    })(operators.equal((nixScope.length((nixScope.attrNames(nixScope.def["value"])))), 1n))
                            ))))(nixScope.defs));
                    return (operators.ifThenElse(operators.hasAttr(nixScope.tags, nixScope.choice), ()=>(createScope(nixScope=>{
                    const obj = {};
                    obj[nixScope.choice] = (nixScope.lib["modules"]["evalOptionValue"]((operators.listConcat(nixScope.loc, [nixScope.choice])))(nixScope.tags[nixScope.choice])(nixScope.checkedValueDefs))["value"];
                    return obj;
                })), ()=>(nixScope.throw((new InterpolatedString(["The option `", "` is defined as ", ", but ", " is not among the valid choices (", "). Value ", " was defined in ", "."], [()=>(nixScope.showOption(nixScope.loc)), ()=>(nixScope.lib["strings"]["escapeNixIdentifier"](nixScope.choice)), ()=>(nixScope.lib["strings"]["escapeNixIdentifier"](nixScope.choice)), ()=>(nixScope.choicesStr), ()=>(nixScope.choice), ()=>(nixScope.showFiles((nixScope.getFiles(nixScope.defs))))]))))));
                })
                        ))
                    )), "nestedTypes": nixScope.tags, "functor": operators.merge(nixScope.defaultFunctor("attrTag"), ({"type": createFunc({}, null, {}, (nixScope)=>(
                        nixScope.types["attrTag"](nixScope.tags)
                    )), "payload": ({"tags": nixScope.tags}), "binOp": /*let*/ createScope(nixScope=>{
                defGetter(nixScope, "wrapOptionDecl", (nixScope) => createFunc(/*arg:*/ "option", null, {}, (nixScope)=>(
                        ({"options": nixScope.option, "_file": "<attrTag {...}>", "pos": null})
                    )));
            return createFunc(/*arg:*/ "a", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "b", null, {}, (nixScope)=>(
                            ({"tags": operators.merge(nixScope.a["tags"], operators.merge(nixScope.b["tags"], nixScope.mapAttrs((createFunc(/*arg:*/ "tagName", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "bOpt", null, {}, (nixScope)=>(
                                    operators.merge(nixScope.lib["mergeOptionDecls"]([nixScope.tagName])([(nixScope.wrapOptionDecl(nixScope.a["tags"][nixScope.tagName])),(nixScope.wrapOptionDecl(nixScope.bOpt))]), ({"declarations": operators.listConcat(nixScope.a["tags"][nixScope.tagName]["declarations"], nixScope.bOpt["declarations"]), "declarationPositions": operators.listConcat(nixScope.a["tags"][nixScope.tagName]["declarationPositions"], nixScope.bOpt["declarationPositions"])}))
                                ))
                            ))))((nixScope.builtins["intersectAttrs"](nixScope.a["tags"])(nixScope.b["tags"])))))})
                        ))
                    ));
        })}))}));
        });
        })
                )));
            defGetter(nixScope, "luaInline", (nixScope) => nixScope.mkOptionType(({"name": "luaInline", "description": "inline lua", "descriptionClass": "noun", "check": createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                    operators.equal(operators.selectOrDefault(nixScope.x, ["_type"], null), "lua-inline")
                )), "merge": nixScope.mergeEqualOption})));
            defGetter(nixScope, "uniq", (nixScope) => nixScope.unique(({"message": ""})));
            defGetter(nixScope, "unique", (nixScope) => createFunc({}, null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "type", null, {}, (nixScope)=>(
                        nixScope.mkOptionType(/*rec*/createScope(nixScope=>{
                nixScope.nestedTypes = {};
                nixScope.name = "unique";
                nixScope.description = nixScope.type["description"];
                nixScope.descriptionClass = nixScope.type["descriptionClass"];
                nixScope.check = nixScope.type["check"];
                .nestedTypes["elemType"] = nixScope.type;
                    defGetter(nixScope, "merge", (nixScope) => nixScope.mergeUniqueOption(createScope(nixScope=>{
                const obj = {};
                    obj.message = nixScope.message;
                    obj.merge = nixScope.type.merge
                return obj;
            })));
                    defGetter(nixScope, "emptyValue", (nixScope) => nixScope.type["emptyValue"]);
                    defGetter(nixScope, "getSubOptions", (nixScope) => nixScope.type["getSubOptions"]);
                    defGetter(nixScope, "getSubModules", (nixScope) => nixScope.type["getSubModules"]);
                    defGetter(nixScope, "substSubModules", (nixScope) => createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                            nixScope.uniq((nixScope.type["substSubModules"](nixScope.m)))
                        )));
                    defGetter(nixScope, "functor", (nixScope) => operators.merge(nixScope.elemTypeFunctor(nixScope.name)(({"elemType": nixScope.type})), ({"type": createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                            nixScope.types["unique"](({"message": nixScope.message}))(nixScope.payload["elemType"])
                        ))})));
                    return nixScope;
            }))
                    ))
                )));
            defGetter(nixScope, "nullOr", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    nixScope.mkOptionType(/*rec*/createScope(nixScope=>{
            nixScope.nestedTypes = {};
            nixScope.name = "nullOr";
            nixScope.description = (new InterpolatedString(["null or ", ""], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                        operators.or(operators.equal(nixScope.class, "noun"), operators.equal(nixScope.class, "conjunction"))
                    ))))(nixScope.elemType))]));
            nixScope.descriptionClass = "conjunction";
            .nestedTypes["elemType"] = nixScope.elemType;
                defGetter(nixScope, "check", (nixScope) => createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                        operators.or(operators.equal(nixScope.x, null), nixScope.elemType["check"](nixScope.x))
                    )));
                defGetter(nixScope, "merge", (nixScope) => createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            /*let*/ createScope(nixScope=>{
                        defGetter(nixScope, "nrNulls", (nixScope) => nixScope.count((createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                operators.equal(nixScope.def["value"], null)
                            ))))(nixScope.defs));
                    return (operators.ifThenElse(operators.equal(nixScope.nrNulls, nixScope.length(nixScope.defs)), ()=>(null), ()=>((operators.ifThenElse(operators.notEqual(nixScope.nrNulls, 0n), ()=>(nixScope.throw((new InterpolatedString(["The option `", "` is defined both null and not null, in ", "."], [()=>(nixScope.showOption(nixScope.loc)), ()=>(nixScope.showFiles((nixScope.getFiles(nixScope.defs))))])))), ()=>(nixScope.elemType["merge"](nixScope.loc)(nixScope.defs)))))));
                })
                        ))
                    )));
                defGetter(nixScope, "emptyValue", (nixScope) => ({"value": null}));
                defGetter(nixScope, "getSubOptions", (nixScope) => nixScope.elemType["getSubOptions"]);
                defGetter(nixScope, "getSubModules", (nixScope) => nixScope.elemType["getSubModules"]);
                defGetter(nixScope, "substSubModules", (nixScope) => createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                        nixScope.nullOr((nixScope.elemType["substSubModules"](nixScope.m)))
                    )));
                defGetter(nixScope, "functor", (nixScope) => operators.merge((nixScope.elemTypeFunctor(nixScope.name)(({"elemType": nixScope.elemType}))), ({"type": createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                        nixScope.types["nullOr"](nixScope.payload["elemType"])
                    ))})));
                return nixScope;
        }))
                )));
            defGetter(nixScope, "functionTo", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    nixScope.mkOptionType(createScope(nixScope=>{
            const obj = {};
            obj.name = "functionTo";
            obj.description = (new InterpolatedString(["function that evaluates to a(n) ", ""], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                        operators.or(operators.equal(nixScope.class, "noun"), operators.equal(nixScope.class, "composite"))
                    ))))(nixScope.elemType))]));
            obj.descriptionClass = "composite";
            obj.check = nixScope.isFunction;
            obj.merge = createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            ({"__functionArgs": nixScope.lib["zipAttrsWith"]((createFunc(/*arg:*/ "_", null, {}, (nixScope)=>(
                                nixScope.lib["all"]((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                                    nixScope.x
                                ))))
                            ))))((nixScope.lib["map"]((createFunc(/*arg:*/ "fn", null, {}, (nixScope)=>(
                                nixScope.lib["functionArgs"](nixScope.fn["value"])
                            ))))(nixScope.defs))), "__functor": createFunc(/*arg:*/ "_", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "callerArgs", null, {}, (nixScope)=>(
                                    (nixScope.mergeDefinitions((operators.listConcat(nixScope.loc, ["<function body>"])))(nixScope.elemType)((nixScope.map((createFunc(/*arg:*/ "fn", null, {}, (nixScope)=>(
                                        createScope(nixScope=>{
                                const obj = {};
                                    obj.file = nixScope.fn.file
                                    obj.value = nixScope.fn["value"](nixScope.callerArgs);
                                return obj;
                            })
                                    ))))(nixScope.defs))))["mergedValue"]
                                ))
                            ))})
                        ))
                    ));
            obj.getSubOptions = createFunc(/*arg:*/ "prefix", null, {}, (nixScope)=>(
                        nixScope.elemType["getSubOptions"]((operators.listConcat(nixScope.prefix, ["<function body>"])))
                    ));
            obj.getSubModules = nixScope.elemType["getSubModules"];
            obj.substSubModules = createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                        nixScope.functionTo((nixScope.elemType["substSubModules"](nixScope.m)))
                    ));
            obj.functor = operators.merge((nixScope.elemTypeFunctor("functionTo")(({"elemType": nixScope.elemType}))), ({"type": createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                        nixScope.types["functionTo"](nixScope.payload["elemType"])
                    ))}));
            if (obj["nestedTypes"] === undefined) obj["nestedTypes"] = {};
            obj["nestedTypes"]["elemType"] = nixScope.elemType;
            return obj;
        }))
                )));
            defGetter(nixScope, "submodule", (nixScope) => createFunc(/*arg:*/ "modules", null, {}, (nixScope)=>(
                    nixScope.submoduleWith(({"shorthandOnlyDefinesConfig": true, "modules": nixScope.toList(nixScope.modules)}))
                )));
            defGetter(nixScope, "deferredModule", (nixScope) => nixScope.deferredModuleWith({}));
            defGetter(nixScope, "deferredModuleWith", (nixScope) => createFunc(/*arg:*/ "attrs", null, {}, (nixScope)=>(
                    nixScope.mkOptionType(createScope(nixScope=>{
            const obj = {};
                obj.name = "deferredModule";
                obj.description = "module";
                obj.descriptionClass = "noun";
                obj.check = createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                        operators.or(operators.or(nixScope.isAttrs(nixScope.x), nixScope.isFunction(nixScope.x)), nixScope.path["check"](nixScope.x))
                    ));
                obj.merge = createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            ({"imports": operators.listConcat(nixScope.staticModules, nixScope.map((createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                nixScope.lib["setDefaultModuleLocation"]((new InterpolatedString(["", ", via option ", ""], [()=>(nixScope.def["file"]), ()=>(nixScope.showOption(nixScope.loc))])))(nixScope.def["value"])
                            ))))(nixScope.defs))})
                        ))
                    ));
                obj.getSubOptions = nixScope.submoduleWith(({"modules": nixScope.staticModules})).getSubOptions
                obj.getSubModules = nixScope.submoduleWith(({"modules": nixScope.staticModules})).getSubModules
                obj.substSubModules = createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                        nixScope.deferredModuleWith((operators.merge(nixScope.attrs, ({"staticModules": nixScope.m}))))
                    ));
                obj.functor = operators.merge(nixScope.defaultFunctor("deferredModuleWith"), ({"type": nixScope.types["deferredModuleWith"], "payload": ({"staticModules": nixScope.staticModules}), "binOp": createFunc(/*arg:*/ "lhs", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "rhs", null, {}, (nixScope)=>(
                            ({"staticModules": operators.listConcat(nixScope.lhs["staticModules"], nixScope.rhs["staticModules"])})
                        ))
                    ))}));
            return obj;
        }))
                )));
            defGetter(nixScope, "optionType", (nixScope) => nixScope.mkOptionType(({"name": "optionType", "description": "optionType", "descriptionClass": "noun", "check": createFunc(/*arg:*/ "value", null, {}, (nixScope)=>(
                    operators.equal(operators.selectOrDefault(nixScope.value, ["_type"], null), "option-type")
                )), "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                        (operators.ifThenElse(operators.equal(nixScope.length(nixScope.defs), 1n), ()=>((nixScope.head(nixScope.defs))["value"]), ()=>(/*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "optionModules", (nixScope) => nixScope.map((createFunc({}, null, {}, (nixScope)=>(
                            ({"_file": nixScope.file, "options": nixScope.lib["mkOption"](({"type": nixScope.value}))})
                        ))))(nixScope.defs));
                    defGetter(nixScope, "mergedOption", (nixScope) => nixScope.fixupOptionType(nixScope.loc)((nixScope.mergeOptionDecls(nixScope.loc)(nixScope.optionModules))));
                return nixScope.mergedOption["type"];
            }))))
                    ))
                ))})));
            defGetter(nixScope, "submoduleWith", (nixScope) => createFunc({"specialArgs": (nixScope)=>({}),"shorthandOnlyDefinesConfig": (nixScope)=>(false),"description": (nixScope)=>(null),"class": (nixScope)=>(null),}, "attrs", {}, (nixScope)=>(
                    /*let*/ createScope(nixScope=>{
                nixScope.evalModules = nixScope.lib["modules"]["evalModules"];
                nixScope.name = "submodule";
                defGetter(nixScope, "allModules", (nixScope) => createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                        nixScope.map((createFunc({}, null, {}, (nixScope)=>(
                            (operators.ifThenElse(operators.and(nixScope.isAttrs(nixScope.value), nixScope.shorthandOnlyDefinesConfig), ()=>(({"_file": nixScope.file, "config": nixScope.value})), ()=>(({"_file": nixScope.file, "imports": [nixScope.value]}))))
                        ))))(nixScope.defs)
                    )));
                defGetter(nixScope, "base", (nixScope) => nixScope.evalModules(({"class": nixScope.class, "specialArgs": nixScope.specialArgs, "modules": operators.listConcat([createScope(nixScope=>{
            const obj = {};
            if (obj["_module"] === undefined) obj["_module"] = {};
            if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
            obj["_module"]["args"]["name"] = nixScope.lib["mkOptionDefault"]("‹name›");
            return obj;
        })], nixScope.modules)})));
                defGetter(nixScope, "freeformType", (nixScope) => nixScope.base["_module"]["freeformType"]);
            return nixScope.mkOptionType(({"name": nixScope.name, "description": (operators.ifThenElse(operators.notEqual(nixScope.description, null), ()=>(nixScope.description), ()=>(/*let*/ createScope(nixScope=>{
                defGetter(nixScope, "docsEval", (nixScope) => nixScope.base["extendModules"](({"modules": [nixScope.noCheckForDocsModule]})));
            return operators.selectOrDefault(nixScope.docsEval, ["_module", "freeformType", "description"], nixScope.name);
        })))), "check": createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                        operators.or(operators.or(nixScope.isAttrs(nixScope.x), nixScope.isFunction(nixScope.x)), nixScope.path["check"](nixScope.x))
                    )), "merge": createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                            (nixScope.base["extendModules"](({"modules": operators.listConcat([createScope(nixScope=>{
                    const obj = {};
                    if (obj["_module"] === undefined) obj["_module"] = {};
                    if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
                    obj["_module"]["args"]["name"] = nixScope.last(nixScope.loc);
                    return obj;
                })], nixScope.allModules(nixScope.defs)), "prefix": nixScope.loc})))["config"]
                        ))
                    )), "emptyValue": ({"value": {}}), "getSubOptions": createFunc(/*arg:*/ "prefix", null, {}, (nixScope)=>(
                        /*let*/ createScope(nixScope=>{
                    nixScope.freeformType = nixScope.docsEval["_module"]["freeformType"];
                    defGetter(nixScope, "docsEval", (nixScope) => (nixScope.base["extendModules"](({"prefix": nixScope.prefix, "modules": [nixScope.noCheckForDocsModule]}))));
                return operators.merge(nixScope.docsEval["options"], nixScope.optionalAttrs((operators.notEqual(nixScope.freeformType, null)))(({"_freeformOptions": nixScope.freeformType["getSubOptions"](nixScope.prefix)})));
            })
                    )), "getSubModules": nixScope.modules, "substSubModules": createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                        nixScope.submoduleWith((operators.merge(nixScope.attrs, ({"modules": nixScope.m}))))
                    )), "nestedTypes": nixScope.lib["optionalAttrs"]((operators.notEqual(nixScope.freeformType, null)))(({"freeformType": nixScope.freeformType})), "functor": operators.merge(nixScope.defaultFunctor(nixScope.name), ({"type": nixScope.types["submoduleWith"], "payload": ({"modules": nixScope.modules, "class": nixScope.class, "specialArgs": nixScope.specialArgs, "shorthandOnlyDefinesConfig": nixScope.shorthandOnlyDefinesConfig, "description": nixScope.description}), "binOp": createFunc(/*arg:*/ "lhs", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "rhs", null, {}, (nixScope)=>(
                            ({"class": (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope.lhs, ["class"], null), null), ()=>(operators.selectOrDefault(nixScope.rhs, ["class"], null)), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope.rhs, ["class"], null), null), ()=>(operators.selectOrDefault(nixScope.lhs, ["class"], null)), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope.lhs, ["class"], null), nixScope.rhs["class"]), ()=>(operators.selectOrDefault(nixScope.lhs, ["class"], null)), ()=>(nixScope.throw((new InterpolatedString(["A submoduleWith option is declared multiple times with conflicting class values ", " and ", "."], [()=>(nixScope.toString(nixScope.lhs["class"])), ()=>(nixScope.toString(nixScope.rhs["class"]))])))))))))))), "modules": operators.listConcat(nixScope.lhs["modules"], nixScope.rhs["modules"]), "specialArgs": /*let*/ createScope(nixScope=>{
                        defGetter(nixScope, "intersecting", (nixScope) => nixScope.builtins["intersectAttrs"](nixScope.lhs["specialArgs"])(nixScope.rhs["specialArgs"]));
                    return (operators.ifThenElse(operators.equal(nixScope.intersecting, {}), ()=>(operators.merge(nixScope.lhs["specialArgs"], nixScope.rhs["specialArgs"])), ()=>(nixScope.throw((new InterpolatedString(["A submoduleWith option is declared multiple times with the same specialArgs ", ""], [()=>(nixScope.toString((nixScope.attrNames(nixScope.intersecting))))]))))));
                }), "shorthandOnlyDefinesConfig": (operators.ifThenElse(operators.equal(nixScope.lhs["shorthandOnlyDefinesConfig"], null), ()=>(nixScope.rhs["shorthandOnlyDefinesConfig"]), ()=>((operators.ifThenElse(operators.equal(nixScope.rhs["shorthandOnlyDefinesConfig"], null), ()=>(nixScope.lhs["shorthandOnlyDefinesConfig"]), ()=>((operators.ifThenElse(operators.equal(nixScope.lhs["shorthandOnlyDefinesConfig"], nixScope.rhs["shorthandOnlyDefinesConfig"]), ()=>(nixScope.lhs["shorthandOnlyDefinesConfig"]), ()=>(nixScope.throw("A submoduleWith option is declared multiple times with conflicting shorthandOnlyDefinesConfig values")))))))))), "description": (operators.ifThenElse(operators.equal(nixScope.lhs["description"], null), ()=>(nixScope.rhs["description"]), ()=>((operators.ifThenElse(operators.equal(nixScope.rhs["description"], null), ()=>(nixScope.lhs["description"]), ()=>((operators.ifThenElse(operators.equal(nixScope.lhs["description"], nixScope.rhs["description"]), ()=>(nixScope.lhs["description"]), ()=>(nixScope.throw("A submoduleWith option is declared multiple times with conflicting descriptions"))))))))))})
                        ))
                    ))}))}));
        })
                )));
            defGetter(nixScope, "enum", (nixScope) => createFunc(/*arg:*/ "values", null, {}, (nixScope)=>(
                    /*let*/ createScope(nixScope=>{
                nixScope.unique = nixScope.lib["lists"]["unique"];
                defGetter(nixScope, "show", (nixScope) => createFunc(/*arg:*/ "v", null, {}, (nixScope)=>(
                        (operators.ifThenElse(nixScope.builtins["isString"](nixScope.v), ()=>((new InterpolatedString(["\"", "\""], [()=>(nixScope.v)]))), ()=>((operators.ifThenElse(nixScope.builtins["isInt"](nixScope.v), ()=>(nixScope.builtins["toString"](nixScope.v)), ()=>((operators.ifThenElse(nixScope.builtins["isBool"](nixScope.v), ()=>(nixScope.boolToString(nixScope.v)), ()=>((new InterpolatedString(["<", ">"], [()=>(nixScope.builtins["typeOf"](nixScope.v))])))))))))))
                    )));
            return nixScope.mkOptionType(/*rec*/createScope(nixScope=>{
            nixScope.name = "enum";
                defGetter(nixScope, "description", (nixScope) => (operators.ifThenElse(operators.equal(nixScope.values, []), ()=>("impossible (empty enum)"), ()=>((operators.ifThenElse(operators.equal(nixScope.builtins["length"](nixScope.values), 1n), ()=>((new InterpolatedString(["value ", " (singular enum)"], [()=>(nixScope.show((nixScope.builtins["head"](nixScope.values))))]))), ()=>((new InterpolatedString(["one of ", ""], [()=>(nixScope.concatMapStringsSep(", ")(nixScope.show)(nixScope.values))])))))))));
                defGetter(nixScope, "descriptionClass", (nixScope) => (operators.ifThenElse(operators.lessThan(nixScope.builtins["length"](nixScope.values), 2n), ()=>("noun"), ()=>("conjunction"))));
                defGetter(nixScope, "check", (nixScope) => nixScope.flip(nixScope.elem)(nixScope.values));
                defGetter(nixScope, "merge", (nixScope) => nixScope.mergeEqualOption);
                defGetter(nixScope, "functor", (nixScope) => operators.merge((nixScope.defaultFunctor(nixScope.name)), ({"payload": ({"values": nixScope.values}), "type": createFunc(/*arg:*/ "payload", null, {}, (nixScope)=>(
                        nixScope.types["enum"](nixScope.payload["values"])
                    )), "binOp": createFunc(/*arg:*/ "a", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "b", null, {}, (nixScope)=>(
                            ({"values": nixScope.unique((operators.listConcat(nixScope.a["values"], nixScope.b["values"])))})
                        ))
                    ))})));
                return nixScope;
        }));
        })
                )));
            defGetter(nixScope, "either", (nixScope) => createFunc(/*arg:*/ "t1", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "t2", null, {}, (nixScope)=>(
                        nixScope.mkOptionType(/*rec*/createScope(nixScope=>{
                nixScope.nestedTypes = {};
                nixScope.name = "either";
                nixScope.descriptionClass = "conjunction";
                .nestedTypes["left"] = nixScope.t1;
                .nestedTypes["right"] = nixScope.t2;
                    defGetter(nixScope, "description", (nixScope) => (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope.t1, ["descriptionClass"], null), "nonRestrictiveClause"), ()=>((new InterpolatedString(["", ", or ", ""], [()=>(nixScope.t1["description"]), ()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                            operators.or(operators.equal(nixScope.class, "noun"), operators.equal(nixScope.class, "conjunction"))
                        ))))(nixScope.t2))]))), ()=>((new InterpolatedString(["", " or ", ""], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                            operators.or(operators.equal(nixScope.class, "noun"), operators.equal(nixScope.class, "conjunction"))
                        ))))(nixScope.t1)), ()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                            operators.or(operators.or(operators.equal(nixScope.class, "noun"), operators.equal(nixScope.class, "conjunction")), operators.equal(nixScope.class, "composite"))
                        ))))(nixScope.t2))]))))));
                    defGetter(nixScope, "check", (nixScope) => createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                            operators.or(nixScope.t1["check"](nixScope.x), nixScope.t2["check"](nixScope.x))
                        )));
                    defGetter(nixScope, "merge", (nixScope) => createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                            createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                                /*let*/ createScope(nixScope=>{
                            defGetter(nixScope, "defList", (nixScope) => nixScope.map((createFunc(/*arg:*/ "d", null, {}, (nixScope)=>(
                                    nixScope.d["value"]
                                ))))(nixScope.defs));
                        return (operators.ifThenElse(nixScope.all((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                                    nixScope.t1["check"](nixScope.x)
                                ))))(nixScope.defList), ()=>(nixScope.t1["merge"](nixScope.loc)(nixScope.defs)), ()=>((operators.ifThenElse(nixScope.all((createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                                    nixScope.t2["check"](nixScope.x)
                                ))))(nixScope.defList), ()=>(nixScope.t2["merge"](nixScope.loc)(nixScope.defs)), ()=>(nixScope.mergeOneOption(nixScope.loc)(nixScope.defs)))))));
                    })
                            ))
                        )));
                    defGetter(nixScope, "typeMerge", (nixScope) => createFunc(/*arg:*/ "f'", null, {}, (nixScope)=>(
                            /*let*/ createScope(nixScope=>{
                        defGetter(nixScope, "mt1", (nixScope) => nixScope.t1["typeMerge"]((nixScope.elemAt(nixScope["f'"]["payload"]["elemType"])(0n))["functor"]));
                        defGetter(nixScope, "mt2", (nixScope) => nixScope.t2["typeMerge"]((nixScope.elemAt(nixScope["f'"]["payload"]["elemType"])(1n))["functor"]));
                    return (operators.ifThenElse(operators.and(operators.and((operators.equal(nixScope.name, nixScope["f'"]["name"])), (operators.notEqual(nixScope.mt1, null))), (operators.notEqual(nixScope.mt2, null))), ()=>(nixScope.functor["type"](nixScope.mt1)(nixScope.mt2)), ()=>(null)));
                })
                        )));
                    defGetter(nixScope, "functor", (nixScope) => nixScope.elemTypeFunctor(nixScope.name)(({"elemType": [nixScope.t1,nixScope.t2]})));
                    return nixScope;
            }))
                    ))
                )));
            defGetter(nixScope, "oneOf", (nixScope) => createFunc(/*arg:*/ "ts", null, {}, (nixScope)=>(
                    /*let*/ createScope(nixScope=>{
                defGetter(nixScope, "head'", (nixScope) => (operators.ifThenElse(operators.equal(nixScope.ts, []), ()=>(nixScope.throw("types.oneOf needs to get at least one type in its argument")), ()=>(nixScope.head(nixScope.ts)))));
                defGetter(nixScope, "tail'", (nixScope) => nixScope.tail(nixScope.ts));
            return nixScope["foldl'"](nixScope.either)(nixScope["head'"])(nixScope["tail'"]);
        })
                )));
            defGetter(nixScope, "coercedTo", (nixScope) => createFunc(/*arg:*/ "coercedType", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "coerceFunc", null, {}, (nixScope)=>(
                        createFunc(/*arg:*/ "finalType", null, {}, (nixScope)=>(
                            ((_cond)=>{
                    if (!_cond) {
                        throw new Error("assertion failed: " + "lib.assertMsg (\n          coercedType.getSubModules == null\n        ) \"coercedTo: coercedType must not have submodules (it’s a ${coercedType.description})\"");
                    }
                    return nixScope.mkOptionType(/*rec*/createScope(nixScope=>{
                    nixScope.nestedTypes = {};
                    nixScope.name = "coercedTo";
                    nixScope.description = (new InterpolatedString(["", " or ", " convertible to it"], [()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                                operators.equal(nixScope.class, "noun")
                            ))))(nixScope.finalType)), ()=>(nixScope.optionDescriptionPhrase((createFunc(/*arg:*/ "class", null, {}, (nixScope)=>(
                                operators.equal(nixScope.class, "noun")
                            ))))(nixScope.coercedType))]));
                    .nestedTypes["coercedType"] = nixScope.coercedType;
                    .nestedTypes["finalType"] = nixScope.finalType;
                        defGetter(nixScope, "check", (nixScope) => createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                                operators.or((operators.and(nixScope.coercedType["check"](nixScope.x), nixScope.finalType["check"]((nixScope.coerceFunc(nixScope.x))))), nixScope.finalType["check"](nixScope.x))
                            )));
                        defGetter(nixScope, "merge", (nixScope) => createFunc(/*arg:*/ "loc", null, {}, (nixScope)=>(
                                createFunc(/*arg:*/ "defs", null, {}, (nixScope)=>(
                                    /*let*/ createScope(nixScope=>{
                                defGetter(nixScope, "coerceVal", (nixScope) => createFunc(/*arg:*/ "val", null, {}, (nixScope)=>(
                                        (operators.ifThenElse(nixScope.coercedType["check"](nixScope.val), ()=>(nixScope.coerceFunc(nixScope.val)), ()=>(nixScope.val)))
                                    )));
                            return nixScope.finalType["merge"](nixScope.loc)((nixScope.map((createFunc(/*arg:*/ "def", null, {}, (nixScope)=>(
                                        operators.merge(nixScope.def, ({"value": nixScope.coerceVal(nixScope.def["value"])}))
                                    ))))(nixScope.defs)));
                        })
                                ))
                            )));
                        defGetter(nixScope, "emptyValue", (nixScope) => nixScope.finalType["emptyValue"]);
                        defGetter(nixScope, "getSubOptions", (nixScope) => nixScope.finalType["getSubOptions"]);
                        defGetter(nixScope, "getSubModules", (nixScope) => nixScope.finalType["getSubModules"]);
                        defGetter(nixScope, "substSubModules", (nixScope) => createFunc(/*arg:*/ "m", null, {}, (nixScope)=>(
                                nixScope.coercedTo(nixScope.coercedType)(nixScope.coerceFunc)((nixScope.finalType["substSubModules"](nixScope.m)))
                            )));
                        defGetter(nixScope, "typeMerge", (nixScope) => createFunc(/*arg:*/ "t", null, {}, (nixScope)=>(
                                null
                            )));
                        defGetter(nixScope, "functor", (nixScope) => operators.merge((nixScope.defaultFunctor(nixScope.name)), ({"wrappedDeprecationMessage": nixScope.makeWrappedDeprecationMessage(({"elemType": nixScope.finalType}))})));
                        return nixScope;
                }));
                })(nixScope.lib["assertMsg"]((operators.equal(nixScope.coercedType["getSubModules"], null)))((new InterpolatedString(["coercedTo: coercedType must not have submodules (it’s a ", ")"], [()=>(nixScope.coercedType["description"])]))))
                        ))
                    ))
                )));
            defGetter(nixScope, "addCheck", (nixScope) => createFunc(/*arg:*/ "elemType", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "check", null, {}, (nixScope)=>(
                        operators.merge(nixScope.elemType, ({"check": createFunc(/*arg:*/ "x", null, {}, (nixScope)=>(
                            operators.and(nixScope.elemType["check"](nixScope.x), nixScope.check(nixScope.x))
                        ))}))
                    ))
                )));
            return nixScope;
    }));
            defGetter(nixScope, "mergeTypes", (nixScope) => createFunc(/*arg:*/ "a", null, {}, (nixScope)=>(
                    createFunc(/*arg:*/ "b", null, {}, (nixScope)=>(
                        ((_cond)=>{
                if (!_cond) {
                    throw new Error("assertion failed: " + "isOptionType a && isOptionType b");
                }
                return /*let*/ createScope(nixScope=>{
                    defGetter(nixScope, "merged", (nixScope) => nixScope.a["typeMerge"](nixScope.b["functor"]));
                return (operators.ifThenElse(operators.equal(nixScope.merged, null), ()=>(nixScope.setType("merge-error")(({"error": "Cannot merge types"}))), ()=>(nixScope.merged)));
            });
            })(operators.and(nixScope.isOptionType(nixScope.a), nixScope.isOptionType(nixScope.b)))
                    ))
                )));
            return nixScope;
    }));
        return operators.merge(nixScope.outer_types, nixScope.outer_types["types"]);
    })
            ))