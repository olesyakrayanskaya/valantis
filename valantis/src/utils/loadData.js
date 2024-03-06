import getPassword from './getPassword';

export default async function loadData(request) {
    return fetch('https://api.valantis.store:41000', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-Auth': getPassword(),
        },
    })
        .then((response) => response.json())
        .catch((err) => {
            console.error(err.message + ' ggggggggggggg');
            throw err;
        });
}
