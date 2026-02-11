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
              defGetter(
                nixScope,
                "parts",
                (nixScope) =>
                  nixScope.super["path"]["splitRoot"](nixScope.path),
              );
              defGetter(
                nixScope,
                "components",
                (nixScope) =>
                  nixScope.self["path"]["subpath"]["components"](
                    nixScope.parts["subpath"],
                  ),
              );
              defGetter(
                nixScope,
                "count",
                (nixScope) => nixScope.self["length"](nixScope.components),
              );
              defGetter(
                nixScope,
                "rootIndex",
                (nixScope) =>
                  operators.subtract(
                    nixScope.count,
                    nixScope.self["lists"]["findFirstIndex"](
                      createFunc(/*arg:*/ "component", null, {}, (nixScope) => (
                        operators.equal(nixScope.component, "mock-root")
                      )),
                    )(nixScope.self["length"](nixScope.components))(
                      nixScope.self["reverseList"](nixScope.components),
                    ),
                  ),
              );
              defGetter(
                nixScope,
                "root",
                (nixScope) =>
                  nixScope.self["path"]["append"](nixScope.parts["root"])(
                    nixScope.self["path"]["subpath"]["join"](
                      nixScope.self["take"](nixScope.rootIndex)(
                        nixScope.components,
                      ),
                    ),
                  ),
              );
              defGetter(
                nixScope,
                "subpath",
                (nixScope) =>
                  nixScope.self["path"]["subpath"]["join"](
                    nixScope.self["drop"](nixScope.rootIndex)(
                      nixScope.components,
                    ),
                  ),
              );
              return ({ "root": nixScope.root, "subpath": nixScope.subpath });
            })
          )),
        },
      ),
    }
  ))
));
