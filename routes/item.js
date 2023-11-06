import express from 'express';
import { createItem, deleteItem, getAllItems, updateItem } from '../controllers/items.js';

const router = express.Router();

router.post('/updateItem', updateItem);
router.post('/deleteItem', deleteItem);
router.post('/getItems', getAllItems);
router.post('/createItem', createItem);

export default router;