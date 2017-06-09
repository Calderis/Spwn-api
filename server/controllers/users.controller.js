import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../models/users.model';
import passwordHash from 'password-hash';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req._user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req._user);
}

/**
 * Create new user
  * @property {[object Object]} req.body.firstname - The firstname of user.
  * @property {[object Object]} req.body.lastname - The lastname of user.
  * @property {[object Object]} req.body.pseudo - The pseudo of user.
  * @property {[object Object]} req.body.email - The email of user.
  * @property {[object Object]} req.body.password - The password of user.
  * @property {[object Object]} req.body.image - The image of user.
  * @property {[object Object]} req.body.github - The github of user.
  * @property {[object Object]} req.body.stackoverflow - The stackoverflow of user.
  * @property {[object Object]} req.body.linkedin - The linkedin of user.
  * @property {[object Object]} req.body.level - The level of user.
  * @property {[object Object]} req.body.projects - The projects of user.
  * @property {[object Object]} req.body.favoris - The favoris of user.

 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    image: req.body.image,
    github: req.body.github,
    stackoverflow: req.body.stackoverflow,
    linkedin: req.body.linkedin,
    level: req.body.level,
    projects: req.body.projects,
    favoris: req.body.favoris,

  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
  * @property {[object Object]} req.body.firstname - The firstname of user.
  * @property {[object Object]} req.body.lastname - The lastname of user.
  * @property {[object Object]} req.body.pseudo - The pseudo of user.
  * @property {[object Object]} req.body.email - The email of user.
  * @property {[object Object]} req.body.password - The password of user.
  * @property {[object Object]} req.body.image - The image of user.
  * @property {[object Object]} req.body.github - The github of user.
  * @property {[object Object]} req.body.stackoverflow - The stackoverflow of user.
  * @property {[object Object]} req.body.linkedin - The linkedin of user.
  * @property {[object Object]} req.body.level - The level of user.
  * @property {[object Object]} req.body.projects - The projects of user.
  * @property {[object Object]} req.body.favoris - The favoris of user.

 * @returns {User}
 */
function update(req, res, next) {
  const user = req._user;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.pseudo = req.body.pseudo;
  user.email = req.body.email;
    user.password = passwordHash.generate(req.body.password);
  user.image = req.body.image;
  user.github = req.body.github;
  user.stackoverflow = req.body.stackoverflow;
  user.linkedin = req.body.linkedin;
  user.level = req.body.level;
  user.projects = req.body.projects;
  user.favoris = req.body.favoris;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const params = req.query;
  const limit = req.query.limit || 50;
  const skip = req.query.skip || 0;
  const sort = parseInt(req.query.sort) || 1;
  delete params.limit;
  delete params.skip;
  delete params.sort;
  User.list({ limit, skip, sort }, params)
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req._user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
