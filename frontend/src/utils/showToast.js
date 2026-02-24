export function showToast(setter, toastMessage) {
    setter(toastMessage)
    setTimeout(function() {
        setter(null)
    }, 1000)
}