export const throwErrorsIfNotOk = (response: Response) => {
    if (response.ok) {
        return response;
    }

    console.error(`API request to '${response.url}' failed: (${response.status}) ${response.statusText}`);
    switch (response.status) {
        case 404:
            throw Error(`Could not find the requested data: (${response.status}) ${response.statusText}`);
        case 500:
            throw Error(`Could not connect to server: (${response.status}) Internal server error`);
        default:
            throw Error(`Request failed: (${response.status}) ${response.statusText}`);
    }
};
