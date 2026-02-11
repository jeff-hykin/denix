import { createRuntime } from "../../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();

export default createFunc({}, null, {}, (nixScope) => (
  ((_withAttrs) => {
    const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
    runtime.scopeStack.push(nixScope);
    try {
      return createScope((nixScope) => {
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["fooDeclarations"] = nixScope.lib["mkOption"](
          {
            "default":
              (nixScope.options["free"]["type"]["getSubOptions"]([]))[
                "_freeformOptions"
              ]["foo"]["declarations"],
          },
        );
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["free"] = nixScope.lib["mkOption"](
          {
            "type": nixScope.submodule(createScope((nixScope) => {
              const obj = {};
              if (obj["config"] === undefined) obj["config"] = {};
              if (obj["config"]["_module"] === undefined) {
                obj["config"]["_module"] = {};
              }
              obj["config"]["_module"]["freeformType"] = nixScope.lib
                ["mkMerge"]([
                  nixScope.attrsOf(
                    nixScope.submodule(createScope((nixScope) => {
                      const obj = {};
                      if (obj["options"] === undefined) obj["options"] = {};
                      obj["options"]["foo"] = nixScope.lib["mkOption"]({});
                      return obj;
                    })),
                  ),
                  nixScope.attrsOf(
                    nixScope.submodule(createScope((nixScope) => {
                      const obj = {};
                      if (obj["options"] === undefined) obj["options"] = {};
                      obj["options"]["bar"] = nixScope.lib["mkOption"]({});
                      return obj;
                    })),
                  ),
                ]);
              return obj;
            })),
          },
        );
        if (obj["config"] === undefined) obj["config"] = {};
        if (obj["config"]["free"] === undefined) obj["config"]["free"] = {};
        if (obj["config"]["free"]["xxx"] === undefined) {
          obj["config"]["free"]["xxx"] = {};
        }
        obj["config"]["free"]["xxx"]["foo"] = 10n;
        if (obj["config"] === undefined) obj["config"] = {};
        if (obj["config"]["free"] === undefined) obj["config"]["free"] = {};
        if (obj["config"]["free"]["yyy"] === undefined) {
          obj["config"]["free"]["yyy"] = {};
        }
        obj["config"]["free"]["yyy"]["bar"] = 10n;
        return obj;
      });
    } finally {
      runtime.scopeStack.pop();
    }
  })(nixScope.lib["types"])
));
