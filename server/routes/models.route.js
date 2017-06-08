import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import modelCtrl from '../controllers/models.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/models - Get list of models */
  .get(expressJwt({ secret: config.jwtSecret }), modelCtrl.list)

  /** POST /api/models - Create new model */
  .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.createModel), modelCtrl.create);

router.route('/:modelId')
  /** GET /api/models/:modelId - Get model */
  .get(expressJwt({ secret: config.jwtSecret }), modelCtrl.get)

  /** PUT /api/models/:modelId - Update model */
  .put(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.updateModel), modelCtrl.update)

  /** DELETE /api/models/:modelId - Delete model */
  .delete(expressJwt({ secret: config.jwtSecret }), modelCtrl.remove);

/** Load model when API with modelId route parameter is hit */
router.param('modelId', modelCtrl.load);

export default router;