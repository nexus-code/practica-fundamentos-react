import AdModel from '../models/AdModel';

const API_URL = 'http://localhost:3001/apiv1/';

/*
    API: https://github.com/IsmaelB83/keepcoding-backend-node


    Revisar los métodos de llamada a la API, sólo están esbozados.

    Fuente:
    - https://stackblitz.com/edit/react-3rd-movie-class-example?file=services%2FMovieDBService.js

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
        .then(res => res.results);
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
}

const searchAds = (query) => {
    
    const url = query === '' ? `${API_URL}anuncios` : `${API_URL}anuncios/?${query}`;
    
    return getRequest(url)
        .then(res => res.results.map(ad => new AdModel(ad)))
}

export {
    getTagsList,
    searchAds,
    getAdDetail
};