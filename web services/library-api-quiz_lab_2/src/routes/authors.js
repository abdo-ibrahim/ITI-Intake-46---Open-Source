const express = require('express');
const db = require('../../db/database');

const router = express.Router();

// GET /authors
// Return all authors.
router.get('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// GET /authors/:id
// Return a single author. 404 if not found.
router.get('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// POST /authors
// Create a new author. Body: { name, bio? }
// Respond 201 with the created author.
router.post('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// PATCH /authors/:id
// Update name and/or bio. Body: { name?, bio? }
// Respond 200 with the updated author. 404 if not found.
router.patch('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// DELETE /authors/:id
// Delete an author and their books (cascade). 204 on success. 404 if not found.
router.delete('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// GET /authors/:id/books
// Return all books by this author. 404 if author not found.
router.get('/:id/books', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

module.exports = router;
