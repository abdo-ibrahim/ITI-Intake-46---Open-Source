const express = require('express');
const db = require('../../db/database');

const router = express.Router();

// GET /authors
// Return all authors.
router.get('/', (req, res) => {
  const authors = db.prepare('SELECT * FROM authors').all();
  res.json(authors);
});

// GET /authors/:id
// Return a single author. 404 if not found.
router.get('/:id', (req, res) => {
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(req.params.id);
  if (!author) return res.status(404).json({ error: 'Not found' });
  res.json(author);
});

// POST /authors
// Create a new author. Body: { name, bio? }
// Respond 201 with the created author.
router.post('/', (req, res) => {
  const { name, bio } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const stmt = db.prepare('INSERT INTO authors (name, bio) VALUES (?, ?)');
  const info = stmt.run(name, bio || null);
  const newAuthor = db.prepare('SELECT * FROM authors WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newAuthor);
});

// PATCH /authors/:id
// Update name and/or bio. Body: { name?, bio? }
// Respond 200 with the updated author. 404 if not found.
router.patch('/:id', (req, res) => {
  const { name, bio } = req.body;
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(req.params.id);
  if (!author) return res.status(404).json({ error: 'Not found' });

  const updatedName = name !== undefined ? name : author.name;
  const updatedBio = bio !== undefined ? bio : author.bio;

  db.prepare('UPDATE authors SET name = ?, bio = ? WHERE id = ?').run(updatedName, updatedBio, req.params.id);
  const updatedAuthor = db.prepare('SELECT * FROM authors WHERE id = ?').get(req.params.id);
  res.json(updatedAuthor);
});

// DELETE /authors/:id
// Delete an author and their books (cascade). 204 on success. 404 if not found.
router.delete('/:id', (req, res) => {
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(req.params.id);
  if (!author) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM authors WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

// GET /authors/:id/books
// Return all books by this author. 404 if author not found.
router.get('/:id/books', (req, res) => {
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(req.params.id);
  if (!author) return res.status(404).json({ error: 'Not found' });

  const books = db.prepare('SELECT * FROM books WHERE author_id = ?').all(req.params.id);
  res.json(books);
});

module.exports = router;
