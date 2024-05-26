import { Router } from 'express';
import createRoutes from '../utils/createRoutes';
import * as UserConroller from '../controllers/users/UserController';
import * as FieldController from '../controllers/fields/FieldController';
import * as CropController from '../controllers/crops/CropController';
import * as IrrigationController from '../controllers/irrigation/IrrigationController';
import { getUserFieldsDetails } from '../controllers/users/UserController';
import * as InventoryController from '../controllers/inventory/InventoryController';

const routes = Router();

// User routes
routes.use('/user', createRoutes(UserConroller, 'user'));
routes.get('/user/:userId/fields', getUserFieldsDetails);

// Field routes
routes.use('/field', createRoutes(FieldController, 'field'));

// Crop routes
routes.use('/crop', createRoutes(CropController, 'crop'));

// Irrigation routes
routes.use('/irrigation', createRoutes(IrrigationController, 'irrigation'));

routes.use('/inventory', createRoutes(InventoryController, 'inventory'));





export default routes;