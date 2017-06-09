import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Module Schema
 */
const ModuleSchema = new mongoose.Schema({
  name: String,
  template: { type: mongoose.Schema.ObjectId, ref: 'Template' },

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
ModuleSchema.method({
});

/**
 * Statics
 */
ModuleSchema.statics = {
  /**
   * Get module
   * @param {ObjectId} id - The objectId of module.
   * @returns {Promise<Module, APIError>}
   */
  get(id) {
    return this.findById(id)
    .populate('Template')

      .exec()
      .then((module) => {
        if (module) {
          return module;
        }
        const err = new APIError('No such module exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List modules in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of modules to be skipped.
   * @param {number} limit - Limit number of modules to be returned.
   * @returns {Promise<Module[]>}
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
 * @typedef Module
 */
export default mongoose.model('Module', ModuleSchema);