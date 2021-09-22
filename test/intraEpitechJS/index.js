const axios = require('axios');

const url = "https://intra.epitech.eu/user/?format=json"
let headers = {headers: {
    Cookie: "user=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InRvbS5yaXZlc0BlcGl0ZWNoLmV1IiwidHoiOm51bGwsImV4cCI6MTYzMjEzMDM3OH0.WOL5eP843TQQNYrGXxqWTHv6z1cfwG21Vxv33kUhQLM"
}};

let login = null;

axios.get(url, headers).then(resp => {
    console.log(resp.data);
    login = resp.data["login"];
    console.log(login);

    axios.get(`https://intra.epitech.eu/user/${login}/netsoul`, headers).then(resp => {
        console.log(resp.data.slice(-10));
    }).catch( err => {
        console.log("Error");
        if (err.response.status === 403)
            return console.error("Bad auth !");
    })
}).catch( err => {
    console.log("Error");
    if (err.response.status === 403)
        return console.error("Bad auth !");
    else
        console.error(err);
})