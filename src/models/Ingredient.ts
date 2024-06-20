import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    measurementType: {
        type: String,
        required: [true, 'Measurement type is required'],
        enum: [
            'mg', 'g', 'kg',    // Weight
            'oz', 'lb',          // Weight
            'ml', 'l',           // Volume
            'tsp', 'tbsp', 'cup',// Volume
            'pt', 'qt', 'gal',   // Volume
            'fl oz', 'cubic cm', 'cubic inch', // Volume
            'stick', 'slice',    // Units
            'piece', 'unit',     // Units
            'packet', 'pinch',   // Units
            'dash', 'drop',      // Units
            'can', 'bottle',     // Units
            'container', 'package', // Units
            'jar', 'bag', 'box'  // Units
        ],
    },
    caloriesPerMeasurement: {
        type: Number,
        required: [true, 'Calories per measurement is required'],
    },
});

const Ingredient = model('Ingredient', ingredientSchema);

export default Ingredient;
