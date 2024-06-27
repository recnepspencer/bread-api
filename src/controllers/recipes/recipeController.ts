import { Request, Response } from 'express';
import Recipe from '../../models/Recipe';
import { isMongoError } from '../../utils/validation';

// Create a new recipe
export const createRecipe = async (req: Request, res: Response) => {
    try {
        const { name, description, ingredients, instructions, tools, tags, imagePath, difficulty } = req.body;
        const newRecipe = new Recipe({ name, description, ingredients, instructions, tools, tags, imagePath, difficulty });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error creating recipe', error: message });
    }
};


// Get all recipes
export const getRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find()
            .populate({
                path: 'ingredients.ingredient',
                select: 'name'
            })
            .populate({
                path: 'tags',
                select: 'name'
            });
        res.json(recipes);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving recipes', error: message });
    }
};

// Get a single recipe by ID
export const getRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id)
            .populate({
                path: 'ingredients.ingredient',
                select: 'name'
            })
            .populate({
                path: 'tags',
                select: 'name'
            });
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving recipe', error: message });
    }
};

// Update a recipe by ID
export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, ingredients, instructions, tools, tags, imagePath, difficulty } = req.body;

        const recipe = await Recipe.findById(id);
        if (recipe) {
            recipe.name = name || recipe.name;
            recipe.description = description || recipe.description;
            recipe.ingredients = ingredients || recipe.ingredients;
            recipe.instructions = instructions || recipe.instructions;
            recipe.tools = tools || recipe.tools;
            recipe.tags = tags || recipe.tags;
            recipe.imagePath = imagePath || recipe.imagePath;
            recipe.difficulty = difficulty || recipe.difficulty;
            await recipe.save();
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error updating recipe', error: message });
    }
};

// Delete a recipe by ID
export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (deletedRecipe) {
            res.json({ message: 'Recipe deleted successfully' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error deleting recipe', error: message });
    }
};
