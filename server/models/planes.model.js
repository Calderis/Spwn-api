import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Plane Schema
 */
const PlaneSchema = new mongoose.Schema({
  
      brand: {
      
      type: String
    },
    price: {
      
      type: Number
    },


  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
PlaneSchema.method({
});

/**
 * Statics
 */
PlaneSchema.statics = {
  /**
   * Get plane
   * @param {ObjectId} id - The objectId of plane.
   * @returns {Promise<Plane, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((plane) => {
        if (plane) {
          return plane;
        }
        const err = new APIError('No such plane exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List planes in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of planes to be skipped.
   * @param {number} limit - Limit number of planes to be returned.
   * @returns {Promise<Plane[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Plane
 */
export default mongoose.model('Plane', PlaneSchema);