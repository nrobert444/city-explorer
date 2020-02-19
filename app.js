const express = require('express');
const request = require('superagent');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());

let lat;
let lng;

const getWeatherData = async(lat, lng) => {
    const weather = await request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}`);

    const results = weather.body.daily.data;

    return results.map(result =>{
        return { 
            forecast: result.summary,
            time: new Date(result.time * 1000),  
        };   
    });
};

app.get('/weather/', async(req, res, next) => {
    try {
        const portlandWeather = await getWeatherData(lat, lng);

        res.json(portlandWeather);
    } catch (err) {
        next(err);
    }
});


app.get('/location/', async(req, res, next) => {
    try {
        const location = req.query.search;
        const URL = (`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${location}&format=json`);

        const cityData = await request.get(URL);
        const firstResult = cityData.body[0];

        lat = firstResult.lat;
        lng = firstResult.lon;


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

// app.get('/reviews' async(req, res)=> {
//     const yelpStuff = await request.get(`yelp url`)).set('Authorization', 'Bearer ${process.env.YELP_API_KEY}');

//     res.json(yelpStuff);
// })

// app.get('/events' async(req, res)=> {
//     const eventStuff = await request.get(`yelp url`)).setEncoding('Authorization', 'Bearer ${process.env.YELP_API_KEY}');

//     res.json(eventStuff);

app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));




module.exports = { app };