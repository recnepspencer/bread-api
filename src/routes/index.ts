import { Router } from 'express';
const { requiresAuth } = require('express-openid-connect');
import createRoutes from '../utils/createRoutes';
import * as UserConroller from '../controllers/UserController';
import * as FieldController from '../controllers/FieldController';
import * as CropController from '../controllers/CropController';
import * as IrrigationController from '../controllers/IrrigationController';
import { getUserFieldsDetails } from '../controllers/UserController';
const routes = Router();

routes.use(requiresAuth());


// Auth routes
routes.get('/', (req: any, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
routes.get('/profile', (req: any, res: any) => {
    res.send(req.oidc.user ? JSON.stringify(req.oidc.user) : 'No user info');
});

// User routes
routes.use('/user', createRoutes(UserConroller, 'user'));
routes.get('/user/:userId/fields', getUserFieldsDetails);

// Field routes
routes.use('/field', createRoutes(FieldController, 'field'));

// Crop routes
routes.use('/crop', createRoutes(CropController, 'crop'));

// Irrigation routes
routes.use('/irrigation', createRoutes(IrrigationController, 'irrigation'));





export default routes;