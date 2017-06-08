import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Plane APIs', () => {
  let plane = {
                  brand: 'initial string',
      
      
              price: 42,

  };

  describe('# POST /api/planes', () => {
    it('should create a new plane', (done) => {
      request(app)
        .post('/api/planes')
        .send(plane)
        .expect(httpStatus.OK)
        .then((res) => {
                      expect(res.body.brand).to.equal(plane.brand);
            expect(res.body.price).to.equal(plane.price);

          plane = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/planes/:planeId', () => {
    it('should get plane details', (done) => {
      request(app)
        .get(`/api/planes/${plane._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
                      expect(res.body.brand).to.equal(plane.brand);
            expect(res.body.price).to.equal(plane.price);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when plane does not exists', (done) => {
      request(app)
        .get('/api/planes/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/planes/:planeId', () => {
    it('should update plane details', (done) => {
                        plane.brand = 'KK';
        
        
                  plane.price = 24;

      request(app)
        .put(`/api/planes/${plane._id}`)
        .send(plane)
        .expect(httpStatus.OK)
        .then((res) => {
          
                                    expect(res.body.brand).to.equal('KK');
            
            
                          expect(res.body.price).to.equal(24);

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/planes/', () => {
    it('should get all planes', (done) => {
      request(app)
        .get('/api/planes')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all planes (with limit and skip)', (done) => {
      request(app)
        .get('/api/planes')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/planes/', () => {
    it('should delete plane', (done) => {
      request(app)
        .delete(`/api/planes/${plane._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
                                    expect(res.body.brand).to.equal('KK');
            
            
                          expect(res.body.price).to.equal(24);

          done();
        })
        .catch(done);
    });
  });
});
