var https = require('https');
var axios = require('axios');


function getData(url, callback) {
    https.get(url, (res) => {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            callback(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    // fetch(url).then(data => {
    //     callback(data)
    // })
}

// function fetch(url) {
//     return axios.get(url)
// }

module.exports = getData;