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

describe('## Model APIs', () => {
  let model = {
    name: 'initial string',
    description: 'initial string',

  };

  describe('# POST /api/models', () => {
    it('should create a new model', (done) => {
      request(app)
        .post('/api/models')
        .send(model)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(model.name);
          expect(res.body.params).to.equal(model.params);
          expect(res.body.description).to.equal(model.description);

          model = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/models/:modelId', () => {
    it('should get model details', (done) => {
      request(app)
        .get(`/api/models/${model._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(model.name);
          expect(res.body.params).to.equal(model.params);
          expect(res.body.description).to.equal(model.description);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when model does not exists', (done) => {
      request(app)
        .get('/api/models/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/models/:modelId', () => {
    it('should update model details', (done) => {
      model.name = 'KK';
      model.description = 'KK';

      request(app)
        .put(`/api/models/${model._id}`)
        .send(model)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.description).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/models/', () => {
    it('should get all models', (done) => {
      request(app)
        .get('/api/models')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all models (with limit and skip)', (done) => {
      request(app)
        .get('/api/models')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/models/', () => {
    it('should delete model', (done) => {
      request(app)
        .delete(`/api/models/${model._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.description).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });
});
