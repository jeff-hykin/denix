import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(nixScope, "config", (nixScope) =>
    createScope((nixScope) => {
      const obj = {};
      obj.hostName = "itchy";
      obj.foo = createScope((nixScope) => {
        const obj = {};
        obj.a = "a";
        if (obj["b"] === undefined) obj["b"] = {};
        obj["b"]["c"] = "c";
        return obj;
      });
      if (obj["services"] === undefined) obj["services"] = {};
      if (obj["services"]["sshd"] === undefined) obj["services"]["sshd"] = {};
      obj["services"]["sshd"]["enable"] = true;
      if (obj["services"] === undefined) obj["services"] = {};
      if (obj["services"]["sshd"] === undefined) obj["services"]["sshd"] = {};
      obj["services"]["sshd"]["port"] = 22n;
      if (obj["services"] === undefined) obj["services"] = {};
      if (obj["services"]["httpd"] === undefined) obj["services"]["httpd"] = {};
      obj["services"]["httpd"]["port"] = 80n;
      if (obj["a"] === undefined) obj["a"] = {};
      if (obj["a"]["b"] === undefined) obj["a"]["b"] = {};
      if (obj["a"]["b"]["c"] === undefined) obj["a"]["b"]["c"] = {};
      if (obj["a"]["b"]["c"]["d"] === undefined) obj["a"]["b"]["c"]["d"] = {};
      if (obj["a"]["b"]["c"]["d"]["e"] === undefined) {
        obj["a"]["b"]["c"]["d"]["e"] = {};
      }
      if (obj["a"]["b"]["c"]["d"]["e"]["f"] === undefined) {
        obj["a"]["b"]["c"]["d"]["e"]["f"] = {};
      }
      if (obj["a"]["b"]["c"]["d"]["e"]["f"]["g"] === undefined) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"] = {};
      }
      if (obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"] === undefined) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"] = {};
      }
      if (obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"] === undefined) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"] === undefined
      ) obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"] = {};
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"] === undefined
      ) obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"] = {};
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"] ===
          undefined
      ) obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"] = {};
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"] ===
          undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"] =
          {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"]["x"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"]["x"] = {};
      }
      if (
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"]["x"]["y"] === undefined
      ) {
        obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"][
          "n"
        ]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"]["x"]["y"] = {};
      }
      obj["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"]["l"]["m"]["n"][
        "o"
      ]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"]["x"]["y"]["z"] = "x";
      return obj;
    }));
  return (operators.ifThenElse(
    nixScope.config["services"]["sshd"]["enable"],
    () => (operators.add(
      operators.add(
        operators.add(
          new InterpolatedString(["foo ", " ", " ", ""], [
            () => (apply(
              nixScope.toString,
              nixScope.config["services"]["sshd"]["port"],
            )),
            () => (apply(
              nixScope.toString,
              nixScope.config["services"]["httpd"]["port"],
            )),
            () => (nixScope.config["hostName"]),
          ]),
          new InterpolatedString(["", ""], [
            () => (nixScope
              .config["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"][
                "l"
              ]["m"]["n"]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"]["x"][
                "y"
              ]["z"]),
          ]),
        ),
        new InterpolatedString(["", ""], [() => (nixScope.config["foo"]["a"])]),
      ),
      new InterpolatedString(["", ""], [
        () => (nixScope.config["foo"]["b"]["c"]),
      ]),
    )),
    () => ("bar"),
  ));
});
