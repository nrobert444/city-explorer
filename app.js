const express = require('express');
const request = require('superagent');
const app = express();
const darkSky = require('./Data/darkSky.json');
const port = process.env.PORT || 3000;
const geoData = require('./Data/geo.json');


app.get('/weather/', (request, respond) => {
    const forecast = darkSky.daily.data;

    respond.json({
        forecast: forecast.summary,
        time: forecast.time
    });
});

app.get('/location/', (request, respond) => {
    const cityData = geoData.results[0];
    respond.json(
        {
            formatted_query: cityData.formatted_address,
            latitude: cityData.geometry.location.lat,
            longitude: cityData.geometry.location.lng
        });
});
// has to go into it's own index.js file for testing later
app.listen(port, () => {
    console.log('<-----------blast off!---------------->');
});


app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));




// module.exports = {
//     app, };