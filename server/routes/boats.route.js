import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import boatCtrl from '../controllers/boats.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/boats - Get list of boats */
  .get(boatCtrl.list)

  /** POST /api/boats - Create new boat */
  .post(validate(paramValidation.createBoat), boatCtrl.create);

router.route('/:boatId')
  /** GET /api/boats/:boatId - Get boat */
  .get(boatCtrl.get)

  /** PUT /api/boats/:boatId - Update boat */
  .put(validate(paramValidation.updateBoat), boatCtrl.update)

  /** DELETE /api/boats/:boatId - Delete boat */
  .delete(boatCtrl.remove);

/** Load boat when API with boatId route parameter is hit */
router.param('boatId', boatCtrl.load);

export default router;