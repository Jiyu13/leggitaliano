export function calculatePages(articleWords) {
    const words_length = articleWords?.length
    const pages = Math.ceil(words_length / 250)
    return pages
}