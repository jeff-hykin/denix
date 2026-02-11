export default //
//
//
//
//
//
//
//
createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
  createFunc(/*arg:*/ "super", null, {}, (nixScope) => (
    {
      "path": operators.merge(
        nixScope.super["path"],
        {
          "splitRoot": createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
            /*let*/ createScope((nixScope) => {
              Object.defineProperty(nixScope, "parts", {
                enumerable: true,
                get() {
                  return nixScope.super["path"]["splitRoot"](nixScope.path);
                },
              });
              Object.defineProperty(nixScope, "components", {
                enumerable: true,
                get() {
                  return nixScope.self["path"]["subpath"]["components"](
                    nixScope.parts["subpath"],
                  );
                },
              });
              Object.defineProperty(nixScope, "count", {
                enumerable: true,
                get() {
                  return nixScope.self["length"](nixScope.components);
                },
              });
              Object.defineProperty(nixScope, "rootIndex", {
                enumerable: true,
                get() {
                  return operators.subtract(
                    nixScope.count,
                    nixScope.self["lists"]["findFirstIndex"](
                      createFunc(/*arg:*/ "component", null, {}, (nixScope) => (
                        operators.equal(nixScope.component, "mock-root")
                      )),
                    )(nixScope.self["length"](nixScope.components))(
                      nixScope.self["reverseList"](nixScope.components),
                    ),
                  );
                },
              });
              Object.defineProperty(nixScope, "root", {
                enumerable: true,
                get() {
                  return nixScope.self["path"]["append"](
                    nixScope.parts["root"],
                  )(nixScope.self["path"]["subpath"]["join"](
                    nixScope.self["take"](nixScope.rootIndex)(
                      nixScope.components,
                    ),
                  ));
                },
              });
              Object.defineProperty(nixScope, "subpath", {
                enumerable: true,
                get() {
                  return nixScope.self["path"]["subpath"]["join"](
                    nixScope.self["drop"](nixScope.rootIndex)(
                      nixScope.components,
                    ),
                  );
                },
              });
              return ({ "root": nixScope.root, "subpath": nixScope.subpath });
            })
          )),
        },
      ),
    }
  ))
));
