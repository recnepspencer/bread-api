import { Schema, model } from 'mongoose';

const cropSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        trim: true,
    },
    waterRequirement: {
        type: Number,
        required: [true, 'Water requirement is required'],
        min: [0, 'Water requirement cannot be negative'],
    },
    plantDate: {
        type: Date,
        required: [true, 'Plant date is required'],
    },
    harvestDate: {
        type: Date,
        required: [true, 'Harvest date is required'],
    },
    lastWatering: {
        type: Date,
        required: [true, 'Last watering date is required'],
    },
    neededFertilizers: [{
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: [true, 'Needed fertilizers are required']
    }],
    neededPesticides: [{
        type: Schema.Types.ObjectId,
        ref: 'Inventory',
        required: [true, 'Needed pesticides are required']
    }]
});

const Crop = model('Crop', cropSchema);

export default Crop;

