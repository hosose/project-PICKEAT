const request = require('supertest');
const should = require('should');
const { createApp } = require('../app');
const { database } = require('../models/dataSource');
const { signUp } = require('../services/userService');

describe('POST /users/signup', () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await database.initialize();
  });
  afterAll(async () => {
    await database.query(`SET foreign_key_checks = 0;`);
    await database.query(`TRUNCATE TABLE users;`);
    await database.query(`SET foreign_key_checks = 1;`);
    await database.destroy();
  });
  describe('Success!', () => {
    it('Sign up return with status 201', async () => {
      const user = {
        name: '옥택연',
        email: 'taekyeon@naver.com',
        password: 'taekyeon112!',
        phonenumber: '010-3434-5656',
      };
      await request(app).post('/users/signup').send(user).expect(201);
    });
  });
  describe('Fail!', () => {
    it('1. One of the body value missing return with 401 error', async () => {
      const user = {
        name: 'hosose',
        email: '',
        password: 'hosose112!',
        phonenumber: '010-1212-5656',
      };
      await request(app).post('/users/signup').send(user).expect(401);
    });
    it('2. Email does not fit RegEx return with 400 error', async () => {
      const user2 = {
        name: 'hosose',
        email: 'wdjwk12@navercom',
        password: 'hosose112!',
        phonenumber: '010-1312-5656',
      };
      await request(app).post('/users/signup').send(user2).expect(400);
    });
    it('3. Password does not fit RegEx return with 400 error', async () => {
      const user2 = {
        name: 'hosose',
        email: 'wdjwk12@naver.com',
        password: 'hos!',
        phonenumber: '010-1312-5656',
      };
      await request(app).post('/users/signup').send(user2).expect(400);
    });
    it('4. Duplicated email return with 400 error', async () => {
      const user2 = {
        name: 'hosose',
        email: 'taekyeon@naver.com',
        password: 'hosose112!',
        phonenumber: '010-1312-5656',
      };
      await request(app).post('/users/signup').send(user2).expect(400);
    });
  });
});

describe('POST /users/signin', () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await database.initialize();
    const user = {
      name: '호소세',
      email: 'hosose12@naver.com',
      password: 'hosose112!',
      phonenumber: '010-1212-4545',
    };
    await signUp(user.email, user.password, user.name, user.phonenumber);
  });
  afterAll(async () => {
    await database.query(`SET foreign_key_checks = 0;`);
    await database.query(`TRUNCATE TABLE users;`);
    await database.query(`SET foreign_key_checks = 1;`);
    await database.destroy();
  });
  describe('Success!', () => {
    it('Sign in return with status 200', async () => {
      const user = { email: 'hosose12@naver.com', password: 'hosose112!' };
      await request(app).post('/users/signin').send(user).expect(200);
    });
  });
  describe('Fail!', () => {
    it('1. One of the body value missing return with 401 error', async () => {
      const user = { email: '', password: 'hosose112!' };
      await request(app).post('/users/signin').send(user).expect(401);
    });
    it('2. No user return with 400 error', async () => {
      const user = { email: 'wrong@naver.com', password: 'hosose112!' };
      await request(app).post('/users/signin').send(user).expect(400);
    });
    it('3. wrong password return with 401 error', async () => {
      const user = { email: 'hosose12@naver.com', password: 'wrongPassword!' };
      await request(app).post('/users/signin').send(user).expect(401);
    });
  });
});
