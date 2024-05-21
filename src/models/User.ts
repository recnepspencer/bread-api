import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }]
});

const User = model('User', userSchema);

export default User;