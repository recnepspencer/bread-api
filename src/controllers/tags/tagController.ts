import { Request, Response } from 'express';
import Tag from '../../models/Tag';
import { isMongoError } from '../../utils/validation';

// Create a new tag
export const createTag = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newTag = new Tag({ name });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error creating tag', error: message });
    }
};

// Get all tags
export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving tags', error: message });
    }
};

// Get a single tag by ID
export const getTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);
        if (tag) {
            res.json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving tag', error: message });
    }
};

// Update a tag by ID
export const updateTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const tag = await Tag.findById(id);
        if (tag) {
            tag.name = name || tag.name;
            await tag.save();
            res.json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error updating tag', error: message });
    }
};

// Delete a tag by ID
export const deleteTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTag = await Tag.findByIdAndDelete(id);
        if (deletedTag) {
            res.json({ message: 'Tag deleted successfully' });
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error deleting tag', error: message });
    }
};
