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

describe('## Template APIs', () => {
  let template = {
    name: 'initial string',
    stared: 42,
    codepath: 'initial string',

  };

  describe('# POST /api/templates', () => {
    it('should create a new template', (done) => {
      request(app)
        .post('/api/templates')
        .send(template)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.name).to.equal(template.name);
            expect(res.body.used).to.equal(template.used);
            expect(res.body.stared).to.equal(template.stared);
            expect(res.body.indexed).to.equal(template.indexed);
            expect(res.body.validated).to.equal(template.validated);
            expect(res.body.codepath).to.equal(template.codepath);

          template = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/templates/:templateId', () => {
    it('should get template details', (done) => {
      request(app)
        .get(`/api/templates/${template._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.name).to.equal(template.name);
            expect(res.body.used).to.equal(template.used);
            expect(res.body.stared).to.equal(template.stared);
            expect(res.body.indexed).to.equal(template.indexed);
            expect(res.body.validated).to.equal(template.validated);
            expect(res.body.codepath).to.equal(template.codepath);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when template does not exists', (done) => {
      request(app)
        .get('/api/templates/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/templates/:templateId', () => {
    it('should update template details', (done) => {
      template.name = 'KK';
      template.stared = 24;
      template.codepath = 'KK';

      request(app)
        .put(`/api/templates/${template._id}`)
        .send(template)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.stared).to.equal(24);
          expect(res.body.codepath).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/templates/', () => {
    it('should get all templates', (done) => {
      request(app)
        .get('/api/templates')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all templates (with limit and skip)', (done) => {
      request(app)
        .get('/api/templates')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/templates/', () => {
    it('should delete template', (done) => {
      request(app)
        .delete(`/api/templates/${template._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.stared).to.equal(24);
          expect(res.body.codepath).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });
});
