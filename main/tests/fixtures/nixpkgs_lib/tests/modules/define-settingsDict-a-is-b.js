export default createFunc({}, null, {}, (nixScope) => (
  createScope((nixScope) => {
    const obj = {};
    if (obj["settingsDict"] === undefined) obj["settingsDict"] = {};
    obj["settingsDict"]["a"] = nixScope.config["settingsDict"]["b"];
    return obj;
  })
));
