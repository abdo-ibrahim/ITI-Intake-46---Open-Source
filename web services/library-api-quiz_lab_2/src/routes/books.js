const express = require('express');
const db = require('../../db/database');

const router = express.Router();

// GET /books
// Return all books. Optional query param: ?author_id=<id>
router.get('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// GET /books/:id
// Return a single book including its author info. 404 if not found.
router.get('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// POST /books
// Create a new book. Body: { title, year?, author_id }
// Respond 201 with the created book. 404 if author_id does not exist.
router.post('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// PATCH /books/:id
// Update title, year, or author_id. Body: { title?, year?, author_id? }
// Respond 200 with the updated book. 404 if not found.
router.patch('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// DELETE /books/:id
// Delete a book. 204 on success. 404 if not found.
router.delete('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

module.exports = router;
