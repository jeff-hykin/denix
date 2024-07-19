import { parse, isInteger } from "https://esm.sh/lossless-json@4.0.1"

// parse integer values into a bigint, and use a regular number otherwise
function customNumberParser(string) {
    // this is to follow the behavior of nix
    if (string.includes(".") || string.includes("e") || string.includes("E")) {
        return parseFloat(string)
    } else {
        return BigInt(string)
    }
}

export const jsonParseWithBigInt = (text)=>parse(text, null, customNumberParser)