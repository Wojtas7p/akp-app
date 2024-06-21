const express = require('express');
const router = express.Router();
const Note = require('../db/models/note');

// Logger middleware
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// GET all notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        console.log('Fetched all notes:', notes);
        res.send(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send({ error: 'Error fetching notes', details: error });
    }
});

// GET a single note by ID
router.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            console.log('Note not found:', req.params.id);
            return res.status(404).send({ error: 'Note not found' });
        }
        console.log('Fetched note:', note);
        res.send(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).send({ error: 'Error fetching note', details: error });
    }
});

// POST to add a new note
router.post('/notes', async (req, res) => {
    const { title, image, body } = req.body;

    try {
        const note = new Note({
            title,
            image,
            body
        });

        await note.save();
        console.log('Added new note:', note);
        res.status(201).send(note);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(400).send({ error: 'Error adding note', details: error });
    }
});

// POST to add a new section to the body of a note
router.post('/notes/:id/body', async (req, res) => {
    const { title, body } = req.body;

    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            console.log('Note not found:', req.params.id);
            return res.status(404).send({ error: 'Note not found' });
        }

        note.body.push({ title, body: body || [] });
        await note.save();
        console.log('Added new section to note:', note);
        res.status(201).send(note);
    } catch (error) {
        console.error('Error adding section to note body:', error);
        res.status(400).send({ error: 'Error adding section to note body', details: error });
    }
});

// POST to add a new subsection to the body of a specific section in a note
router.post('/notes/:noteId/body/:sectionId', async (req, res) => {
    const { title, image, body } = req.body;

    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) {
            console.log('Note not found:', req.params.noteId);
            return res.status(404).send({ error: 'Note not found' });
        }

        const section = note.body.id(req.params.sectionId);
        if (!section) {
            console.log('Section not found:', req.params.sectionId);
            return res.status(404).send({ error: 'Section not found' });
        }

        section.body.push({ title, image, body });
        await note.save();
        console.log('Added new subsection to section:', note);
        res.status(201).send(note);
    } catch (error) {
        console.error('Error adding subsection to section:', error);
        res.status(400).send({ error: 'Error adding subsection to section', details: error });
    }
});

// PUT to update a note by ID
router.put('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) {
            console.log('Note not found:', req.params.id);
            return res.status(404).send({ error: 'Note not found' });
        }
        console.log('Updated note:', note);
        res.send(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(400).send({ error: 'Error updating note', details: error });
    }
});

// DELETE a note by ID
router.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            console.log('Note not found:', req.params.id);
            return res.status(404).send({ error: 'Note not found' });
        }
        console.log('Deleted note:', note);
        res.send(note);
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send({ error: 'Error deleting note', details: error });
    }
});

module.exports = router;