export const toFloat = (value)=>typeof value == "bigint"?`${value}`-0:value
export async function curlString(url) {
    try {
        return new TextDecoder().decode(
            new Uint8Array(await (await fetch(url)).arrayBuffer())
        )
    } catch (error) {
        console.error(`Issue downloading ${url}`)
        console.log(error)
    }
}