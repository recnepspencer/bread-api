import { Request, Response } from 'express';
import Inventory from '../../models/Inventory';
import { isMongoError } from '../../utils/validation';

// Create a new inventory item
export const createInventory = async (req: Request, res: Response) => {
    try {
        const { name, type, cost, expirationDate, orderNumber, dateReceived, quantity, supplier, notes } = req.body;

        const newInventory = new Inventory({
            name,
            type,
            cost,
            expirationDate: expirationDate || null,
            orderNumber,
            dateReceived,
            quantity,
            supplier,
            notes
        });

        const savedInventory = await newInventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Failed to create inventory item', error: message });
    }
};

// Get all inventory items
export const getInventories = async (req: Request, res: Response) => {
    try {
        const inventories = await Inventory.find();
        res.status(200).json(inventories);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Failed to retrieve inventory items', error: message });
    }
};

// Get a single inventory item by ID
export const getInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inventory = await Inventory.findById(id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json(inventory);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Failed to retrieve inventory item', error: message });
    }
};

// Update an inventory item
export const updateInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const inventory = await Inventory.findByIdAndUpdate(id, updates, { new: true });

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json(inventory);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Failed to update inventory item', error: message });
    }
};

// Delete an inventory item
export const deleteInventory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const inventory = await Inventory.findByIdAndDelete(id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json({ message: 'Inventory item deleted' });
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Failed to delete inventory item', error: message });
    }
};
