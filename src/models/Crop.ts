import { Schema, model } from 'mongoose';

const cropSchema = new Schema({
    name: { type: String, required: true },
    waterRequirement: { type: Number, required: true }, // e.g., inches per watering
});

const Crop = model('Crop', cropSchema);

export default Crop;