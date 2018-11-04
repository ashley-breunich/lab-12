'use strict';

// dynamic? Maybe put this in an array an repeat all tests ...
process.env.STORAGE = 'mongo';

// Mock mongoose
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
let mongoServer;

// Unmock our model (might have been mocked by a previous test)
jest.unmock('require-directory');

// Mock Server
const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, (err) => {
    if (err) console.error('Mongo Connection Error', err);
  });
});

afterAll(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('api server', () => {

  it('should respond with a 500 on an invalid model', () => {

    return mockRequest
    .get('/booboo')
    .then(results => {
      expect(results.status).toBe(404);
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
    .post('/api/v1/foo/12')
    .then(results => {
      expect(results.status).toBe(404);
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });

  });

  it('should respond properly on a get request to a valid model', () => {

    return mockRequest
    .get('/api/v1/categories')
    .then(results => {
      expect(results.status).toBe(200);
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });

  });

  it('should be able to post to /api/v1/categories', ()  => {
    
    let obj = {name:'Sandals', display_name:'Soludos Sandals', description:'These are shoes.'};

    return mockRequest
    .post('/api/v1/categories')
    .send(obj)
    .then(results => {
      expect(results.status).toBe(200);
      expect(results.body.name).toEqual(obj.name);
    })
    .catch( err => console.error('err', err) );

  });

  it('should be able to post to /api/v1/products', ()  => {
    
    let obj = {category:'Sneakers', name:'Nike Sneakers', display_name:'Nike Sneakers', description:'These are shoes.'};

    return mockRequest
    .post('/api/v1/products')
    .send(obj)
    .then(results => {
      expect(results.status).toBe(200);
      expect(results.body.name).toEqual(obj.name);
    })
    .catch( err => console.error('err', err) );

  });


  it('following a post, should find a single record - categories', () => {

    let obj = {name:'Sandals', display_name:'Soludos Sandals', description:'These are shoes.'};

    return mockRequest
    .post('/api/v1/categories')
    .send(obj)
    .then(results => {
      return mockRequest.get(`/api/v1/categories/${results.body._id}`)
      .then(list => {
        expect(list.body[0].name).toEqual(obj.name);
        expect(list.status).toBe(200);
      })
    })
    .catch( err => console.error('err', err) );

  });

  it('following a post, should find a single record - products', () => {

    let obj = {category:'Sneakers', name:'Nike Sneakers', display_name:'Nike Sneakers', description:'These are shoes.'};

    return mockRequest
    .post('/api/v1/products')
    .send(obj)
    .then(results => {
      return mockRequest.get(`/api/v1/products/${results.body._id}`)
      .then(list => {
        expect(list.body[0].name).toEqual(obj.name);
        expect(list.status).toBe(200);
      })
    })
    .catch( err => console.error('err', err) );

  });

  it('following multiple posts, should return the correct count - categories', () => {

    return mockRequest
    .get('/api/v1/categories')
    .then(results => {
      expect(results.body.count).toEqual(2);
      expect(results.status).toBe(200);
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });

  });

});

it('following multiple posts, should return the correct count - products', () => {

  return mockRequest
  .get('/api/v1/products')
  .then(results => {
    expect(results.body.count).toEqual(2);
    expect(results.status).toBe(200);
  })
  .catch(err => {
    expect(err).not.toBeDefined();
  });

});

it('following a put, should update a single record', () => {

  let obj = {name:'Pumps', display_name:'Manolo Blahnik Pumps', description:'These are shoes.', _id:10};
  let objUpdated = {name:'Heels', display_name:'Manolo Blahnik Pumps', description:'These are shoes.',_id:10};

  return mockRequest
  .post('/api/v1/categories')
  .send(obj)
  .then(results => {
    return mockRequest.put(`/api/v1/categories/10`)
    .send(objUpdated)
    .then(list => {
      expect(list.body[0].name).toEqual(objUpdated.name);
      expect(list.status).toBe(200);
    })
  })
  .catch( err => console.error('err', err) );

});

it('following a delete, the record will be removed - categories', () => {

  let obj = {name:'Sneakers', display_name:'Nike Sneakers', description:'These are shoes.'};

  return mockRequest
  .post('/api/v1/categories')
  .send(obj)
  .then(results => {
    return mockRequest.delete(`/api/v1/categories/${results.body._id}`)
    .then(list => {
      expect(list.status).toBe(200);
    })
  })
  .catch( err => console.error('err', err) );

});

it('following a delete, the record will be removed - products', () => {

  let obj = {category:'Sneakers', name:'Nike Sneakers', display_name:'Nike Sneakers', description:'These are shoes.'};

  return mockRequest
  .post('/api/v1/products')
  .send(obj)
  .then(results => {
    return mockRequest.delete(`/api/v1/products/${results.body._id}`)
    .then(list => {
      expect(list.status).toBe(200);
    })
  })
  .catch( err => console.error('err', err) );

});