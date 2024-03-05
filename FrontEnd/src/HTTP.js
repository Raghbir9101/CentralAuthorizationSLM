import axios from "axios"

function getURL(link) {
    const parsedURL = new URL(link);

    // Get the protocol and hostname to create the base URL
    const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;

    return baseURL;
}


const currentURL = window.location.href;
// let apiLink = `${getURL(currentURL)}/`;
let apiLink = `${getURL(currentURL)}/api/`;
export default {
    get: function (route, token) {
        const headers = {
            'Authorization': `Bearer ${token || (sessionStorage.getItem('token') || "")}`
        }
        try {
            return axios.get(`${apiLink}${route}`, { headers })
        }
        catch (err) { }
    },
    post: function (route, data, token) {
        const headers = {
            'Authorization': `Bearer ${token || (sessionStorage.getItem('token') || "")}`
        }
        try {
            return axios.post(`${apiLink}${route}`, data, { headers })
        }
        catch (err) { }
    },
    patch: function (route, data, token) {
        const headers = {
            'Authorization': `Bearer ${token || (sessionStorage.getItem('token') || "")}`
        }
        try {
            return axios.patch(`${apiLink}${route}`, data, { headers })
        }
        catch (err) { }
    },
    put: function (route, data, token) {
        const headers = {
            'Authorization': `Bearer ${token || (sessionStorage.getItem('token') || "")}`
        }
        try {
            return axios.put(`${apiLink}${route}`, data, { headers })
        }
        catch (err) { }
    },
    delete: function (route, token) {
        const headers = {
            'Authorization': `Bearer ${token || (sessionStorage.getItem('token') || "")}`
        }
        try {
            return axios.delete(`${apiLink}${route}`, { headers })
        }
        catch (err) { }
    }
}