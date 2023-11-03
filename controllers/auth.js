import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';
const salt = 1;

export async function register(req, res) {
    try {
        const { name, branch, post, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newEmployee = new Employee({ name, branch, post, isAdmin: false, password: hashedPassword });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export async function login(req, res) {
    try {
        const { name, password } = req.body;
        const employee = await Employee.findOne({ name });
        if (!employee) return res.status(400).json({ message: 'Employee not found' });
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export async function getEmployees(req, res) {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const { name, branch, post, isAdmin } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, branch, post, isAdmin }, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        res.status(200).json(deletedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}