import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Boat Schema
 */
const BoatSchema = new mongoose.Schema({
  
      name: {
      
      type: String
    },
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
BoatSchema.method({
});

/**
 * Statics
 */
BoatSchema.statics = {
  /**
   * Get boat
   * @param {ObjectId} id - The objectId of boat.
   * @returns {Promise<Boat, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((boat) => {
        if (boat) {
          return boat;
        }
        const err = new APIError('No such boat exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List boats in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of boats to be skipped.
   * @param {number} limit - Limit number of boats to be returned.
   * @returns {Promise<Boat[]>}
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
 * @typedef Boat
 */
export default mongoose.model('Boat', BoatSchema);