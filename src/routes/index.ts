import { Router } from 'express';
import * as UserConroller from '../controllers/users/UserController';
import { requiresAuth } from 'express-openid-connect';
import * as tagController from '../controllers/tags/tagController';
import * as ingredientController from '../controllers/ingredient/ingredientController';
import * as recipeController from '../controllers/recipes/recipeController';


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


//tag routes
routes.get('/tag', tagController.getTags);
routes.get('/tag/:id', tagController.getTag);
routes.post('/tag', tagController.createTag);
routes.put('/tag/:id', tagController.updateTag);
routes.delete('/tag/:id', tagController.deleteTag);



// Ingredient routes
routes.get('/ingredient', ingredientController.getIngredients);
routes.get('/ingredient/:id', ingredientController.getIngredient);
routes.get('/ingredient/:name', ingredientController.getIngredientByName);
routes.post('/ingredient', ingredientController.createIngredient);
routes.put('/ingredient/:id', ingredientController.updateIngredient);
routes.delete('/ingredient/:id', ingredientController.deleteIngredient);

//Recipe routes
routes.get('/recipe', recipeController.getRecipes);
routes.get('/recipe/:id', recipeController.getRecipe);
routes.post('/recipe', recipeController.createRecipe);
routes.put('/recipe/:id', recipeController.updateRecipe);
routes.delete('/recipe/:id', recipeController.deleteRecipe);

export default routes;