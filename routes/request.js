import express from 'express';
import { createRequest, deleteRequest, getAllRequests, updateRequest } from '../controllers/request.js';

const router = express.Router();

router.post('/createRequest', createRequest);
router.post('/getAllRequests', getAllRequests);
router.post('/updateRequest', updateRequest);
router.post('/deleteRequest', deleteRequest);

export default router;