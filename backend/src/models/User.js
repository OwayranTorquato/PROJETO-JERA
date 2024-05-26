import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });

export default mongoose.models.User || mongoose.model('user', User);