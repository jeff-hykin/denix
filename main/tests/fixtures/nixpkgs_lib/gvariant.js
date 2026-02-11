export default /**
  A partial and basic implementation of GVariant formatted strings.
  See [GVariant Format Strings](https://docs.gtk.org/glib/gvariant-format-strings.html) for details.

  :::{.warning}
  This API is not considered fully stable and it might therefore
  change in backwards incompatible ways without prior notice.
  :::
*/
//
//
createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.concatMapStringsSep = nixScope.lib["concatMapStringsSep"];
    nixScope.concatStrings = nixScope.lib["concatStrings"];
    nixScope.escape = nixScope.lib["escape"];
    nixScope.head = nixScope.lib["head"];
    nixScope.replaceString = nixScope.lib["replaceString"];
    defGetter(
      nixScope,
      "mkPrimitive",
      (nixScope) =>
        createFunc(/*arg:*/ "t", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            {
              "_type": "gvariant",
              "type": nixScope.t,
              "value": nixScope.v,
              "__toString": createFunc(
                /*arg:*/ "self",
                null,
                {},
                (nixScope) => (
                  new InterpolatedString(["@", " ", ""], [
                    () => (nixScope.self["type"]),
                    () => (nixScope.toString(nixScope.self["value"])),
                  ])
                ),
              ),
            }
          ))
        )),
    );
    defGetter(
      nixScope,
      "type",
      (nixScope) => ({
        "arrayOf": createFunc(/*arg:*/ "t", null, {}, (nixScope) => (
          new InterpolatedString(["a", ""], [() => (nixScope.t)])
        )),
        "maybeOf": createFunc(/*arg:*/ "t", null, {}, (nixScope) => (
          new InterpolatedString(["m", ""], [() => (nixScope.t)])
        )),
        "tupleOf": createFunc(/*arg:*/ "ts", null, {}, (nixScope) => (
          new InterpolatedString(["(", ")"], [
            () => (nixScope.concatStrings(nixScope.ts)),
          ])
        )),
        "dictionaryEntryOf": createFunc(
          /*arg:*/ "nameType",
          null,
          {},
          (nixScope) => (
            createFunc(/*arg:*/ "valueType", null, {}, (nixScope) => (
              new InterpolatedString(["{", "", "}"], [
                () => (nixScope.nameType),
                () => (nixScope.valueType),
              ])
            ))
          ),
        ),
        "string": "s",
        "boolean": "b",
        "uchar": "y",
        "int16": "n",
        "uint16": "q",
        "int32": "i",
        "uint32": "u",
        "int64": "x",
        "uint64": "t",
        "double": "d",
        "variant": "v",
      }),
    );
    return /*rec*/ createScope((nixScope) => {
      defGetter(nixScope, "type", (nixScope) => nixScope.type);
      defGetter(
        nixScope,
        "isGVariant",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            operators.equal(
              operators.selectOrDefault(nixScope.v, ["_type"], ""),
              "gvariant",
            )
          )),
      );
      defGetter(
        nixScope,
        "intConstructors",
        (
          nixScope,
        ) => [
          {
            "name": "mkInt32",
            "type": nixScope.type["int32"],
            "min": -2147483648n,
            "max": 2147483647n,
          },
          {
            "name": "mkUint32",
            "type": nixScope.type["uint32"],
            "min": 0n,
            "max": 4294967295n,
          },
          {
            "name": "mkInt64",
            "type": nixScope.type["int64"],
            "min": null,
            "max": null,
          },
          {
            "name": "mkUint64",
            "type": nixScope.type["uint64"],
            "min": 0n,
            "max": null,
          },
          {
            "name": "mkInt16",
            "type": nixScope.type["int16"],
            "min": -32768n,
            "max": 32767n,
          },
          {
            "name": "mkUint16",
            "type": nixScope.type["uint16"],
            "min": 0n,
            "max": 65535n,
          },
          {
            "name": "mkUchar",
            "type": nixScope.type["uchar"],
            "min": 0n,
            "max": 255n,
          },
        ],
      );
      defGetter(
        nixScope,
        "mkValue",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            operators.ifThenElse(
              nixScope.builtins["isBool"](nixScope.v),
              () => (nixScope.mkBoolean(nixScope.v)),
              () => (operators.ifThenElse(
                nixScope.builtins["isFloat"](nixScope.v),
                () => (nixScope.mkDouble(nixScope.v)),
                () => (operators.ifThenElse(
                  nixScope.builtins["isString"](nixScope.v),
                  () => (nixScope.mkString(nixScope.v)),
                  () => (operators.ifThenElse(
                    nixScope.builtins["isList"](nixScope.v),
                    () => (nixScope.mkArray(nixScope.v)),
                    () => (operators.ifThenElse(
                      nixScope.isGVariant(nixScope.v),
                      () => (nixScope.v),
                      () => (operators.ifThenElse(
                        nixScope.builtins["isInt"](nixScope.v),
                        () => (/*let*/ createScope((nixScope) => {
                          defGetter(nixScope, "validConstructors", (nixScope) =>
                            nixScope.builtins["filter"](
                              createFunc({}, null, {}, (nixScope) => (
                                operators.and(
                                  operators.or(
                                    operators.equal(nixScope.min, null),
                                    operators.lessThanOrEqual(
                                      nixScope.min,
                                      nixScope.v,
                                    ),
                                  ),
                                  operators.or(
                                    operators.equal(nixScope.max, null),
                                    operators.lessThanOrEqual(
                                      nixScope.v,
                                      nixScope.max,
                                    ),
                                  ),
                                )
                              )),
                            )(nixScope.intConstructors));
                          return nixScope.throw(
                            new InterpolatedString([
                              "\n        The GVariant type for number “",
                              "” is unclear.\n        Please wrap the value with one of the following, depending on the value type in GSettings schema:\n\n        ",
                              "\n      ",
                            ], [
                              () => (nixScope.builtins["toString"](nixScope.v)),
                              () => (nixScope.lib["concatMapStringsSep"]("")(
                                createFunc({}, null, {}, (nixScope) => (
                                  new InterpolatedString([
                                    "- `lib.gvariant.",
                                    "` for `",
                                    "`",
                                  ], [
                                    () => (nixScope.name),
                                    () => (nixScope.type),
                                  ])
                                )),
                              )(nixScope.validConstructors)),
                            ]),
                          );
                        })),
                        () => (operators.ifThenElse(
                          nixScope.builtins["isAttrs"](nixScope.v),
                          () => (nixScope.throw(
                            "Cannot construct GVariant value from an attribute set. If you want to construct a dictionary, you will need to create an array containing items constructed with `lib.gvariant.mkDictionaryEntry`.",
                          )),
                          () => (nixScope.throw(
                            new InterpolatedString([
                              "The GVariant type of “",
                              "” can't be inferred.",
                            ], [
                              () => (nixScope.builtins["typeOf"](nixScope.v)),
                            ]),
                          )),
                        )),
                      )),
                    )),
                  )),
                )),
              )),
            )
          )),
      );
      defGetter(
        nixScope,
        "mkArray",
        (nixScope) =>
          createFunc(/*arg:*/ "elems", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "vs", (nixScope) =>
                nixScope.map(nixScope.mkValue)(
                  nixScope.lib["throwIf"](operators.equal(nixScope.elems, []))(
                    "Please create empty array with mkEmptyArray.",
                  )(nixScope.elems),
                ));
              defGetter(nixScope, "elemType", (nixScope) =>
                nixScope.lib["throwIfNot"](
                  nixScope.lib["all"](
                    createFunc(/*arg:*/ "t", null, {}, (nixScope) => (
                      operators.equal(
                        (nixScope.head(nixScope.vs))["type"],
                        nixScope.t,
                      )
                    )),
                  )(
                    nixScope.map(
                      createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
                        nixScope.v["type"]
                      )),
                    )(nixScope.vs),
                  ),
                )("Elements in a list should have same type.")(
                  (nixScope.head(nixScope.vs))["type"],
                ));
              return operators.merge(
                nixScope.mkPrimitive(
                  nixScope.type["arrayOf"](nixScope.elemType),
                )(nixScope.vs),
                {
                  "__toString": createFunc(
                    /*arg:*/ "self",
                    null,
                    {},
                    (nixScope) => (
                      new InterpolatedString(["@", " [", "]"], [
                        () => (nixScope.self["type"]),
                        () => (nixScope.concatMapStringsSep(",")(
                          nixScope.toString,
                        )(nixScope.self["value"])),
                      ])
                    ),
                  ),
                },
              );
            })
          )),
      );
      defGetter(
        nixScope,
        "mkEmptyArray",
        (nixScope) =>
          createFunc(/*arg:*/ "elemType", null, {}, (nixScope) => (
            operators.merge(
              nixScope.mkPrimitive(nixScope.type["arrayOf"](nixScope.elemType))(
                [],
              ),
              {
                "__toString": createFunc(
                  /*arg:*/ "self",
                  null,
                  {},
                  (nixScope) => (
                    new InterpolatedString(["@", " []"], [
                      () => (nixScope.self["type"]),
                    ])
                  ),
                ),
              },
            )
          )),
      );
      defGetter(
        nixScope,
        "mkVariant",
        (nixScope) =>
          createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "gvarElem",
                (nixScope) => nixScope.mkValue(nixScope.elem),
              );
              return operators.merge(
                nixScope.mkPrimitive(nixScope.type["variant"])(
                  nixScope.gvarElem,
                ),
                {
                  "__toString": createFunc(
                    /*arg:*/ "self",
                    null,
                    {},
                    (nixScope) => (
                      new InterpolatedString(["<", ">"], [
                        () => (nixScope.toString(nixScope.self["value"])),
                      ])
                    ),
                  ),
                },
              );
            })
          )),
      );
      defGetter(
        nixScope,
        "mkDictionaryEntry",
        (nixScope) =>
          createFunc(/*arg:*/ "name", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "value", null, {}, (nixScope) => (
              /*let*/ createScope((nixScope) => {
                defGetter(
                  nixScope,
                  "name'",
                  (nixScope) => nixScope.mkValue(nixScope.name),
                );
                defGetter(
                  nixScope,
                  "value'",
                  (nixScope) => nixScope.mkValue(nixScope.value),
                );
                defGetter(
                  nixScope,
                  "dictionaryType",
                  (nixScope) =>
                    nixScope.type["dictionaryEntryOf"](
                      nixScope["name'"]["type"],
                    )(nixScope["value'"]["type"]),
                );
                return operators.merge(
                  nixScope.mkPrimitive(nixScope.dictionaryType)(
                    { "name": nixScope.name, "value": nixScope.value },
                  ),
                  {
                    "__toString": createFunc(
                      /*arg:*/ "self",
                      null,
                      {},
                      (nixScope) => (
                        new InterpolatedString(["@", " {", ",", "}"], [
                          () => (nixScope.self["type"]),
                          () => (nixScope["name'"]),
                          () => (nixScope["value'"]),
                        ])
                      ),
                    ),
                  },
                );
              })
            ))
          )),
      );
      defGetter(
        nixScope,
        "mkMaybe",
        (nixScope) =>
          createFunc(/*arg:*/ "elemType", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
              operators.merge(
                nixScope.mkPrimitive(
                  nixScope.type["maybeOf"](nixScope.elemType),
                )(nixScope.elem),
                {
                  "__toString": createFunc(
                    /*arg:*/ "self",
                    null,
                    {},
                    (nixScope) => (
                      operators.ifThenElse(
                        operators.equal(nixScope.self["value"], null),
                        () => (new InterpolatedString(["@", " nothing"], [
                          () => (nixScope.self["type"]),
                        ])),
                        () => (new InterpolatedString(["just ", ""], [
                          () => (nixScope.toString(nixScope.self["value"])),
                        ])),
                      )
                    ),
                  ),
                },
              )
            ))
          )),
      );
      defGetter(
        nixScope,
        "mkNothing",
        (nixScope) =>
          createFunc(/*arg:*/ "elemType", null, {}, (nixScope) => (
            nixScope.mkMaybe(nixScope.elemType)(null)
          )),
      );
      defGetter(
        nixScope,
        "mkJust",
        (nixScope) =>
          createFunc(/*arg:*/ "elem", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "gvarElem",
                (nixScope) => nixScope.mkValue(nixScope.elem),
              );
              return nixScope.mkMaybe(nixScope.gvarElem["type"])(
                nixScope.gvarElem,
              );
            })
          )),
      );
      defGetter(
        nixScope,
        "mkTuple",
        (nixScope) =>
          createFunc(/*arg:*/ "elems", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(
                nixScope,
                "gvarElems",
                (nixScope) => nixScope.map(nixScope.mkValue)(nixScope.elems),
              );
              defGetter(nixScope, "tupleType", (nixScope) =>
                nixScope.type["tupleOf"](
                  nixScope.map(
                    createFunc(/*arg:*/ "e", null, {}, (nixScope) => (
                      nixScope.e["type"]
                    )),
                  )(nixScope.gvarElems),
                ));
              return operators.merge(
                nixScope.mkPrimitive(nixScope.tupleType)(nixScope.gvarElems),
                {
                  "__toString": createFunc(
                    /*arg:*/ "self",
                    null,
                    {},
                    (nixScope) => (
                      new InterpolatedString(["@", " (", ")"], [
                        () => (nixScope.self["type"]),
                        () => (nixScope.concatMapStringsSep(",")(
                          nixScope.toString,
                        )(nixScope.self["value"])),
                      ])
                    ),
                  ),
                },
              );
            })
          )),
      );
      defGetter(
        nixScope,
        "mkBoolean",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            operators.merge(
              nixScope.mkPrimitive(nixScope.type["boolean"])(nixScope.v),
              {
                "__toString": createFunc(
                  /*arg:*/ "self",
                  null,
                  {},
                  (nixScope) => (
                    operators.ifThenElse(
                      nixScope.self["value"],
                      () => ("true"),
                      () => ("false"),
                    )
                  ),
                ),
              },
            )
          )),
      );
      defGetter(
        nixScope,
        "mkString",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              defGetter(nixScope, "sanitize", (nixScope) =>
                createFunc(/*arg:*/ "s", null, {}, (nixScope) => (
                  nixScope.replaceString("")("n")(
                    nixScope.escape(["'", ""])(nixScope.s),
                  )
                )));
              return operators.merge(
                nixScope.mkPrimitive(nixScope.type["string"])(nixScope.v),
                {
                  "__toString": createFunc(
                    /*arg:*/ "self",
                    null,
                    {},
                    (nixScope) => (
                      new InterpolatedString(["'", "'"], [
                        () => (nixScope.sanitize(nixScope.self["value"])),
                      ])
                    ),
                  ),
                },
              );
            })
          )),
      );
      defGetter(
        nixScope,
        "mkObjectpath",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            operators.merge(
              nixScope.mkPrimitive(nixScope.type["string"])(nixScope.v),
              {
                "__toString": createFunc(
                  /*arg:*/ "self",
                  null,
                  {},
                  (nixScope) => (
                    new InterpolatedString(["objectpath '", "'"], [
                      () => (nixScope.escape(["'"])(nixScope.self["value"])),
                    ])
                  ),
                ),
              },
            )
          )),
      );
      defGetter(
        nixScope,
        "mkUchar",
        (nixScope) => nixScope.mkPrimitive(nixScope.type["uchar"]),
      );
      defGetter(
        nixScope,
        "mkInt16",
        (nixScope) => nixScope.mkPrimitive(nixScope.type["int16"]),
      );
      defGetter(
        nixScope,
        "mkUint16",
        (nixScope) => nixScope.mkPrimitive(nixScope.type["uint16"]),
      );
      defGetter(
        nixScope,
        "mkInt32",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            operators.merge(
              nixScope.mkPrimitive(nixScope.type["int32"])(nixScope.v),
              {
                "__toString": createFunc(
                  /*arg:*/ "self",
                  null,
                  {},
                  (nixScope) => (
                    nixScope.toString(nixScope.self["value"])
                  ),
                ),
              },
            )
          )),
      );
      defGetter(
        nixScope,
        "mkUint32",
        (nixScope) => nixScope.mkPrimitive(nixScope.type["uint32"]),
      );
      defGetter(
        nixScope,
        "mkInt64",
        (nixScope) => nixScope.mkPrimitive(nixScope.type["int64"]),
      );
      defGetter(
        nixScope,
        "mkUint64",
        (nixScope) => nixScope.mkPrimitive(nixScope.type["uint64"]),
      );
      defGetter(
        nixScope,
        "mkDouble",
        (nixScope) =>
          createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
            operators.merge(
              nixScope.mkPrimitive(nixScope.type["double"])(nixScope.v),
              {
                "__toString": createFunc(
                  /*arg:*/ "self",
                  null,
                  {},
                  (nixScope) => (
                    nixScope.toString(nixScope.self["value"])
                  ),
                ),
              },
            )
          )),
      );
      return nixScope;
    });
  })
));
