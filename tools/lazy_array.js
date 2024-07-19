// behaves like a real array, but only computes the mapping as indicies are accessed
export function lazyMap(list, mapping) {
    const newList = [...new Array(list.length)]
    const filledIndices = new Array(list.length)
    return new Proxy(newList, {
        ownKeys(innerObj, ...args) { return Reflect.ownKeys(innerObj, ...args) },
        get(innerObj, key, ...args) {
            if (filledIndices[key]) {
                return newList[key]
            } else if (typeof key == "string" && isFinite(key)) {
                filledIndices[key] = true
                newList[key] = mapping(list[key])
                return newList[key]
            }
            return Reflect.get(newList, key, ...args)
        },
        set(innerObj, key, ...args) {
            if (key == proxySymbol||key == thisProxySymbol) {return}
            return Reflect.set(innerObj, key, ...args)
        },
        has: Reflect.has,
        deleteProperty: Reflect.deleteProperty,
        isExtensible: Reflect.isExtensible,
        preventExtensions: Reflect.preventExtensions,
        setPrototypeOf: Reflect.setPrototypeOf,
        defineProperty: Reflect.defineProperty,
        getPrototypeOf: Reflect.getPrototypeOf,
    })
}