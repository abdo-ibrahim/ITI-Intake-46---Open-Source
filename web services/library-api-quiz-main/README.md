# Library API Quiz

Design and implement a RESTful API for a library management system.

## Setup

```bash
npm install
npm run seed   # creates and populates db/library.db
npm start      # starts the server on http://localhost:3000
```

For auto-reload during development:
```bash
npm run dev
```

## Database schema

```
authors
  id        INTEGER  (primary key)
  name      TEXT     (required)
  bio       TEXT

books
  id        INTEGER  (primary key)
  title     TEXT     (required)
  year      INTEGER
  author_id INTEGER  → authors.id  (required, cascades on delete)

loans
  id             INTEGER  (primary key)
  book_id        INTEGER  → books.id  (required)
  borrower_name  TEXT     (required)
  loaned_at      TEXT     (date string, defaults to today)
  returned_at    TEXT     (null until returned)
```

## Your task

Implement all route handlers in `src/routes/`. Each handler currently returns `501 Not Implemented`. Do not modify `src/index.js`, `db/database.js`, or `db/seed.js`.

---

## Required endpoints

### Authors

| Method | Path | Description |
|--------|------|-------------|
| GET | `/authors` | List all authors |
| GET | `/authors/:id` | Get one author — `404` if not found |
| POST | `/authors` | Create author — body: `{ name, bio? }` — respond `201` |
| PATCH | `/authors/:id` | Update `name` and/or `bio` — `404` if not found |
| DELETE | `/authors/:id` | Delete author (books cascade) — respond `204` — `404` if not found |
| GET | `/authors/:id/books` | List books by this author — `404` if author not found |

### Books

| Method | Path | Description |
|--------|------|-------------|
| GET | `/books` | List all books — supports `?author_id=<id>` filter |
| GET | `/books/:id` | Get one book including its author — `404` if not found |
| POST | `/books` | Create book — body: `{ title, year?, author_id }` — respond `201` — `404` if `author_id` not found |
| PATCH | `/books/:id` | Update `title`, `year`, and/or `author_id` — `404` if not found |
| DELETE | `/books/:id` | Delete book — respond `204` — `404` if not found |

### Loans

| Method | Path | Description |
|--------|------|-------------|
| GET | `/loans` | List all loans — supports `?returned=true\|false` filter |
| GET | `/loans/:id` | Get one loan including book info — `404` if not found |
| POST | `/loans` | Check out a book — body: `{ book_id, borrower_name }` — respond `201` — `404` if book not found — `409` if book already on active loan |
| PATCH | `/loans/:id/return` | Return a book (set `returned_at`) — `404` if loan not found — `409` if already returned |

---

### Create Swagger File

## Grading criteria

- **Correct HTTP methods** — GET for reads, POST for creates, PATCH for partial updates, DELETE for deletes
- **Correct status codes** — 200, 201, 204, 404, 409 used where specified
- **Proper use of URL params and query strings** — IDs in path, filters as query params
- **Meaningful JSON responses** — include the resource (or resources) in the body
- **Relationship handling** — `GET /books/:id` includes author data; `GET /loans/:id` includes book data
- **Business logic** — loan conflict check (409 when book already out), return idempotency check (409 when already returned)

## Testing

With the server running, execute:

```bash
bash test.sh
```

All 20 checks should pass when the implementation is complete.
