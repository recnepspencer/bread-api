import { Schema, model } from 'mongoose';

const fieldSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [1, 'Name must be at least 1 character long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minlength: [1, 'Location must be at least 1 character long'],
        maxlength: [100, 'Location cannot exceed 100 characters'],
        trim: true,
    },
    crop: {
        type: Schema.Types.ObjectId,
        ref: 'Crop',
    },
    irrigationType: [{
        type: Schema.Types.ObjectId,
        ref: 'Irrigation',
    }],
});

const Field = model('Field', fieldSchema);

export default Field;