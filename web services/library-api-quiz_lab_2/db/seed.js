const db = require('./database');

db.exec(`
  DROP TABLE IF EXISTS loans;
  DROP TABLE IF EXISTS books;
  DROP TABLE IF EXISTS authors;

  CREATE TABLE authors (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT NOT NULL,
    bio     TEXT
  );

  CREATE TABLE books (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    title     TEXT NOT NULL,
    year      INTEGER,
    author_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
  );

  CREATE TABLE loans (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id        INTEGER NOT NULL,
    borrower_name  TEXT NOT NULL,
    loaned_at      TEXT NOT NULL DEFAULT (date('now')),
    returned_at    TEXT,
    FOREIGN KEY (book_id) REFERENCES books(id)
  );
`);

const addAuthor = db.prepare('INSERT INTO authors (name, bio) VALUES (?, ?)');
const addBook   = db.prepare('INSERT INTO books (title, year, author_id) VALUES (?, ?, ?)');
const addLoan   = db.prepare('INSERT INTO loans (book_id, borrower_name, loaned_at) VALUES (?, ?, ?)');

const orwell  = addAuthor.run('George Orwell',  'English novelist best known for dystopian fiction.');
const rowling = addAuthor.run('J.K. Rowling',   'British author of the Harry Potter series.');
const herbert = addAuthor.run('Frank Herbert',  'American science fiction author.');

const b1984   = addBook.run('1984',                                        1949, orwell.lastInsertRowid);
const bFarm   = addBook.run('Animal Farm',                                 1945, orwell.lastInsertRowid);
const bHP1    = addBook.run("Harry Potter and the Philosopher's Stone",    1997, rowling.lastInsertRowid);
const bHP2    = addBook.run('Harry Potter and the Chamber of Secrets',     1998, rowling.lastInsertRowid);
const bDune   = addBook.run('Dune',                                        1965, herbert.lastInsertRowid);

addLoan.run(b1984.lastInsertRowid, 'Alice Johnson', '2024-01-10');
addLoan.run(bHP1.lastInsertRowid,  'Bob Smith',     '2024-01-15');

console.log('Database seeded successfully.');
