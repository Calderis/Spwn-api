import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Param from '../models/params.model';

/**
 * Load param and append to req.
 */
function load(req, res, next, id) {
  Param.get(id)
    .then((param) => {
      req._param = param; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get param
 * @returns {Param}
 */
function get(req, res) {
  return res.json(req._param);
}

/**
 * Create new param
    * @property {String} req.body.name - The name of param.
    * @property {String} req.body.type - The type of param.
    * @property {String} req.body.classname - The classname of param.

 * @returns {Param}
 */
function create(req, res, next) {
  const param = new Param({
    name: req.body.name,
    type: req.body.type,
    classname: req.body.classname,

  });

  param.save()
    .then(savedParam => res.json(savedParam))
    .catch(e => next(e));
}

/**
 * Update existing param
    * @property {String} req.body.name - The name of param.
    * @property {String} req.body.type - The type of param.
    * @property {String} req.body.classname - The classname of param.

 * @returns {Param}
 */
function update(req, res, next) {
  const param = req._param;
  param.name = req.body.name;
  param.type = req.body.type;
  param.classname = req.body.classname;

  param.save()
    .then(savedParam => res.json(savedParam))
    .catch(e => next(e));
}

/**
 * Get param list.
 * @property {number} req.query.skip - Number of params to be skipped.
 * @property {number} req.query.limit - Limit number of params to be returned.
 * @returns {Param[]}
 */
function list(req, res, next) {
  const params = req.query;
  const limit = req.query.limit || 50;
  const skip = req.query.skip || 0;
  const sort = parseInt(req.query.sort) || 1;
  delete params.limit;
  delete params.skip;
  delete params.sort;
  Param.list({ limit, skip, sort }, params)
    .then(params => res.json(params))
    .catch(e => next(e));
}

/**
 * Delete param.
 * @returns {Param}
 */
function remove(req, res, next) {
  const param = req._param;
  param.remove()
    .then(deletedParam => res.json(deletedParam))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
