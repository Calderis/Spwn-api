import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import moduleCtrl from '../controllers/modules.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/modules - Get list of modules */
  .get(expressJwt({ secret: config.jwtSecret }), moduleCtrl.list)

  /** POST /api/modules - Create new module */
  .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.createModule), moduleCtrl.create);

router.route('/:moduleId')
  /** GET /api/modules/:moduleId - Get module */
  .get(expressJwt({ secret: config.jwtSecret }), moduleCtrl.get)

  /** PUT /api/modules/:moduleId - Update module */
  .put(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.updateModule), moduleCtrl.update)

  /** DELETE /api/modules/:moduleId - Delete module */
  .delete(expressJwt({ secret: config.jwtSecret }), moduleCtrl.remove);

/** Load module when API with moduleId route parameter is hit */
router.param('moduleId', moduleCtrl.load);

export default router;