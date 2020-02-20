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

app.get('/weather/', async(req, res) => {
    try {
        const portlandWeather = await getWeatherData(lat, lng);

        res.json(portlandWeather);
    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});


app.get('/location/', async(req, res) => {
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
        res.status(500).send('Sorry something went wrong, please try again');

    }
});

app.get('/reviews', async(req, res) => {
    try {
        const yelp = await request.get(`https://api.yelp.com/v3/businesses/search/term=restaurants&latitude=${lat}&longitude=${lng}`).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);
        
        const yelpStuff = yelp.body.businesses.map(business =>{
            return {
                name: business.name,
                image: business.image_url,
                price: business.price,
                rating: business.rating,
                url: business.url
            };
        });
        
        res.json(yelpStuff);

    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/events', async(req, res) => {
    try {
        const evBrite = await request.get(`http://api.eventful.com/rest/events/search?app_key=${process.env.EVENTBRITE_API_KEY}&where=${lat},${lng}&within=25`);

        
        const eventBriteStuff = evBrite.body.businesses.map(event =>{
            return {
                link: event.url,
                name: event.title,
                event_date: event.start_time,
                summary: event.description
            };
        });
        
        res.json(eventBriteStuff);

    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));




module.exports = { app };