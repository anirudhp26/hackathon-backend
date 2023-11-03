import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employees = new Schema(
    {
        name: {type: String, required: true},
        branch: {type: String, required: true},
        post: {type: String, required: true},
        isAdmin: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
    },
);

const Employee = mongoose.model('employees', employees);
export default Employee;