const express = require('express')
const router = express.Router()
const Note = require('../models/notesmodel')
router.post('/list', async (req, res) => {
    try {
        const data = await Note.find({ userid: req.body.userid });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No notes found. Create new ones.' });
        }
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/update', async (req, res) => {
    try {
        const existingNote = await Note.findOne({ id: req.body.id });
        if (!existingNote) {
            return res.status(404).json({ message: 'Note not found for the given ID.' });
        }
        // Update the existing note fields
        existingNote.userid = req.body.userid;
        existingNote.title = req.body.title;
        existingNote.content = req.body.content;

        await existingNote.save();
        return res.status(200).json({ message: 'Data updated successfully', data: existingNote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/create', async (req, res) => {
    try {
        const existingNote = await Note.findOne({ id: req.body.id });
        if (existingNote) {
            return res.status(400).json({ message: 'Note with this ID already exists.' });
        }

        const note = new Note({
            userid: req.body.userid,
            id: req.body.id,
            title: req.body.title,
            content: req.body.content
        });
        await note.save();
        return res.status(201).json({ message: 'New note created successfully', data: note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/delete', async (req, res) => {
    try {
        result = await Note.deleteOne({ id: req.body.id })
        if (result.deletedCount > 0) {
            return res.json({ message: 'Note deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Note not found' });
        }
    } catch (errorr) {
        res.status(500).send({ error: errorr.message })
    }
})
module.exports = router