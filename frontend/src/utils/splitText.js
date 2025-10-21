export function splitText(content) {
    const words = content?.split(" ")
        .map(word => word.replaceAll("\n\n"||"\r\n", "\n"))
        .flatMap(word => word.replaceAll("\n", "##\n")
        .split("\n"))
    return words
}