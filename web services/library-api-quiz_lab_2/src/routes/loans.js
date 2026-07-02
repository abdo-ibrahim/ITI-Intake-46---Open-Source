const express = require('express');
const db = require('../../db/database');

const router = express.Router();

// GET /loans
// Return all loans. Optional query param: ?returned=true|false
// (filter by whether returned_at is set)
router.get('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// GET /loans/:id
// Return a single loan including book info. 404 if not found.
router.get('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// POST /loans
// Check out a book. Body: { book_id, borrower_name }
// 404 if book not found.
// 409 if the book is already on active loan (returned_at IS NULL).
// Respond 201 with the created loan.
router.post('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// PATCH /loans/:id/return
// Mark a loan as returned (set returned_at = today).
// 404 if loan not found. 409 if already returned.
// Respond 200 with the updated loan.
router.patch('/:id/return', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

module.exports = router;
