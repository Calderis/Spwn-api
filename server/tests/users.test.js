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

describe('## User APIs', () => {
  let user = {
    firstname: 'initial string',
    lastname: 'initial string',
    pseudo: 'initial string',
    email: 'initial string',
    password: 'initial string',
    image: 'initial string',
    github: 'initial string',
    stackoverflow: 'initial string',
    linkedin: 'initial string',
    level: 'initial string',

  };

  describe('# POST /api/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/users')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.firstname).to.equal(user.firstname);
            expect(res.body.lastname).to.equal(user.lastname);
            expect(res.body.pseudo).to.equal(user.pseudo);
            expect(res.body.email).to.equal(user.email);
            expect(res.body.password).to.equal(user.password);
            expect(res.body.image).to.equal(user.image);
            expect(res.body.github).to.equal(user.github);
            expect(res.body.stackoverflow).to.equal(user.stackoverflow);
            expect(res.body.linkedin).to.equal(user.linkedin);
            expect(res.body.level).to.equal(user.level);
            expect(res.body.projects).to.equal(user.projects);
            expect(res.body.favoris).to.equal(user.favoris);

          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/:userId', () => {
    it('should get user details', (done) => {
      request(app)
        .get(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.firstname).to.equal(user.firstname);
            expect(res.body.lastname).to.equal(user.lastname);
            expect(res.body.pseudo).to.equal(user.pseudo);
            expect(res.body.email).to.equal(user.email);
            expect(res.body.password).to.equal(user.password);
            expect(res.body.image).to.equal(user.image);
            expect(res.body.github).to.equal(user.github);
            expect(res.body.stackoverflow).to.equal(user.stackoverflow);
            expect(res.body.linkedin).to.equal(user.linkedin);
            expect(res.body.level).to.equal(user.level);
            expect(res.body.projects).to.equal(user.projects);
            expect(res.body.favoris).to.equal(user.favoris);

          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should update user details', (done) => {
      user.firstname = 'KK';
      user.lastname = 'KK';
      user.pseudo = 'KK';
      user.email = 'KK';
      user.password = 'KK';
      user.image = 'KK';
      user.github = 'KK';
      user.stackoverflow = 'KK';
      user.linkedin = 'KK';
      user.level = 'KK';

      request(app)
        .put(`/api/users/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.firstname).to.equal('KK');
          expect(res.body.lastname).to.equal('KK');
          expect(res.body.pseudo).to.equal('KK');
          expect(res.body.email).to.equal('KK');
          expect(res.body.password).to.equal('KK');
          expect(res.body.image).to.equal('KK');
          expect(res.body.github).to.equal('KK');
          expect(res.body.stackoverflow).to.equal('KK');
          expect(res.body.linkedin).to.equal('KK');
          expect(res.body.level).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/users')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all users (with limit and skip)', (done) => {
      request(app)
        .get('/api/users')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/users/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.firstname).to.equal('KK');
          expect(res.body.lastname).to.equal('KK');
          expect(res.body.pseudo).to.equal('KK');
          expect(res.body.email).to.equal('KK');
          expect(res.body.password).to.equal('KK');
          expect(res.body.image).to.equal('KK');
          expect(res.body.github).to.equal('KK');
          expect(res.body.stackoverflow).to.equal('KK');
          expect(res.body.linkedin).to.equal('KK');
          expect(res.body.level).to.equal('KK');

          done();
        })
        .catch(done);
    });
  });
});
