import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Boat from '../models/boats.model';

/**
 * Load boat and append to req.
 */
function load(req, res, next, id) {
  Boat.get(id)
    .then((boat) => {
      req.boat = boat; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get boat
 * @returns {Boat}
 */
function get(req, res) {
  return res.json(req.boat);
}

/**
 * Create new boat
      * @property {String} req.body.name - The name of boat.
    * @property {String} req.body.brand - The brand of boat.
    * @property {Number} req.body.price - The price of boat.

 * @returns {Boat}
 */
function create(req, res, next) {
  const boat = new Boat({
          name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,

  });

  boat.save()
    .then(savedBoat => res.json(savedBoat))
    .catch(e => next(e));
}

/**
 * Update existing boat
      * @property {String} req.body.name - The name of boat.
    * @property {String} req.body.brand - The brand of boat.
    * @property {Number} req.body.price - The price of boat.

 * @returns {Boat}
 */
function update(req, res, next) {
  const boat = req.boat;
      boat.name = req.body.name;
    boat.brand = req.body.brand;
    boat.price = req.body.price;


  boat.save()
    .then(savedBoat => res.json(savedBoat))
    .catch(e => next(e));
}

/**
 * Get boat list.
 * @property {number} req.query.skip - Number of boats to be skipped.
 * @property {number} req.query.limit - Limit number of boats to be returned.
 * @returns {Boat[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Boat.list({ limit, skip })
    .then(boats => res.json(boats))
    .catch(e => next(e));
}

/**
 * Delete boat.
 * @returns {Boat}
 */
function remove(req, res, next) {
  const boat = req.boat;
  boat.remove()
    .then(deletedBoat => res.json(deletedBoat))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
