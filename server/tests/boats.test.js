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

describe('## Boat APIs', () => {
  let boat = {
                  name: 'initial string',
      
              brand: 'initial string',
      
      
              price: 42,

  };

  describe('# POST /api/boats', () => {
    it('should create a new boat', (done) => {
      request(app)
        .post('/api/boats')
        .send(boat)
        .expect(httpStatus.OK)
        .then((res) => {
                      expect(res.body.name).to.equal(boat.name);
            expect(res.body.brand).to.equal(boat.brand);
            expect(res.body.price).to.equal(boat.price);

          boat = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/boats/:boatId', () => {
    it('should get boat details', (done) => {
      request(app)
        .get(`/api/boats/${boat._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
                      expect(res.body.name).to.equal(boat.name);
            expect(res.body.brand).to.equal(boat.brand);
            expect(res.body.price).to.equal(boat.price);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when boat does not exists', (done) => {
      request(app)
        .get('/api/boats/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/boats/:boatId', () => {
    it('should update boat details', (done) => {
                        boat.name = 'KK';
        
                  boat.brand = 'KK';
        
        
                  boat.price = 24;

      request(app)
        .put(`/api/boats/${boat._id}`)
        .send(boat)
        .expect(httpStatus.OK)
        .then((res) => {
          
                                    expect(res.body.name).to.equal('KK');
            
                          expect(res.body.brand).to.equal('KK');
            
            
                          expect(res.body.price).to.equal(24);

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/boats/', () => {
    it('should get all boats', (done) => {
      request(app)
        .get('/api/boats')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all boats (with limit and skip)', (done) => {
      request(app)
        .get('/api/boats')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/boats/', () => {
    it('should delete boat', (done) => {
      request(app)
        .delete(`/api/boats/${boat._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
                                    expect(res.body.name).to.equal('KK');
            
                          expect(res.body.brand).to.equal('KK');
            
            
                          expect(res.body.price).to.equal(24);

          done();
        })
        .catch(done);
    });
  });
});
