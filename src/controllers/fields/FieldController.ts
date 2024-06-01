import { Request, Response } from 'express';
import Field from '../../models/Field';
import { isMongoError } from '../../utils/validation';

// Create a new field
export const createField = async (req: Request, res: Response) => {
    try {
        const { name, location, crop, irrigationType } = req.body;
        const field = new Field({
            name,
            location,
            crop,
            irrigationType
        });
        await field.save();
        res.status(201).send(field);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).send({ message: 'Error creating field', error: message });
    }
};

// Get all fields
export const getFields = async (req: Request, res: Response) => {
    try {
        const fields = await Field.find().populate('crop irrigationType');
        res.status(200).send(fields);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).send({ message: 'Error retrieving fields', error: message });
    }
};

// Get a single field by ID
export const getField = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const field = await Field.findById(id).populate('crop irrigationType');
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send(field);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).send({ message: 'Error retrieving field', error: message });
    }
};

// Update a field
export const updateField = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const field = await Field.findByIdAndUpdate(id, updates, { new: true });
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send(field);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).send({ message: 'Error updating field', error: message });
    }
};

// Delete a field
export const deleteField = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const field = await Field.findByIdAndDelete(id);
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send({ message: 'Field deleted' });
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).send({ message: 'Error deleting field', error: message });
    }
};
