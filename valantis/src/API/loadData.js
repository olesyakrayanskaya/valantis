import getPassword from '../utils/getPassword';

export default function loadData(request) {
    function loadDataRetry(requestBody, retryCount) {
        console.log("Try to load " + retryCount)
        if(retryCount > 0) {
            return fetch(process.env.REACT_APP_URL, requestBody)
            .then((response) => {
                if(response.status >= 500) {
                    console.log("Request failed. Status: " + response.status)
                    return loadDataRetry(requestBody, retryCount - 1);
                } else if (!response.ok) {
                    console.log("Request failed. Status: " + response.status)
                    throw new Error("HTTP status " + response.status);
                } else {
                    return response
                }
            })
        } else {
            throw new Error("Retry limit is over. HTTP status " + response.status);
        }
    }

    const requestBody = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-Auth': getPassword(),
        },
    };

    return loadDataRetry(requestBody, Number(process.env.REACT_APP_RETRY_COUNT))
        .then((response) => response.json())
        .catch((err) => {
            console.error(err.message);
            throw err;
        });
}
