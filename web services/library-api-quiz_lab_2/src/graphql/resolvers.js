const { GraphQLError } = require("graphql");
const db = require("../../db/database");

function mapLoan(loan) {
  if (!loan) return null;
  return {
    id: loan.id,
    borrowerName: loan.borrower_name,
    loanedAt: loan.loaned_at,
    returnedAt: loan.returned_at,
    book_id: loan.book_id,
  };
}

const resolvers = {
  Query: {
    // Return all authors
    authors: (parent, args) => {
      let sql = "SELECT * FROM authors";
      const params = [];
      if (args.limit !== undefined && args.limit !== null) {
        sql += " LIMIT ?";
        params.push(args.limit);
        if (args.offset !== undefined && args.offset !== null) {
          sql += " OFFSET ?";
          params.push(args.offset);
        }
      }
      return db.prepare(sql).all(...params);
    },

    // Return one author or null if not found
    author: (parent, { id }) => {
      const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(id);
      return author || null;
    },

    // Return all books
    books: (parent, args) => {
      let sql = "SELECT * FROM books";
      const params = [];

      if (args.authorId !== undefined && args.authorId !== null) {
        sql += " WHERE author_id = ?";
        params.push(args.authorId);
      }

      if (args.limit !== undefined && args.limit !== null) {
        sql += " LIMIT ?";
        params.push(args.limit);
        if (args.offset !== undefined && args.offset !== null) {
          sql += " OFFSET ?";
          params.push(args.offset);
        }
      }

      return db.prepare(sql).all(...params);
    },

    // Return one book or null if not found
    book: (parent, { id }) => {
      const book = db.prepare("SELECT * FROM books WHERE id = ?").get(id);
      return book || null;
    },

    // Return loans
    loans: (parent, { returned }) => {
      let sql = "SELECT * FROM loans";
      const params = [];

      if (returned === true) {
        sql += " WHERE returned_at IS NOT NULL";
      } else if (returned === false) {
        sql += " WHERE returned_at IS NULL";
      }

      const rows = db.prepare(sql).all(...params);
      return rows.map(mapLoan);
    },

    // Return one loan or null if not found
    loan: (parent, { id }) => {
      const loan = db.prepare("SELECT * FROM loans WHERE id = ?").get(id);
      return mapLoan(loan);
    },
  },

  Mutation: {
    // Author mutations
    createAuthor: (parent, { name, bio }) => {
      const result = db.prepare("INSERT INTO authors (name, bio) VALUES (?, ?)").run(name, bio || null);
      return db.prepare("SELECT * FROM authors WHERE id = ?").get(result.lastInsertRowid);
    },

    updateAuthor: (parent, { id, name, bio }) => {
      const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(id);
      if (!author) return null;

      const finalName = name !== undefined ? name : author.name;
      const finalBio = bio !== undefined ? bio : author.bio;

      db.prepare("UPDATE authors SET name = ?, bio = ? WHERE id = ?").run(finalName, finalBio, id);
      return db.prepare("SELECT * FROM authors WHERE id = ?").get(id);
    },

    deleteAuthor: (parent, { id }) => {
      const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(id);
      if (!author) return false;

      db.prepare("DELETE FROM authors WHERE id = ?").run(id);
      return true;
    },

    // Book mutations
    createBook: (parent, { title, year, authorId }) => {
      const author = db.prepare("SELECT 1 FROM authors WHERE id = ?").get(authorId);
      if (!author) {
        throw new GraphQLError(`Author with ID ${authorId} does not exist.`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const result = db.prepare("INSERT INTO books (title, year, author_id) VALUES (?, ?, ?)").run(title, year || null, authorId);
      return db.prepare("SELECT * FROM books WHERE id = ?").get(result.lastInsertRowid);
    },

    updateBook: (parent, { id, title, year, authorId }) => {
      const book = db.prepare("SELECT * FROM books WHERE id = ?").get(id);
      if (!book) return null;

      if (authorId !== undefined && authorId !== null) {
        const author = db.prepare("SELECT 1 FROM authors WHERE id = ?").get(authorId);
        if (!author) {
          throw new GraphQLError(`Author with ID ${authorId} does not exist.`, {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }
      }

      const finalTitle = title !== undefined ? title : book.title;
      const finalYear = year !== undefined ? year : book.year;
      const finalAuthorId = authorId !== undefined ? authorId : book.author_id;

      db.prepare("UPDATE books SET title = ?, year = ?, author_id = ? WHERE id = ?").run(finalTitle, finalYear, finalAuthorId, id);
      return db.prepare("SELECT * FROM books WHERE id = ?").get(id);
    },

    deleteBook: (parent, { id }) => {
      const book = db.prepare("SELECT * FROM books WHERE id = ?").get(id);
      if (!book) return false;

      db.prepare("DELETE FROM books WHERE id = ?").run(id);
      return true;
    },

    // Loan mutations
    checkoutBook: (parent, { bookId, borrowerName }) => {
      const book = db.prepare("SELECT 1 FROM books WHERE id = ?").get(bookId);
      if (!book) {
        throw new GraphQLError(`Book with ID ${bookId} not found.`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const activeLoan = db.prepare("SELECT 1 FROM loans WHERE book_id = ? AND returned_at IS NULL").get(bookId);
      if (activeLoan) {
        throw new GraphQLError(`Book with ID ${bookId} is already checked out and has not been returned yet.`, {
          extensions: { code: "CONFLICT" },
        });
      }

      const today = new Date().toISOString().split("T")[0];
      const result = db.prepare("INSERT INTO loans (book_id, borrower_name, loaned_at) VALUES (?, ?, ?)").run(bookId, borrowerName, today);

      const newLoan = db.prepare("SELECT * FROM loans WHERE id = ?").get(result.lastInsertRowid);
      return mapLoan(newLoan);
    },

    returnBook: (parent, { loanId }) => {
      const loan = db.prepare("SELECT * FROM loans WHERE id = ?").get(loanId);
      if (!loan) {
        throw new GraphQLError(`Loan with ID ${loanId} not found.`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      if (loan.returned_at) {
        throw new GraphQLError(`Book from loan ID ${loanId} has already been returned.`, {
          extensions: { code: "CONFLICT" },
        });
      }

      const today = new Date().toISOString().split("T")[0];
      db.prepare("UPDATE loans SET returned_at = ? WHERE id = ?").run(today, loanId);

      const updatedLoan = db.prepare("SELECT * FROM loans WHERE id = ?").get(loanId);
      return mapLoan(updatedLoan);
    },
  },

  Author: {
    books: (author) => {
      return db.prepare("SELECT * FROM books WHERE author_id = ?").all(author.id);
    },
  },

  Book: {
    author: (book) => {
      return db.prepare("SELECT * FROM authors WHERE id = ?").get(book.author_id);
    },
    activeLoans: (book) => {
      const rows = db.prepare("SELECT * FROM loans WHERE book_id = ? AND returned_at IS NULL").all(book.id);
      return rows.map(mapLoan);
    },
  },

  Loan: {
    book: (loan) => {
      return db.prepare("SELECT * FROM books WHERE id = ?").get(loan.book_id);
    },
  },
};

module.exports = resolvers;
