const request = require('supertest');
const { app } = require('./app.js');

describe('GET /  ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/location');

        expect(response.body).toEqual({
            formatted_query: expect.any(String), 
            latitude: expect.any(Number), 
            longitude: expect.any(Number)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});


describe('GET /  ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/weather');

        expect(response.body).toEqual({
            forecast: expect.any(String),
            time: expect.any(Number) 
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});



describe('GET /  ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/reviews');

        expect(response.body).toEqual({
            name: expect.any(String),
            image: expect.any(String),
            price: expect.any(String),
            rating: expect.any(String),
            url: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});



describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/trails');

        expect(response.body).toEqual({
            name: expect.any(String),
            location: expect.any(String),
            length: expect.any(String),
            stars: expect.any(String),
            star_votes: expect.any(String),
            summary: expect.any(String),
            trail_url: expect.any(String),
            conditions: expect.any(String),
            condition_date: expect.any(String),
            condition_time: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});


describe('GET /  ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/events');

        expect(response.body).toEqual({
            link: expect.any(String),
            name: expect.any(String),            
            event_date: expect.any(String),
            summary: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});