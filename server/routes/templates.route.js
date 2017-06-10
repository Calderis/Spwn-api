import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import templateCtrl from '../controllers/templates.controller';
import config from '../../config/config';
import multipart from'connect-multiparty';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/templates - Get list of templates */
  .get(expressJwt({ secret: config.jwtSecret }), templateCtrl.list)

  /** POST /api/templates - Create new template */
  .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.createTemplate), templateCtrl.create);

router.route('/:templateId')
  /** GET /api/templates/:templateId - Get template */
  .get(expressJwt({ secret: config.jwtSecret }), templateCtrl.get)

  /** PUT /api/templates/:templateId - Update template */
  .put(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.updateTemplate), templateCtrl.update)

  /** DELETE /api/templates/:templateId - Delete template */
  .delete(expressJwt({ secret: config.jwtSecret }), templateCtrl.remove);

router.route('/file')
/** POST /api/templates/file - Upload template file */
  .post(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.uploadFile), multipart(), templateCtrl.uploadTemplate);

router.route('/file/:templateId')
  /** GET /api/templates/file/:templateId - Download template file */
  .get(templateCtrl.downloadTemplate);

/** Load template when API with templateId route parameter is hit */
router.param('templateId', templateCtrl.load);

export default router;