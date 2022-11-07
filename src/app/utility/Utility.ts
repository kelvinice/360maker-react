export const tryParseJSON = (str: string) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}

export const getURLParameter = (name: string) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [""])[1]+"".replace(/\+/g, '%20')) || null;
}