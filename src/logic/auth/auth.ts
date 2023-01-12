import {api} from "../api";
import {throwErrorsIfNotOk} from "../apiUtils";
import {ApiKeysJson, Auth, AuthUser} from "./models";

const auth: Auth = {
    user: undefined,
    isLoggedIn: undefined,
    googleApiKey: undefined,
};

export const authGetUserInfo = () => {
    return api.users.me()
        .then(throwErrorsIfNotOk)
        .then(response => response.json())
        .then((response: AuthUser) => {
            auth.user = response;
            auth.isLoggedIn = true;

            return authGetApiKeys();
        })
        .catch(error => {
            console.error("Failed to fetch user info", error);
            auth.isLoggedIn = false;
        })
}

export const authGetApiKeys = () => {
    return api.system.apiKeys()
        .then(throwErrorsIfNotOk)
        .then(response => response.json())
        .then((response: ApiKeysJson) => {
            auth.googleApiKey = response.googleMaps;
        })
        .catch(error => {
            console.error("Failed to fetch api keys", error);
            auth.googleApiKey = undefined;
        })
}

export default auth;
