import { Request, Response } from 'express';
import Field from '../models/Field';

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
        res.status(400).send(error);
    }
};

// Get all fields
export const getFields = async (req: Request, res: Response) => {
    try {
        const fields = await Field.find();
        res.status(200).send(fields);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single field by ID
export const getField = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const field = await Field.findById(id);
        if (!field) {
            return res.status(404).send({ message: 'Field not found' });
        }
        res.status(200).send(field);
    } catch (error) {
        res.status(500).send(error);
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
        res.status(400).send(error);
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
        res.status(500).send(error);
    }
};
