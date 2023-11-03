import mongoose from "mongoose";
const Schema = mongoose.Schema;

const items = new Schema(
    {
        name: {type: String, required: true},
        quantity: {type: Number, required: true, default: 0},
    },
    {
        timestamps: true,
    },
);

const Item = mongoose.model('items', items);
export default Item;