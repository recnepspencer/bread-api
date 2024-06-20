import { Schema, model } from 'mongoose';

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required'],
        unique: true,
        trim: true,
    },
});

const Tag = model('Tag', tagSchema);

export default Tag;