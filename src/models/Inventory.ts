import { Schema, model } from 'mongoose';

const inventorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        trim: true,
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required'],
        min: [0, 'Cost cannot be negative'],
    },
    expirationDate: {
        type: Date,
        default: null,
    },
    orderNumber: {
        type: String,
        required: [true, 'Order number is required'],
        trim: true,
    },
    dateReceived: {
        type: Date,
        required: [true, 'Date received is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    supplier: {
        type: String,
        required: [true, 'Supplier is required'],
        trim: true,
    },
    notes: {
        type: String,
        default: '',
        trim: true,
    }
});

const Inventory = model('Inventory', inventorySchema);

export default Inventory;
