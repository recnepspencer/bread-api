import { Schema, model } from 'mongoose';

const irrigationSchema = new Schema({
    type: {
        type: String,
        required: [true, 'Type is required'],
        trim: true,
    },
    isAutomatable: {
        type: Boolean,
        default: false,
    },
    hoursPerInch: {
        type: Number,
        required: [true, 'Hours per inch is required'],
        min: [0, 'Hours per inch cannot be negative'],
    }
});

const Irrigation = model('Irrigation', irrigationSchema);

export default Irrigation;