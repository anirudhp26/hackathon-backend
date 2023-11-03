import express from 'express';
import { createItem, deleteItem, getAllItems, updateItem } from '../controllers/items.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/updateItem', verifyToken, updateItem);
router.post('/deleteItem', verifyToken, deleteItem);
router.get('/getItems', verifyToken, getAllItems);
router.post('/createItem', verifyToken, createItem);

export default router;