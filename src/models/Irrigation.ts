import e from 'express';
import { Schema, model } from 'mongoose';

const irrigationSchema = new Schema({
    type: { type: String, required: true },
    isAutomatable: { type: Boolean, default: false },
    hoursPerInch: { type: Number, required: true } 
});

const Irrigation = model('Irrigation', irrigationSchema);

export default Irrigation;