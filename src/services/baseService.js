import axios from 'axios';

// universal methode to call api
export function _callApi(data, url, headerdata = '', method = 1) {
    console.log('env : ', process.env);
    var result;

    let defaultSetting = {
        "_SERVERURL" : "http://devapi.livelinesports.in/api/",
        "_AUTH":"Basic c3BvcnRMaW5lOnNwb3J0TGluZQ=="
    }

    let siteSetting = defaultSetting;

    switch (process.env.REACT_APP_ENV) {
        case "prod" :
        case  "production":
            siteSetting = {
                "_SERVERURL" : "http://localhost:6002/chat-demo/api/v1/",
                "_AUTH":"Basic c2xsQGF1dGg6c2xsYWRtaW4xMjM="
            }
            break;
        case "stag" :
        case  "staging":
            siteSetting ={
                "_SERVERURL" : "http://localhost:6002/chat-demo/api/v1/",
                "_AUTH":"Basic c2xsQGF1dGg6c2xsYWRtaW4xMjM="
            }
            break;
        case "dev" :
        case  "development":
            siteSetting = {
                "_SERVERURL" : "http://localhost:6002/chat-demo/api/v1/",
                "_AUTH":"Basic c2xsQGF1dGg6c2xsYWRtaW4xMjM="
            }
            break;
        case "local" :
        case  "localhost":
            siteSetting = {
                "_SERVERURL" : "http://localhost:6002/chat-demo/api/v1/",
                "_AUTH":"Basic c3BvcnRMaW5lOnNwb3J0TGluZQ=="
            }
            break;
        default:
            siteSetting = defaultSetting;
    }

    if (headerdata === '') {
        headerdata = {
            'accessToken': localStorage.getItem('accessToken'),
            'Authorization': siteSetting._AUTH
        };
    }else{
        headerdata = {
            'Authorization': siteSetting._AUTH
        };
    }

    var instance = axios.create({
        baseURL: siteSetting._SERVERURL,
        timeout: 30000,
        headers: headerdata
    });

    if (method === 1) {

        // if method post
        result = instance.post(url, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
    if (method === 2) {

        // if method get
        result = instance.get(url, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
    return result;

}
