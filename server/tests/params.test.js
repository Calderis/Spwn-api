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

describe('## Param APIs', () => {
  let param = {
    name: 'initial string',
    type: 'initial string',
    classname: 'initial string',

  };

  describe('# POST /api/params', () => {
    it('should create a new param', (done) => {
      request(app)
        .post('/api/params')
        .send(param)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.name).to.equal(param.name);
            expect(res.body.type).to.equal(param.type);
            expect(res.body.classname).to.equal(param.classname);

          param = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/params/:paramId', () => {
    it('should get param details', (done) => {
      request(app)
        .get(`/api/params/${param._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.name).to.equal(param.name);
            expect(res.body.type).to.equal(param.type);
            expect(res.body.classname).to.equal(param.classname);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when param does not exists', (done) => {
      request(app)
        .get('/api/params/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/params/:paramId', () => {
    it('should update param details', (done) => {
      param.name = 'KK';
      param.type = 'KK';
      param.classname = 'KK';

      request(app)
        .put(`/api/params/${param._id}`)
        .send(param)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.type).to.equal('KK');
          expect(res.body.classname).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/params/', () => {
    it('should get all params', (done) => {
      request(app)
        .get('/api/params')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all params (with limit and skip)', (done) => {
      request(app)
        .get('/api/params')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/params/', () => {
    it('should delete param', (done) => {
      request(app)
        .delete(`/api/params/${param._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.type).to.equal('KK');
          expect(res.body.classname).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });
});
