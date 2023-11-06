import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';
const salt = 1;

export async function register(req, res) {
    try {
        const { name, email, password, branch, post } = req.body;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newEmployee = new Employee({
            name,
            email,
            password: hashedPassword,
            branch,
            post: "Professor",
            isAdmin: false,
        });
        await newEmployee.save();
        const token = jwt.sign({ email: newEmployee.email, id: newEmployee._id }, 'test');
        res.status(200).json({newEmployee, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, employee.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: employee.email, id: employee._id }, 'test');
        res.status(200).json({ employee, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getEmployees(req, res) {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const { name, email, branch, post, isAdmin } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, branch, post, isAdmin },
            { new: true }
        );
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        res.status(200).json(deletedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}