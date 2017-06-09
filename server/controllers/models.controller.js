import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Model from '../models/models.model';

/**
 * Load model and append to req.
 */
function load(req, res, next, id) {
  Model.get(id)
    .then((model) => {
      req._model = model; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get model
 * @returns {Model}
 */
function get(req, res) {
  return res.json(req._model);
}

/**
 * Create new model
  * @property {[object Object]} req.body.name - The name of model.
  * @property {[object Object]} req.body.params - The params of model.
  * @property {[object Object]} req.body.description - The description of model.

 * @returns {Model}
 */
function create(req, res, next) {
  const model = new Model({
    name: req.body.name,
    params: req.body.params,
    description: req.body.description,

  });

  model.save()
    .then(savedModel => res.json(savedModel))
    .catch(e => next(e));
}

/**
 * Update existing model
  * @property {[object Object]} req.body.name - The name of model.
  * @property {[object Object]} req.body.params - The params of model.
  * @property {[object Object]} req.body.description - The description of model.

 * @returns {Model}
 */
function update(req, res, next) {
  const model = req._model;
  model.name = req.body.name;
  model.params = req.body.params;
  model.description = req.body.description;

  model.save()
    .then(savedModel => res.json(savedModel))
    .catch(e => next(e));
}

/**
 * Get model list.
 * @property {number} req.query.skip - Number of models to be skipped.
 * @property {number} req.query.limit - Limit number of models to be returned.
 * @returns {Model[]}
 */
function list(req, res, next) {
  const params = req.query;
  const limit = req.query.limit || 50;
  const skip = req.query.skip || 0;
  const sort = parseInt(req.query.sort) || 1;
  delete params.limit;
  delete params.skip;
  delete params.sort;
  Model.list({ limit, skip, sort }, params)
    .then(models => res.json(models))
    .catch(e => next(e));
}

/**
 * Delete model.
 * @returns {Model}
 */
function remove(req, res, next) {
  const model = req._model;
  model.remove()
    .then(deletedModel => res.json(deletedModel))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
