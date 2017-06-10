import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
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
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
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
    },
    params: {
      projectId: Joi.string().hex().required()
    }
  },
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
    },
    params: {
      modelId: Joi.string().hex().required()
    }
  },
  // POST /api/params
  createParam: {
    body: {
      name: Joi.string().required(),
      type: Joi.string().required(),
     }
  },
   // UPDATE /api/params/:paramId
  updateParam: {
    body: {
    },
    params: {
      paramId: Joi.string().hex().required()
    }
  },
  // POST /api/modules
  createModule: {
    body: {
      name: Joi.string().required(),
     }
  },
   // UPDATE /api/modules/:moduleId
  updateModule: {
    body: {
    },
    params: {
      moduleId: Joi.string().hex().required()
    }
  },
  // POST /api/templates
  createTemplate: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      used: Joi.number().required(),
      codepath: Joi.string().required(),
     }
  },
   // UPDATE /api/templates/:templateId
  updateTemplate: {
    body: {
    },
    params: {
      templateId: Joi.string().hex().required()
    }
  },
  // POST /api/templates/file
  uploadFile: {
    body: {}
  },
  // GET /api/templates/file/:templateId
  downloadFile: {
    body: {},
    params: {
      templateId: Joi.string().hex().required()
    }
  },


  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
