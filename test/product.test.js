const request = require('supertest');
const should = require('should');
const { createApp } = require('../app');
const { database } = require('../models/dataSource');

describe('GET /pruducts', () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await database.initialize();
  });
  afterAll(async () => {
    await database.destroy();
  });
  describe('Success!', () => {
    it('Get Product by parameter return with status 201', async () => {
      const query = 'type=단과강의&name=한식&name=멕시코';
      await request(app)
        .get(encodeURI(`/products?${query}`))
        .expect(200);
    });
  });
});
