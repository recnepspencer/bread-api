import { Request, Response } from 'express';
import User from '../models/User';
import { UserQuery } from '../types/userTypes';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        const newUser = new User({ username, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        const message = (error as Error).message || 'Unexpected error occurred';
        res.status(400).json({ message: 'Error creating user', error: message });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        const message = (error as Error).message || 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving users', error: message });
    }
};

// Get a single user by username or email
export const getUser = async (req: Request, res: Response) => {
    try {
        // Extract query params and assert the specific structure
        const { username, email } = req.query as Partial<UserQuery>;
        const query: UserQuery = {};
        if (username) query.username = username;
        if (email) query.email = email;

        const user = await User.findOne(query);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        const message = (error as Error).message || 'Unexpected error occurred';
        res.status(500).json({ message: 'Error retrieving user', error: message });
    }
};
// Update user's username or email
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        const message = (error as Error).message || 'Unexpected error occurred';
        res.status(400).json({ message: 'Error updating user', error: message });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        const message = (error as Error).message || 'Unexpected error occurred';
        res.status(500).json({ message: 'Error deleting user', error: message });
    }
};
