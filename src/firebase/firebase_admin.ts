import axios, { AxiosRequestConfig } from "axios";
import { auth } from "./firebase";

// The baseurl of the Firebase Admin Backend
const baseUrl = process.env["ADMIN_BACKEND_URL"] || 'http://localhost:8888/admin/'

// Returns the baseUrl concateneted to the path given and handles the wrong "/"
const fullPath = (path: string) => {
    let niceUrl = baseUrl;
    if(niceUrl.charAt(niceUrl.length-1) !== "/"){
        niceUrl += "/";
    }
    if(path.length> 1){
        if(path.charAt(0) === "/"){
            return niceUrl+path.slice(1, path.length-1);
        }
        return niceUrl+path;
    }else{
        if(path === '/') return niceUrl;
        return niceUrl+path;
    }
}

/**
 * GET request to the Firebase Admin backend API
 * @param path the path to append to the env varibale "ADMIN_BACKEND_URL"
 * @returns {any | undefined} undefined if there is an issue with the token generation or the data in response to the request
 */
const adminGetRequest = async (path: string, options?: AxiosRequestConfig) => {
    // Gets the tokenId from the currentUser
    const tokenID = await auth.currentUser?.getIdToken();
    // If there is an issue with the idToken generation returns undefined
    if(!tokenID) return undefined;
    // Makes the GET request to the Firebase Admin Backend
    const response = await axios.get(fullPath(path), {
        ...options,
        headers: {
            authorization: `Bearer ${tokenID}`
        }
    })
    return response.data;
}

/**
 * POST request to the Firebase Admin backend API
 * @param path the path to append to the env varibale "ADMIN_BACKEND_URL"
 * @param body the object to put in the post body
 * @returns {any | undefined} undefined if there is an issue with the token generation or the data in response to the request
 */
const adminPostRequest = async (path: string, body?: object, options?: AxiosRequestConfig) => {
    // Gets the tokenId from the currentUser
    const tokenID = await auth.currentUser?.getIdToken();
    // If it's invalid or there is no currentUser it will return undefined
    if(!tokenID) return undefined;
    // Makes the POST request to the Firebase Admin Backend
    const response = await axios.post(fullPath(path), body, {
        ...options,
        headers: {
            authorization: `Bearer ${tokenID}`
        }
    });
    return response.data;
}

export {adminGetRequest, adminPostRequest}