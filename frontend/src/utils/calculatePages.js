export function calculatePages(articleWords, wordEachPage) {
    const words_length = articleWords?.length
    const pages = Math.ceil(words_length / wordEachPage)
    return pages
}