import Joi from 'joi';

export default {
    // POST /api/users
    createUser: {
      body: {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        pseudo: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        image: Joi.string().required(),
        github: Joi.string().required(),
        stackoverflow: Joi.string().required(),
        linkedin: Joi.string().required(),
        level: Joi.string().required(),

      }
    },

    // UPDATE /api/users/:userId
    updateUser: {
      body: {
        <§- model.array -> param -§>
    // POST /api/projects
    createProject: {
      body: {
        name: Joi.string().required(),
        image: Joi.string().required(),

      }
    },

    // UPDATE /api/projects/:projectId
    updateProject: {
      body: {
        <§- model.array -> param -§>
    // POST /api/models
    createModel: {
      body: {
        name: Joi.string().required(),
        description: Joi.string().required(),

      }
    },

    // UPDATE /api/models/:modelId
    updateModel: {
      body: {
        <§- model.array -> param -§>
    // POST /api/params
    createParam: {
      body: {
        name: Joi.string().required(),
        type: Joi.string().required(),
        classname: Joi.string().required(),

      }
    },

    // UPDATE /api/params/:paramId
    updateParam: {
      body: {
        <§- model.array -> param -§>
    // POST /api/modules
    createModule: {
      body: {
        name: Joi.string().required(),
        status: Joi.string().required(),

      }
    },

    // UPDATE /api/modules/:moduleId
    updateModule: {
      body: {
        <§- model.array -> param -§>
    // POST /api/templates
    createTemplate: {
      body: {
        name: Joi.string().required(),
        stared: Joi.number().required(),
        codepath: Joi.string().required(),

      }
    },

    // UPDATE /api/templates/:templateId
    updateTemplate: {
      body: {
        <§- model.array -> param -§>

      },
      params: {
        SPWN - syntax error (EXTRACT) - undefined value : name on undefinedId: Joi.string().hex().required()
      }
    },
  <-§->

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
