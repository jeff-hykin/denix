// Custom JSON parser that converts plain integers to BigInts
// This matches Nix behavior where integers are distinct from floats
export const jsonParseWithBigInt = (text) => {
    // Use a regex to find all plain integers in the JSON and mark them
    // Match integers after : or [ or ,
    const intPattern = /([:,\[])\s*(-?\d+)(?=\s*[,\}\]\s])/g
    const replacements = []
    let index = 0

    const markedText = text.replace(intPattern, (match, prefix, num) => {
        replacements.push(num)
        return `${prefix} "__BIGINT_${index++}__"`
    })

    return JSON.parse(markedText, (key, value) => {
        if (typeof value === "string" && value.startsWith("__BIGINT_")) {
            const idx = parseInt(value.match(/__BIGINT_(\d+)__/)[1])
            return BigInt(replacements[idx])
        }
        return value
    })
}