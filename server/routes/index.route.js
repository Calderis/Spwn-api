import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './users.route';
import projectRoutes from './projects.route';
import modelRoutes from './models.route';
import paramRoutes from './params.route';
import moduleRoutes from './modules.route';
import templateRoutes from './templates.route';


const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount auth routes at /auth
router.use('/auth', authRoutes);
// mount user routes at /users
router.use('/users', userRoutes);
// mount project routes at /projects
router.use('/projects', projectRoutes);
// mount model routes at /models
router.use('/models', modelRoutes);
// mount param routes at /params
router.use('/params', paramRoutes);
// mount module routes at /modules
router.use('/modules', moduleRoutes);
// mount template routes at /templates
router.use('/templates', templateRoutes);


export default router;
