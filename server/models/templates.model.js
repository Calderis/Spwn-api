import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Template Schema
 */
const TemplateSchema = new mongoose.Schema({
  name: String,
  description: String,
  used: Number,
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  stared: Boolean,
  indexed: Boolean,
  validated: Boolean,
  codepath: String,

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
TemplateSchema.method({
});

/**
 * Statics
 */
TemplateSchema.statics = {
  /**
   * Get template
   * @param {ObjectId} id - The objectId of template.
   * @returns {Promise<Template, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('Owner')
        .exec()
        .then((template) => {
          if (template) {
            return template;
          }
          const err = new APIError('No such template exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
  },

  /**
   * List templates in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of templates to be skipped.
   * @param {number} limit - Limit number of templates to be returned.
   * @returns {Promise<Template[]>}
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
 * @typedef Template
 */
export default mongoose.model('Template', TemplateSchema);