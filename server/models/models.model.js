import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
var ParamSchema = require('./params.model.js')
 

/**
 * Model Schema
 */
const ModelSchema = new mongoose.Schema({
name: {type: String}
  params: [{type:Schema.ObjectId, ref: 'Param'}],
description: {type: String}


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
ModelSchema.method({
});

/**
 * Statics
 */
ModelSchema.statics = {
  /**
   * Get model
   * @param {ObjectId} id - The objectId of model.
   * @returns {Promise<Model, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((model) => {
        if (model) {
          return model;
        }
        const err = new APIError('No such model exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List models in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of models to be skipped.
   * @param {number} limit - Limit number of models to be returned.
   * @returns {Promise<Model[]>}
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
 * @typedef Model
 */
export default mongoose.model('Model', ModelSchema);