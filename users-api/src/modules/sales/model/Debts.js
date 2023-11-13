import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const Debts = new Schema({
    debts: {
        type: Array,
        required: true, 
    },
    user: {
        type: Object,
        required: true,
    },
    status: {
        type: String, 
        required: true, 
    },
    createdAt: {
        type: Date, 
        required: true, 
    },
    updatedAt: {
        type: Date, 
        required: true
    },
})

export default model("Users", Debts);