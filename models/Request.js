import mongoose from 'mongoose';
const { Schema } = mongoose;

const requestSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
});

const Request = mongoose.model('Request', requestSchema);

export default Request;