import { createRuntime } from "../../../../../../../../../../../../../../runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();

export default createFunc({}, null, {}, (nixScope) => (
  {
    "freeformType": ((_withAttrs) => {
      const nixScope = { ...runtime.scopeStack.slice(-1)[0], ..._withAttrs };
      runtime.scopeStack.push(nixScope);
      try {
        return nixScope.attrsOf(
          nixScope.either(nixScope.str)(nixScope.attrsOf(nixScope.str)),
        );
      } finally {
        runtime.scopeStack.pop();
      }
    })(nixScope.lib["types"]),
  }
));
