import {v4 as uuidv4} from "uuid";

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

export const generateUUID = () => {
    return uuidv4();
}

export const isNullUndefinedOrEmpty = (str: any) => {
    return str === undefined || str == null || str === "";
}