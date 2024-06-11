import { Router } from 'express';
import * as UserConroller from '../controllers/users/UserController';
import { requiresAuth } from 'express-openid-connect';

const routes = Router();

routes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });


// User routes
routes.get('/user', UserConroller.getUsers);
routes.get('/user/:id', UserConroller.getUser);
routes.post('/user', UserConroller.createUser);
routes.put('/user/:id', UserConroller.updateUser);
routes.delete('/user/:id', UserConroller.deleteUser);




export default routes;