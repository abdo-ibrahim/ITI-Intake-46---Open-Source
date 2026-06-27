const express = require('express');
const db = require('../../db/database');

const router = express.Router();

// GET /books
// Return all books. Optional query param: ?author_id=<id>
router.get('/', (req, res) => {
  if (req.query.author_id) {
    const books = db.prepare('SELECT * FROM books WHERE author_id = ?').all(req.query.author_id);
    res.json(books);
  } else {
    const books = db.prepare('SELECT * FROM books').all();
    res.json(books);
  }
});

// GET /books/:id
// Return a single book including its author info. 404 if not found.
router.get('/:id', (req, res) => {
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(book.author_id);
  book.author = author;
  res.json(book);
});

// POST /books
// Create a new book. Body: { title, year?, author_id }
// Respond 201 with the created book. 404 if author_id does not exist.
router.post('/', (req, res) => {
  const { title, year, author_id } = req.body;
  if (!title || !author_id) return res.status(400).json({ error: 'Title and author_id are required' });
  
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(author_id);
  if (!author) return res.status(404).json({ error: 'Author not found' });

  const stmt = db.prepare('INSERT INTO books (title, year, author_id) VALUES (?, ?, ?)');
  const info = stmt.run(title, year || null, author_id);
  
  const newBook = db.prepare('SELECT * FROM books WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newBook);
});

// PATCH /books/:id
// Update title, year, or author_id. Body: { title?, year?, author_id? }
// Respond 200 with the updated book. 404 if not found.
router.patch('/:id', (req, res) => {
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });

  const { title, year, author_id } = req.body;
  
  if (author_id !== undefined) {
    const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(author_id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
  }

  const updatedTitle = title !== undefined ? title : book.title;
  const updatedYear = year !== undefined ? year : book.year;
  const updatedAuthorId = author_id !== undefined ? author_id : book.author_id;

  db.prepare('UPDATE books SET title = ?, year = ?, author_id = ? WHERE id = ?').run(updatedTitle, updatedYear, updatedAuthorId, req.params.id);
  
  const updatedBook = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
  res.json(updatedBook);
});

// DELETE /books/:id
// Delete a book. 204 on success. 404 if not found.
router.delete('/:id', (req, res) => {
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;
