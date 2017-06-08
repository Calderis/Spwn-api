import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import planeCtrl from '../controllers/planes.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/planes - Get list of planes */
  .get(planeCtrl.list)

  /** POST /api/planes - Create new plane */
  .post(validate(paramValidation.createPlane), planeCtrl.create);

router.route('/:planeId')
  /** GET /api/planes/:planeId - Get plane */
  .get(planeCtrl.get)

  /** PUT /api/planes/:planeId - Update plane */
  .put(validate(paramValidation.updatePlane), planeCtrl.update)

  /** DELETE /api/planes/:planeId - Delete plane */
  .delete(planeCtrl.remove);

/** Load plane when API with planeId route parameter is hit */
router.param('planeId', planeCtrl.load);

export default router;