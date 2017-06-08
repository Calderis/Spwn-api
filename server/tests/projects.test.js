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

describe('## Project APIs', () => {
  let project = {
    name: 'initial string',
    image: 'initial string',

  };

  describe('# POST /api/projects', () => {
    it('should create a new project', (done) => {
      request(app)
        .post('/api/projects')
        .send(project)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.name).to.equal(project.name);
            expect(res.body.image).to.equal(project.image);
            expect(res.body.models).to.equal(project.models);
            expect(res.body.modules).to.equal(project.modules);

          project = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/projects/:projectId', () => {
    it('should get project details', (done) => {
      request(app)
        .get(`/api/projects/${project._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.name).to.equal(project.name);
            expect(res.body.image).to.equal(project.image);
            expect(res.body.models).to.equal(project.models);
            expect(res.body.modules).to.equal(project.modules);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when project does not exists', (done) => {
      request(app)
        .get('/api/projects/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/projects/:projectId', () => {
    it('should update project details', (done) => {
      project.name = 'KK';
      project.image = 'KK';

      request(app)
        .put(`/api/projects/${project._id}`)
        .send(project)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.image).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/projects/', () => {
    it('should get all projects', (done) => {
      request(app)
        .get('/api/projects')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all projects (with limit and skip)', (done) => {
      request(app)
        .get('/api/projects')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/projects/', () => {
    it('should delete project', (done) => {
      request(app)
        .delete(`/api/projects/${project._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.image).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });
});
