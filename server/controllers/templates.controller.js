import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Template from '../models/templates.model';

/**
 * Load template and append to req.
 */
function load(req, res, next, id) {
  Template.get(id)
    .then((template) => {
      req._template = template; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get template
 * @returns {Template}
 */
function get(req, res) {
  return res.json(req._template);
}

function uploadTemplate(req, res, next) {
  fs.readFile(req.files.template.path, function (err, data) {
    var newPath = __dirname + "/../../../public/templates/";
    console.log(newPath);
    if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);
    fs.writeFile(newPath + req.files.template.name, data, function (err) {
      console.log('File uploaded');
    });
  });
  return res.json({});
}

/**
 * Create new template
  * @property {[object Object]} req.body.name - The name of template.
  * @property {[object Object]} req.body.description - The description of template.
  * @property {[object Object]} req.body.used - The used of template.
  * @property {[object Object]} req.body.owner - The owner of template.
  * @property {[object Object]} req.body.stared - The stared of template.
  * @property {[object Object]} req.body.indexed - The indexed of template.
  * @property {[object Object]} req.body.validated - The validated of template.
  * @property {[object Object]} req.body.codepath - The codepath of template.

 * @returns {Template}
 */
function create(req, res, next) {
  const template = new Template({
    name: req.body.name,
    description: req.body.description,
    used: req.body.used,
    owner: req.body.owner,
    stared: req.body.stared,
    indexed: req.body.indexed,
    validated: req.body.validated,
    codepath: req.body.codepath,

  });

  template.save()
    .then(savedTemplate => res.json(savedTemplate))
    .catch(e => next(e));
}

/**
 * Update existing template
  * @property {[object Object]} req.body.name - The name of template.
  * @property {[object Object]} req.body.description - The description of template.
  * @property {[object Object]} req.body.used - The used of template.
  * @property {[object Object]} req.body.owner - The owner of template.
  * @property {[object Object]} req.body.stared - The stared of template.
  * @property {[object Object]} req.body.indexed - The indexed of template.
  * @property {[object Object]} req.body.validated - The validated of template.
  * @property {[object Object]} req.body.codepath - The codepath of template.

 * @returns {Template}
 */
function update(req, res, next) {
  const template = req._template;
  template.name = req.body.name;
  template.description = req.body.description;
  template.used = req.body.used;
  template.owner = req.body.owner;
  template.stared = req.body.stared;
  template.indexed = req.body.indexed;
  template.validated = req.body.validated;
  template.codepath = req.body.codepath;

  template.save()
    .then(savedTemplate => res.json(savedTemplate))
    .catch(e => next(e));
}

/**
 * Get template list.
 * @property {number} req.query.skip - Number of templates to be skipped.
 * @property {number} req.query.limit - Limit number of templates to be returned.
 * @returns {Template[]}
 */
function list(req, res, next) {
  const params = req.query;
  console.log(req.query);
  const limit = req.query.limit || 50;
  const skip = req.query.skip || 0;
  const sort = parseInt(req.query.sort) || 1;
  const search = req.query.search || '';
  delete params.limit;
  delete params.skip;
  delete params.sort;
  params['name'] = {$regex: new RegExp(params.search, "ig")}
  delete params.search;
  if(params.owner === undefined){
    params['indexed'] = true;
    params['validated'] = true;
  }
  console.log(params);
  Template.list({ limit, skip, sort }, params)
    .then(templates => res.json(templates))
    .catch(e => next(e));
}

/**
 * Delete template.
 * @returns {Template}
 */
function remove(req, res, next) {
  const template = req._template;
  template.remove()
    .then(deletedTemplate => res.json(deletedTemplate))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, uploadTemplate };
