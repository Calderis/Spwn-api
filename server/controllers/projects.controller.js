import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Project from '../models/projects.model';

/**
 * Load project and append to req.
 */
function load(req, res, next, id) {
  Project.get(id)
    .then((project) => {
      req._project = project; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get project
 * @returns {Project}
 */
function get(req, res) {
  return res.json(req._project);
}

/**
 * Create new project
    * @property {String} req.body.name - The name of project.
    * @property {String} req.body.image - The image of project.
    * @property {Array} req.body.models - The models of project.
    * @property {Array} req.body.modules - The modules of project.

 * @returns {Project}
 */
function create(req, res, next) {
  const project = new Project({
    name: req.body.name,
    image: req.body.image,
    models: req.body.models,
    modules: req.body.modules,

  });

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Update existing project
    * @property {String} req.body.name - The name of project.
    * @property {String} req.body.image - The image of project.
    * @property {Array} req.body.models - The models of project.
    * @property {Array} req.body.modules - The modules of project.

 * @returns {Project}
 */
function update(req, res, next) {
  const project = req._project;
  project.name = req.body.name;
  project.image = req.body.image;
  project.models = req.body.models;
  project.modules = req.body.modules;

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Get project list.
 * @property {number} req.query.skip - Number of projects to be skipped.
 * @property {number} req.query.limit - Limit number of projects to be returned.
 * @returns {Project[]}
 */
function list(req, res, next) {
  const params = req.query;
  const limit = req.query.limit || 50;
  const skip = req.query.skip || 0;
  const sort = parseInt(req.query.sort) || 1;
  delete params.limit;
  delete params.skip;
  delete params.sort;
  Project.list({ limit, skip, sort }, params)
    .then(projects => res.json(projects))
    .catch(e => next(e));
}

/**
 * Delete project.
 * @returns {Project}
 */
function remove(req, res, next) {
  const project = req._project;
  project.remove()
    .then(deletedProject => res.json(deletedProject))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
