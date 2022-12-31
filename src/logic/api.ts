export const apiHostUrl = process.env.NODE_ENV === "production" ? "" :
    (window.location.hostname === "localhost" ?
        "http://localhost:8080" : window.location.origin);
const apiBaseUrl = `${apiHostUrl}/api/v1`;

const get = (url: string) => fetch(url, {
    method: "GET",
    credentials: 'include',
    headers: {
        "Accept": "application/json",
    },
    mode: 'cors',
});

export const api = {
    users: {
        me: () => get(`${apiBaseUrl}/users/me`)
    },
    cars: {
        logs: {
            all: () => get(`${apiBaseUrl}/cars/logs`)
        }
    }
}
