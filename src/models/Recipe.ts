import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Recipe name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Recipe description is required'],
    },
    ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
    instructions: {
        type: [String],
        required: [true, 'Instructions are required'],
    },
    tools: {
        type: [String],
        required: [true, 'Tools are required'],
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    imagePath: {
        type: String,
        required: [true, 'Image path is required'],
    },
    difficulty: {
        type: Number,
        required: [true, 'Difficulty is required'],
        min: [1, 'Difficulty must be at least 1'],
        max: [10, 'Difficulty cannot exceed 10'],
    },
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
