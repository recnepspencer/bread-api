import { Request, Response } from 'express';
import Irrigation from '../models/Irrigation'; // Import the Irrigation model

// Create a new irrigation system
export const createIrrigation = async (req: Request, res: Response) => {
    try {
        const { type, isAutomatable, hoursPerInch } = req.body;
        const irrigation = new Irrigation({
            type,
            isAutomatable,
            hoursPerInch
        });
        await irrigation.save();
        res.status(201).send(irrigation);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all irrigation systems
export const getIrrigations = async (req: Request, res: Response) => {
    try {
        const irrigations = await Irrigation.find();
        res.status(200).send(irrigations);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single irrigation system by ID
export const getIrrigation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const irrigation = await Irrigation.findById(id);
        if (!irrigation) {
            return res.status(404).send({ message: 'Irrigation not found' });
        }
        res.status(200).send(irrigation);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an irrigation system
export const updateIrrigation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const irrigation = await Irrigation.findByIdAndUpdate(id, updates, { new: true });
        if (!irrigation) {
            return res.status(404).send({ message: 'Irrigation not found' });
        }
        res.status(200).send(irrigation);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an irrigation system
export const deleteIrrigation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const irrigation = await Irrigation.findByIdAndDelete(id);
        if (!irrigation) {
            return res.status(404).send({ message: 'Irrigation not found' });
        }
        res.status(200).send({ message: 'Irrigation deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};

