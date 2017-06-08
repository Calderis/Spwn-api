import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Plane from '../models/planes.model';

/**
 * Load plane and append to req.
 */
function load(req, res, next, id) {
  Plane.get(id)
    .then((plane) => {
      req.plane = plane; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get plane
 * @returns {Plane}
 */
function get(req, res) {
  return res.json(req.plane);
}

/**
 * Create new plane
      * @property {String} req.body.brand - The brand of plane.
    * @property {Number} req.body.price - The price of plane.

 * @returns {Plane}
 */
function create(req, res, next) {
  const plane = new Plane({
          brand: req.body.brand,
      price: req.body.price,

  });

  plane.save()
    .then(savedPlane => res.json(savedPlane))
    .catch(e => next(e));
}

/**
 * Update existing plane
      * @property {String} req.body.brand - The brand of plane.
    * @property {Number} req.body.price - The price of plane.

 * @returns {Plane}
 */
function update(req, res, next) {
  const plane = req.plane;
      plane.brand = req.body.brand;
    plane.price = req.body.price;


  plane.save()
    .then(savedPlane => res.json(savedPlane))
    .catch(e => next(e));
}

/**
 * Get plane list.
 * @property {number} req.query.skip - Number of planes to be skipped.
 * @property {number} req.query.limit - Limit number of planes to be returned.
 * @returns {Plane[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Plane.list({ limit, skip })
    .then(planes => res.json(planes))
    .catch(e => next(e));
}

/**
 * Delete plane.
 * @returns {Plane}
 */
function remove(req, res, next) {
  const plane = req.plane;
  plane.remove()
    .then(deletedPlane => res.json(deletedPlane))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
