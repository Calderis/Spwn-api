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

describe('## Module APIs', () => {
  let module = {
    name: 'initial string',

  };

  describe('# POST /api/modules', () => {
    it('should create a new module', (done) => {
      request(app)
        .post('/api/modules')
        .send(module)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(module.name);
          expect(res.body.template).to.equal(module.template);

          module = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/modules/:moduleId', () => {
    it('should get module details', (done) => {
      request(app)
        .get(`/api/modules/${module._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(module.name);
          expect(res.body.template).to.equal(module.template);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when module does not exists', (done) => {
      request(app)
        .get('/api/modules/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/modules/:moduleId', () => {
    it('should update module details', (done) => {
      module.name = 'KK';

      request(app)
        .put(`/api/modules/${module._id}`)
        .send(module)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/modules/', () => {
    it('should get all modules', (done) => {
      request(app)
        .get('/api/modules')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all modules (with limit and skip)', (done) => {
      request(app)
        .get('/api/modules')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/modules/', () => {
    it('should delete module', (done) => {
      request(app)
        .delete(`/api/modules/${module._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });
});
