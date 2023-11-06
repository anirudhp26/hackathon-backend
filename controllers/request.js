import Request from '../models/Request.js';

export async function createRequest(req, res) {
    try {
        const { name, quantity, sender } = req.body;
        const newRequest = new Request({ name: name, quantity: quantity, sender: sender });
        await newRequest.save();
        res.status(200).json({newRequest});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getAllRequests(req, res) {
    try {
        const requests = await Request.find();
        res.status(200).json({requests});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function updateRequest(req, res) {
    try {
        const { id, name, quantity, isApproved } = req.body;
        const updatedRequest = await Request.findByIdAndUpdate(
            id,
            { name, quantity, isApproved },
            { new: true }
        );
        res.status(200).json({updatedRequest});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteRequest(req, res) {
    try {
        const { id } = req.params;
        const deletedRequest = await Request.findByIdAndDelete(id);
        res.status(200).json(deletedRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}