import { Schema, model } from 'mongoose';

const inventorySchema = new Schema({
    type: { type: String, required: true }, // Type of inventory item, e.g., seed, fertilizer, etc.
    cost: { type: Number, required: true },
    expirationDate: { type: Date, default: null },
    orderNumber: { type: String, required: true },
    dateReceived: { type: Date, required: true },
    quantity: { type: Number, required: true }, // Number of units/items in stock
    supplier: { type: String, required: true }, // Supplier's name or ID
    notes: { type: String, default: '' } // Any additional notes
});

const Inventory = model('Inventory', inventorySchema);

export default Inventory;