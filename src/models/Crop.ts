import { Schema, model } from 'mongoose';

const cropSchema = new Schema({
    name: { type: String, required: true },
    waterRequirement: { type: Number, required: true }, // e.g., inches per watering
    plantDate: { type: Date, required: true },
    harvestDate: { type: Date, required: true },
    lastWatering: { type: Date, required: true },
    neededFertilizers: { type: [String], required: true }, // Array of fertilizer names
    neededPesticides: { type: [String], required: true } // Array of pesticide names
});

const Crop = model('Crop', cropSchema);

export default Crop;