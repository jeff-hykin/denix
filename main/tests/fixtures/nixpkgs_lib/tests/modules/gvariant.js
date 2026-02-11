import { createRuntime } from "../../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const operators = runtime.operators;

export default createFunc({}, null, {}, (nixScope) => (
  {
    "options":
      ({
        "examples": nixScope.lib["mkOption"](
          { "type": nixScope.lib["types"]["attrs"] },
        ),
        "assertion": nixScope.lib["mkOption"](
          { "type": nixScope.lib["types"]["bool"] },
        ),
      }),
    "config": ({
      "examples": ((_withAttrs) => {
        const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
        runtime.scopeStack.push(nixScope);
        try {
          return ({
            "bool": true,
            "float": 3.14,
            "int32": nixScope.mkInt32(-42n),
            "uint32": nixScope.mkUint32(42n),
            "int16": nixScope.mkInt16(-42n),
            "uint16": nixScope.mkUint16(42n),
            "int64": nixScope.mkInt64(-42n),
            "uint64": nixScope.mkUint64(42n),
            "array1": ["one"],
            "array2": nixScope.mkArray([nixScope.mkInt32(1n)]),
            "array3": nixScope.mkArray([nixScope.mkUint32(2n)]),
            "emptyArray": nixScope.mkEmptyArray(nixScope.type["uint32"]),
            "string": "foo",
            "escapedString": `
            '\
          `,
            "tuple": nixScope.mkTuple([nixScope.mkInt32(1n), ["foo"]]),
            "maybe1": nixScope.mkNothing(nixScope.type["string"]),
            "maybe2": nixScope.mkJust(nixScope.mkUint32(4n)),
            "variant": nixScope.mkVariant("foo"),
            "dictionaryEntry": nixScope.mkDictionaryEntry(nixScope.mkInt32(1n))(
              ["foo"],
            ),
          });
        } finally {
          runtime.scopeStack.pop();
        }
      })(nixScope.lib["gvariant"]),
      "assertion": /*let*/ createScope((nixScope) => {
        defGetter(nixScope, "mkLine", (nixScope) =>
          createFunc(/*arg:*/ "n", null, {}, (nixScope) => (
            createFunc(/*arg:*/ "v", null, {}, (nixScope) => (
              new InterpolatedString(["", " = ", ""], [
                () => (nixScope.n),
                () => (nixScope.toString(
                  nixScope.lib["gvariant"]["mkValue"](nixScope.v),
                )),
              ])
            ))
          )));
        defGetter(nixScope, "result", (nixScope) =>
          nixScope.lib["concatStringsSep"]("")(
            nixScope.lib["mapAttrsToList"](nixScope.mkLine)(
              nixScope.config["examples"],
            ),
          ));
        return operators.equal(
          operators.add(nixScope.result, ""),
          `
            array1 = @as ['one']
            array2 = @ai [1]
            array3 = @au [@u 2]
            bool = true
            dictionaryEntry = @{ias} {1,@as ['foo']}
            emptyArray = @au []
            escapedString = '\\'\\\\\n'
            float = 3.140000
            int16 = @n -42
            int32 = -42
            int64 = @x -42
            maybe1 = @ms nothing
            maybe2 = just @u 4
            string = 'foo'
            tuple = @(ias) (1,@as ['foo'])
            uint16 = @q 42
            uint32 = @u 42
            uint64 = @t 42
            variant = <'foo'>
          `,
        );
      }),
    }),
  }
));
