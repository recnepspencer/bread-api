import { Request, Response } from 'express';
import Crop from '../../models/Crop';
import { isMongoError } from '../../utils/validation';
import { Error } from 'mongoose';

// Create a new crop
export const createCrop = async (req: Request, res: Response) => {
    try {
        const { name, waterRequirement, plantDate, harvestDate, lastWatering, neededFertilizers, neededPesticides } = req.body;
        const crop = new Crop({
            name,
            waterRequirement,
            plantDate,
            harvestDate,
            lastWatering,
            neededFertilizers,
            neededPesticides
        });
        await crop.save();
        res.status(201).send(crop);
    } catch (error: any) {  // Use `any` type for error
        if (error instanceof Error.ValidationError) {
            // Handle Mongoose validation error
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).send({ message: 'Validation error', errors });
        } else if (isMongoError(error)) {
            const message = error.message;
            return res.status(400).send({ message: 'Error creating crop', error: message });
        }
        res.status(500).send({ message: 'Unexpected error occurred', error: error.message });
    }
};

// Get all crops
export const getCrops = async (req: Request, res: Response) => {
    try {
        const crops = await Crop.find().populate('neededFertilizers neededPesticides');
        res.status(200).send(crops);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).send({ message: 'Error retrieving crops', error: message });
    }
};

// Get a single crop by ID
export const getCrop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const crop = await Crop.findById(id).populate('neededFertilizers neededPesticides');
        if (!crop) {
            return res.status(404).send({ message: 'Crop not found' });
        }
        res.status(200).send(crop);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).send({ message: 'Error retrieving crop', error: message });
    }
};

// Update a crop
export const updateCrop = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const crop = await Crop.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
            context: 'query' 
        }).populate('neededFertilizers neededPesticides');
        if (!crop) {
            return res.status(404).send({ message: 'Crop not found' });
        }
        res.status(200).send(crop);
    } catch (error: any) {  // Use `any` type for error
        if (error instanceof Error.ValidationError) {
            // Handle Mongoose validation error
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).send({ message: 'Validation error', errors });
        } else if (isMongoError(error)) {
            const message = error.message;
            return res.status(400).send({ message: 'Error updating crop', error: message });
        }
        res.status(500).send({ message: 'Unexpected error occurred', error: error.message });
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
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).send({ message: 'Error deleting crop', error: message });
    }
};
