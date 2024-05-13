import { Schema, model } from 'mongoose';

const fieldSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    crop: { type: Schema.Types.ObjectId, ref: 'Crop' },
    irrigationType: [{ type: Schema.Types.ObjectId, ref: 'Irrigation' }],
});

const Field = model('Field', fieldSchema);

export default Field;