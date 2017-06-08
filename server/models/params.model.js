import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
 

/**
 * Param Schema
 */
const ParamSchema = new mongoose.Schema({
name: {type: String}
type: {type: String}
classname: {type: String}


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
ParamSchema.method({
});

/**
 * Statics
 */
ParamSchema.statics = {
  /**
   * Get param
   * @param {ObjectId} id - The objectId of param.
   * @returns {Promise<Param, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((param) => {
        if (param) {
          return param;
        }
        const err = new APIError('No such param exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List params in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of params to be skipped.
   * @param {number} limit - Limit number of params to be returned.
   * @returns {Promise<Param[]>}
   */
  list({ skip = 0, limit = 50, sort = 1  } = {}, params = {}) {
    return this.find(params)
      .sort({ createdAt: +sort })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Param
 */
export default mongoose.model('Param', ParamSchema);