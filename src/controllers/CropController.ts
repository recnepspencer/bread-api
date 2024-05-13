import { Request, Response } from 'express';
import Crop from '../models/Crop'; // Import the Crop model

// Create a new crop
export const createCrop = async (req: Request, res: Response) => {
    try {
        const { name, waterRequirement } = req.body;
        const crop = new Crop({
            name,
            waterRequirement
        });
        await crop.save();
        res.status(201).send(crop);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all crops
export const getCrops = async (req: Request, res: Response) => {
    try {
        const crops = await Crop.find();
        res.status(200).send(crops);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single crop by ID
export const getCrop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const crop = await Crop.findById(id);
        if (!crop) {
            return res.status(404).send({ message: 'Crop not found' });
        }
        res.status(200).send(crop);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a crop
export const updateCrop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const crop = await Crop.findByIdAndUpdate(id, updates, { new: true });
        if (!crop) {
            return res.status(404).send({ message: 'Crop not found' });
        }
        res.status(200).send(crop);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a crop
export const deleteCrop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const crop = await Crop.findByIdAndDelete(id);
        if (!crop) {
            return res.status(404).send({ message: 'Crop not found' });
        }
        res.status(200).send({ message: 'Crop deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};
