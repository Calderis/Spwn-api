import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import paramCtrl from '../controllers/params.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/params - Get list of params */
  .get(expressJwt({ secret: config.jwtSecret }), paramCtrl.list)

  /** POST /api/params - Create new param */
  .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.createParam), paramCtrl.create);

router.route('/:paramId')
  /** GET /api/params/:paramId - Get param */
  .get(expressJwt({ secret: config.jwtSecret }), paramCtrl.get)

  /** PUT /api/params/:paramId - Update param */
  .put(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.updateParam), paramCtrl.update)

  /** DELETE /api/params/:paramId - Delete param */
  .delete(expressJwt({ secret: config.jwtSecret }), paramCtrl.remove);

/** Load param when API with paramId route parameter is hit */
router.param('paramId', paramCtrl.load);

export default router;