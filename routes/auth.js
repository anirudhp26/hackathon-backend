import express from 'express';
import { login, register, getEmployees, deleteEmployee, updateEmployee } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getEmployees', verifyToken, getEmployees);
router.post('/updateEmployee', verifyToken, updateEmployee);
router.post('/deleteEmployee', verifyToken, deleteEmployee);

export default router;