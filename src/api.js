const { default: axios } = require('axios');
const config = require('../config.json');

exports.getIntraData = (cookie) => {
    let result = {};

    return new Promise((resolve, reject) => {
        axios.get(config.url.profil, { headers: { Cookie: `user=${cookie}` }, withCredentials: true })
            .then(function (res) {
                result["profil"] = res.data;
                axios.get(`https://intra.epitech.eu/user/${res.data.login}/netsoul/?format=json`, { headers: { Cookie: `user=${cookie}` }, withCredentials: true })
                    .then(function (res) {
                        result["netsoul"] = res.data;
                        resolve(result);
                    }).catch(err => {
                        console.log("Error !");
                        console.error(err);
                        reject(err);
                    })
            }).catch(err => {
                console.log("Error !");
                console.error(err);
                reject(err);
            })
    })
}