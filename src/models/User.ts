import { Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    preferences: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
    },
    madeRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

const User = model('User', userSchema);

export default User;