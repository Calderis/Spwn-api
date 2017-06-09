import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Module from '../models/modules.model';

/**
 * Load module and append to req.
 */
function load(req, res, next, id) {
  Module.get(id)
    .then((module) => {
      req._module = module; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get module
 * @returns {Module}
 */
function get(req, res) {
  return res.json(req._module);
}

/**
 * Create new module
  * @property {[object Object]} req.body.name - The name of module.
  * @property {[object Object]} req.body.template - The template of module.

 * @returns {Module}
 */
function create(req, res, next) {
  const module = new Module({
    name: req.body.name,
    template: req.body.template,

  });

  module.save()
    .then(savedModule => res.json(savedModule))
    .catch(e => next(e));
}

/**
 * Update existing module
  * @property {[object Object]} req.body.name - The name of module.
  * @property {[object Object]} req.body.template - The template of module.

 * @returns {Module}
 */
function update(req, res, next) {
  const module = req._module;
  module.name = req.body.name;
  module.template = req.body.template;

  module.save()
    .then(savedModule => res.json(savedModule))
    .catch(e => next(e));
}

/**
 * Get module list.
 * @property {number} req.query.skip - Number of modules to be skipped.
 * @property {number} req.query.limit - Limit number of modules to be returned.
 * @returns {Module[]}
 */
function list(req, res, next) {
  const params = req.query;
  const limit = req.query.limit || 50;
  const skip = req.query.skip || 0;
  const sort = parseInt(req.query.sort) || 1;
  delete params.limit;
  delete params.skip;
  delete params.sort;
  Module.list({ limit, skip, sort }, params)
    .then(modules => res.json(modules))
    .catch(e => next(e));
}

/**
 * Delete module.
 * @returns {Module}
 */
function remove(req, res, next) {
  const module = req._module;
  module.remove()
    .then(deletedModule => res.json(deletedModule))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
