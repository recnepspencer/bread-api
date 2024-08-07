import { Request, Response } from 'express';
import User from '../../models/User';
import { isMongoError } from '../../utils/validation';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, firstName, lastName, preferences, madeRecipes } = req.body;
        const newUser = new User({ username, email, password, firstName, lastName, preferences, madeRecipes });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error creating user', error: message });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('preferences').populate('madeRecipes').exec();
        res.status(200).json(users);
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving users', error: message });
    }
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('preferences').populate('madeRecipes').exec();
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving user', error: message });
    }
};

// Update user's details
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, password, firstName, lastName, preferences, madeRecipes } = req.body;

        const user = await User.findById(id);
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            user.password = password || user.password;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.preferences = preferences || user.preferences;
            user.madeRecipes = madeRecipes || user.madeRecipes;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(400).json({ message: 'Error updating user', error: message });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(204).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        const message = isMongoError(error) ? error.message : 'Unexpected error occurred';
        res.status(500).json({ message: 'Error deleting user', error: message });
    }
};
