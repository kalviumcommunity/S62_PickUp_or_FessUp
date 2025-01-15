const express = require('express');
const router = express.Router();
const { getDB } = require('./DB/mongo-client.js');

// Create a document
router.post('/users', async (req, res) => {
    try {
        const db = await getDB();
        const result = await db.insertOne(req.body);
        res.status(201).json({ message: 'User created', userId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read all documents
router.get('/users', async (req, res) => {
    try {
        const db = await getDB();
        const users = await db.find({}).toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a document
router.put('/users/:id', async (req, res) => {
    try {
        const db = await getDB();
        const { id } = req.params;
        const result = await db.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: req.body });
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a document
router.delete('/users/:id', async (req, res) => {
    try {
        const db = await getDB();
        const { id } = req.params;
        const result = await db.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
