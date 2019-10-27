import AdModel from '../models/AdModel';

const API_URL = 'http://localhost:3001/apiv1/';

/*
    API: https://github.com/IsmaelB83/keepcoding-backend-node
*/

const getRequest = (url) => {
    return fetch(url,
        { method: "GET" },
        { Accept: "application/json, text/plain, */*" },
        { mode: "cors" }
    )
    .then(res => res.json());
}

const getTagsList = () => {
    // [] of tags (strings)
    return getRequest(`${API_URL}tags`)
        .then(res => res.results)
        .catch(error => console.error('Error:', error));
}

const getAdDetail = (adID) => {
    return getRequest(`${API_URL}anuncios/${adID}`)
        .then(res => {
            if (!res.success) {
                return res;
            } else {
                return new AdModel(res.result);
            }
        })
        .catch(error => console.error('Error:', error));
}

const searchAds = (query) => {
    
    const url = query === '' ? `${API_URL}anuncios` : `${API_URL}anuncios/?${query}`;
    
    console.log('', url);

    return getRequest(url)
        .then(res => res.results.map(ad => new AdModel(ad)))
        .catch(error => console.error('Error:', error));
}

const saveAd = (ad, method, id) => {

    // ad: {advertisement}
    // method: POST / PUT (for insert / update ) 
    // id: empty in POST. advertisement ID with PUT

    return fetch(`${API_URL}anuncios/${id}`, {
        method: `${method}`,
        body: JSON.stringify(ad), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            // the API returns status, but not de advert sent 
            if (res.status === 200) {
                return 'OK';
            } else {
                return res;
            }
        })
        .catch(error => console.error('Error:', error));
}

export {
    getTagsList,
    searchAds,
    getAdDetail,
    saveAd
};