import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
var ProjectSchema = require('./projects.model.js')
var TemplateSchema = require('./favoris.model.js')
 

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
firstname: {type: String}
lastname: {type: String}
pseudo: {type: String}
email: {type: String}
password: {type: String}
image: {type: String}
github: {type: String}
stackoverflow: {type: String}
linkedin: {type: String}
level: {type: String}
  projects: [{type:Schema.ObjectId, ref: 'Project'}],
  favoris: [{type:Schema.ObjectId, ref: 'Template'}],


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
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
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
 * @typedef User
 */
export default mongoose.model('User', UserSchema);