import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import projectCtrl from '../controllers/projects.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/projects - Get list of projects */
  .get(expressJwt({ secret: config.jwtSecret }), projectCtrl.list)

  /** POST /api/projects - Create new project */
  .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.createProject), projectCtrl.create);

router.route('/:projectId')
  /** GET /api/projects/:projectId - Get project */
  .get(expressJwt({ secret: config.jwtSecret }), projectCtrl.get)

  /** PUT /api/projects/:projectId - Update project */
  .put(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.updateProject), projectCtrl.update)

  /** DELETE /api/projects/:projectId - Delete project */
  .delete(expressJwt({ secret: config.jwtSecret }), projectCtrl.remove);

/** Load project when API with projectId route parameter is hit */
router.param('projectId', projectCtrl.load);

export default router;