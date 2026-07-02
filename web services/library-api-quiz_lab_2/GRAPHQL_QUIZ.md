# Library API — GraphQL Quiz

Design and implement a GraphQL API for the same library management system from the REST quiz.
You will use the same SQLite database and the same `db/database.js` connection.

---

## Setup

Install the additional dependencies:

```bash
npm install @apollo/server graphql
```

Create your entry point at `src/graphql-server.js` and start it with:

```bash
node src/graphql-server.js
# GraphQL sandbox available at http://localhost:4000
```

Suggested file structure (you decide the internals):

```
src/
  graphql-server.js   ← Apollo Server setup + listen
  graphql/
    schema.js         ← type definitions (gql)
    resolvers.js      ← resolver implementations
```

---

## Database reminder

Same three tables you worked with in the REST quiz:

```
authors  (id, name, bio)
books    (id, title, year, author_id → authors.id)
loans    (id, book_id → books.id, borrower_name, loaned_at, returned_at)
```

Re-seed at any time:

```bash
npm run seed
```

---

## Your task

Define the GraphQL schema and implement all resolvers listed below.
Do not modify `db/database.js` or `db/seed.js`.

---

## Required schema types

```graphql
type Author {
  id: ID!
  name: String!
  bio: String
  books: [Book!]! # resolved — not a raw JOIN column
}

type Book {
  id: ID!
  title: String!
  year: Int
  author: Author! # resolved — not a raw foreign key
}

type Loan {
  id: ID!
  book: Book! # resolved
  borrowerName: String!
  loanedAt: String!
  returnedAt: String # null until returned
}
```

---

## Required queries

| Query     | Arguments           | Description                                                                                             |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------- |
| `authors` | —                   | Return all authors (each with their `books` resolved)                                                   |
| `author`  | `id: ID!`           | Return one author. Return `null` if not found                                                           |
| `books`   | `authorId: ID`      | Return all books. If `authorId` is provided, filter by that author                                      |
| `book`    | `id: ID!`           | Return one book with `author` resolved. Return `null` if not found                                      |
| `loans`   | `returned: Boolean` | Return all loans. If `returned` is `true` filter to returned ones; `false` to active ones; omit for all |
| `loan`    | `id: ID!`           | Return one loan with `book` resolved. Return `null` if not found                                        |

---

## Required mutations

### Author mutations

| Mutation       | Arguments                            | Returns    | Notes                                                   |
| -------------- | ------------------------------------ | ---------- | ------------------------------------------------------- |
| `createAuthor` | `name: String!, bio: String`         | `Author!`  | —                                                       |
| `updateAuthor` | `id: ID!, name: String, bio: String` | `Author`   | Return `null` if not found                              |
| `deleteAuthor` | `id: ID!`                            | `Boolean!` | `true` on success, `false` if not found. Books cascade. |

### Book mutations

| Mutation     | Arguments                                         | Returns    | Notes                                   |
| ------------ | ------------------------------------------------- | ---------- | --------------------------------------- |
| `createBook` | `title: String!, year: Int, authorId: ID!`        | `Book!`    | Throw if `authorId` does not exist      |
| `updateBook` | `id: ID!, title: String, year: Int, authorId: ID` | `Book`     | Return `null` if book not found         |
| `deleteBook` | `id: ID!`                                         | `Boolean!` | `true` on success, `false` if not found |

### Loan mutations

| Mutation       | Arguments                            | Returns | Notes                                                                     |
| -------------- | ------------------------------------ | ------- | ------------------------------------------------------------------------- |
| `checkoutBook` | `bookId: ID!, borrowerName: String!` | `Loan!` | Throw if book not found. Throw if book already on active loan.            |
| `returnBook`   | `loanId: ID!`                        | `Loan!` | Sets `returned_at` to today. Throw if loan not found or already returned. |

> For errors, throw a `GraphQLError` with a descriptive message. Do not return HTTP status codes — that is not how GraphQL signals errors.

---

## Grading criteria

- **Schema correctness** — types, fields, nullability (`!`) match the spec above
- **Resolver completeness** — every query and mutation is implemented and returns the right shape
- **Nested field resolution** — `Author.books`, `Book.author`, `Loan.book` are resolved via dedicated field resolvers, not embedded JOINs baked into the parent query
- **Argument filtering** — `books(authorId)` and `loans(returned)` filter correctly when arguments are provided
- **Error handling** — `checkoutBook` and `returnBook` throw on conflict; `createBook` throws on unknown `authorId`
- **No over-fetching in resolvers** — parent resolvers should not pre-fetch nested data speculatively; let field resolvers handle it

---

## Bonus

- Add an `activeLoans: [Loan!]!` field directly on `Book` that returns only non-returned loans
- Add pagination to `authors` and `books` using `limit` and `offset` arguments
- Create a `swagger.yaml` (or `openapi.json`) that documents the REST API from the first quiz

---

## Sample queries to test manually

Open the Apollo Sandbox at `http://localhost:4000` and try these:

```graphql
# List all authors with their books
query {
  authors {
    id
    name
    books {
      title
      year
    }
  }
}

# Get a single book with its author
query {
  book(id: "1") {
    title
    year
    author {
      name
    }
  }
}

# Filter to active (unreturned) loans
query {
  loans(returned: false) {
    id
    borrowerName
    loanedAt
    book {
      title
    }
  }
}

# Check out a book
mutation {
  checkoutBook(bookId: "5", borrowerName: "Carol White") {
    id
    loanedAt
    book {
      title
    }
  }
}

# Return it
mutation {
  returnBook(loanId: "3") {
    id
    returnedAt
  }
}

# Create then delete an author
mutation {
  createAuthor(name: "Ursula K. Le Guin", bio: "American author.") {
    id
    name
  }
}

mutation {
  deleteAuthor(id: "4")
}
```
