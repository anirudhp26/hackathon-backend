import Item from "../models/Item.js";

export async function createItem(req, res) {
    try {
        const { name, quantity } = req.body;
        const newItem = new Item({ name, quantity });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getAllItems(req, res) {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function updateItem(req, res) {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, quantity },
            { new: true }
        );
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteItem(req, res) {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        res.status(200).json(deletedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}