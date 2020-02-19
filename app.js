const express = require('express');
const request = require('superagent');
const app = express();
const weather = require('./Data/darkSky.json');
const port = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();
app.use(cors());

let lat;
let lng;

const getWeatherData = (lat, lng) => {
    const URL = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`;

    return weather.daily.data.map(forecast =>{
        return { 
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000),  
        };   
    });
};

app.get('/weather/', (req, res) => {
    const portlandWeather = getWeatherData(lat, lng);

    res.json(portlandWeather);
});


app.get('/location/', async(req, res, next) => {
    try {
        const location = req.query.search;
        const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${location}&format=json`;
        lat = firstResult.lat;
        lng = firstResult.lon;

        const cityData = await request.get(URL);
        const firstResult = cityData.body[0];

        res.json(
            {
                formatted_query: firstResult.display_name,
                latitude: lat,
                longitude: lng
            });
    } catch (err) {
        next(err);
    }
});


app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));




// module.exports = {
//     app, };