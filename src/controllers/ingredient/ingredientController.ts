import { Request, Response } from 'express';
import Ingredient from '../../models/Ingredient';
import { isMongoError } from '../../utils/validation';


// Create a new ingredient
export const createIngredient = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newIngredient = new Ingredient({ name });
        await newIngredient.save();
        res.status(201).json(newIngredient);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error creating ingredient', error: message });
    }
};



// Get all ingredients
export const getIngredients = async (req: Request, res: Response) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving ingredients', error: message });
    }
    console.log(res.statusCode);
};

// Get a single ingredient by ID
export const getIngredient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ingredient = await Ingredient.findById(id);
        if (ingredient) {
            res.status(200).json(ingredient);
        } else {
            res.status(404).json({ message: 'Ingredient not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving ingredient', error: message });
    }
    console.log(res.statusCode);
};


// Update an ingredient by ID
export const updateIngredient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const ingredient = await Ingredient.findById(id);
        if (ingredient) {
            ingredient.name = name || ingredient.name;
            await ingredient.save();
            res.status(201).json(ingredient);
        } else {
            res.status(404).json({ message: 'Ingredient not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error updating ingredient', error: message });
    }
};

// Delete an ingredient by ID
export const deleteIngredient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedIngredient = await Ingredient.findByIdAndDelete(id);
        if (deletedIngredient) {
            res.json({ message: 'Ingredient deleted successfully' });
        } else {
            res.status(404).json({ message: 'Ingredient not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error deleting ingredient', error: message });
    }
};
