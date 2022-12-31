import {api} from "../api";
import {throwErrorsIfNotOk} from "../apiUtils";
import {Auth, AuthUser} from "./models";

const auth = {
    user: undefined,
    isLoggedIn: undefined,
} as Auth;

export const authGetUserInfo = () => {
    return api.users.me()
        .then(throwErrorsIfNotOk)
        .then(response => response.json())
        .then((response: AuthUser) => {
            auth.user = response;
            auth.isLoggedIn = true;
        })
        .catch(error => {
            console.error("Failed to fetch user info", error);
            auth.isLoggedIn = false;
        })
}


export default auth;
