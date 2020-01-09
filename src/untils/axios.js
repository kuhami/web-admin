import axios from 'axios'

function getInner(url, params) {
    return axios
        .get({
            url,
            params
        })
        .then(res => handleResponse(res))
}

function postInner(url, params) {
    return axios
        .post(
            url,
            params
        )
        .then(res => handleResponse(res))
}


function handleResponse(res) {
    const resStatusInfo = res.data;
    return new Promise((resolve, reject) => {
        if (+res.status === 200) {

            resolve(resStatusInfo.data);
        }
        reject(resStatusInfo)
    })
}


export { getInner, postInner }