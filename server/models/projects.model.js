import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
var ModelSchema = require('./models.model.js')
var ModuleSchema = require('./modules.model.js')
 

/**
 * Project Schema
 */
const ProjectSchema = new mongoose.Schema({
name: {type: String}
image: {type: String}
  models: [{type:Schema.ObjectId, ref: 'Model'}],
  modules: [{type:Schema.ObjectId, ref: 'Module'}],


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
ProjectSchema.method({
});

/**
 * Statics
 */
ProjectSchema.statics = {
  /**
   * Get project
   * @param {ObjectId} id - The objectId of project.
   * @returns {Promise<Project, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((project) => {
        if (project) {
          return project;
        }
        const err = new APIError('No such project exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List projects in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of projects to be skipped.
   * @param {number} limit - Limit number of projects to be returned.
   * @returns {Promise<Project[]>}
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
 * @typedef Project
 */
export default mongoose.model('Project', ProjectSchema);