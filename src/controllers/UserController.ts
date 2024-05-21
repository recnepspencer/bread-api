import { Request, Response } from 'express';
import User from '../models/User';
import { UserQuery } from '../types/userTypes';


// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, fields } = req.body;
        const newUser = new User({ username, email, fields }); 
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

// Get a single user by username or email, including their fields
export const getUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.query as Partial<UserQuery>;
        const query: UserQuery = {};
        if (username) query.username = username;
        if (email) query.email = email;

        const user = await User.findOne(query).populate('fields');
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

// Update user's username, email, or fields
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, fields } = req.body;
        
        const user = await User.findById(id);
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            user.fields = fields || user.fields;
            res.json(user);
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

export const getUserFieldsDetails = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
                               .populate({
                                   path: 'fields',
                                   select: 'name location',
                                   populate: [
                                       { path: 'crop', select: 'name' },
                                       { path: 'irrigationType', select: 'type' }
                                   ]
                               });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error fetching user details');
    }
};