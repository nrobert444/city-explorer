const express = require('express');
// const request = require('superagent');
const app = express();
const weather = require('./Data/darkSky.json');
const port = process.env.PORT || 3000;
const geoData = require('./Data/geo.json');
const cors = require('cors');

app.use(cors());

let lat;
let lng;

const getWeatherData = (/*lat, lng*/) => {
    return weather.daily.data.map(forecast =>{
        return { 
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000),  
        };   
    });
};
console.log(getWeatherData())

app.get('/weather/', (req, res) => {
    const portlandWeather = getWeatherData(/*lat, lng*/);

    res.json(portlandWeather);
});


app.get('/location/', (req, res) => {
    // const location = request.query.search;
    
    lat = cityData.geometry.location.lat;
    lng = cityData.geometry.location.lng;

    const cityData = geoData.results[0];

    res.json(
        {
            formatted_query: cityData.formatted_address,
            latitude: cityData.geometry.location.lat,
            longitude: cityData.geometry.location.lng
        });
});

app.listen(port, () => {
    console.log('<-----------blast off!---------------->');
});


app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));




// module.exports = {
//     app, };