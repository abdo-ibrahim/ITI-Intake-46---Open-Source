const express = require('express');
const db = require('../../db/database');

const router = express.Router();

// GET /loans
// Return all loans. Optional query param: ?returned=true|false
// (filter by whether returned_at is set)
router.get('/', (req, res) => {
  if (req.query.returned === 'true') {
    const loans = db.prepare('SELECT * FROM loans WHERE returned_at IS NOT NULL').all();
    res.json(loans);
  } else if (req.query.returned === 'false') {
    const loans = db.prepare('SELECT * FROM loans WHERE returned_at IS NULL').all();
    res.json(loans);
  } else {
    const loans = db.prepare('SELECT * FROM loans').all();
    res.json(loans);
  }
});

// GET /loans/:id
// Return a single loan including book info. 404 if not found.
router.get('/:id', (req, res) => {
  const loan = db.prepare('SELECT * FROM loans WHERE id = ?').get(req.params.id);
  if (!loan) return res.status(404).json({ error: 'Not found' });
  
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(loan.book_id);
  loan.book = book;
  
  res.json(loan);
});

// POST /loans
// Check out a book. Body: { book_id, borrower_name }
// 404 if book not found.
// 409 if the book is already on active loan (returned_at IS NULL).
// Respond 201 with the created loan.
router.post('/', (req, res) => {
  const { book_id, borrower_name } = req.body;
  if (!book_id || !borrower_name) return res.status(400).json({ error: 'book_id and borrower_name are required' });

  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(book_id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const activeLoan = db.prepare('SELECT * FROM loans WHERE book_id = ? AND returned_at IS NULL').get(book_id);
  if (activeLoan) return res.status(409).json({ error: 'Book is already on active loan' });

  const dateStr = new Date().toISOString().split('T')[0]; // simple date string like "2026-06-27"
  const stmt = db.prepare('INSERT INTO loans (book_id, borrower_name, loaned_at) VALUES (?, ?, ?)');
  const info = stmt.run(book_id, borrower_name, dateStr);
  
  const newLoan = db.prepare('SELECT * FROM loans WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newLoan);
});

// PATCH /loans/:id/return
// Mark a loan as returned (set returned_at = today).
// 404 if loan not found. 409 if already returned.
// Respond 200 with the updated loan.
router.patch('/:id/return', (req, res) => {
  const loan = db.prepare('SELECT * FROM loans WHERE id = ?').get(req.params.id);
  if (!loan) return res.status(404).json({ error: 'Not found' });

  if (loan.returned_at !== null) return res.status(409).json({ error: 'Already returned' });

  const dateStr = new Date().toISOString().split('T')[0];
  db.prepare('UPDATE loans SET returned_at = ? WHERE id = ?').run(dateStr, req.params.id);
  
  const updatedLoan = db.prepare('SELECT * FROM loans WHERE id = ?').get(req.params.id);
  res.json(updatedLoan);
});

module.exports = router;
