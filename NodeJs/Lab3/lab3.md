# Lab 3: Refactoring to MVC Architecture & Advanced Error Handling

## Objective
In this lab, you will refactor your existing Posts and Users CRUD operations from Lab 2 to follow a clean MVC (Model-View-Controller) architecture pattern. You'll also implement environment variables, global error handling, Joi validation, and CORS configuration - all the concepts we learned in Day 3.

---

## Requirements

### 1. Install Required Dependencies

First, install the necessary packages for Day 3:

```bash
npm install cors dotenv joi
```

**Packages explained:**
- `cors`: Enables Cross-Origin Resource Sharing
- `dotenv`: Loads environment variables from `.env` file
- `joi`: Schema validation library

---

### 2. Set Up Environment Variables

Create a `.env` file in your project root with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=iti-zag
```

**Tasks:**
- Create `.env` file in the root directory
- Update `index.js` to use `dotenv` and load environment variables
- Replace hardcoded values (port, MongoDB connection string) with environment variables
- Add `.env` to your `.gitignore` file (if not already present)

**Hint:** Use `require('dotenv').config()` at the top of your `index.js` file.

---

### 3. Refactor to MVC Architecture

Refactor your code to follow the MVC pattern. Create the following folder structure:

```
demo/
├── index.js (main server file)
├── .env
├── package.json
├── models/
│   ├── users.js
│   └── posts.js
├── routers/
│   ├── users.js
│   └── posts.js
├── controllers/
│   ├── users.js
│   └── posts.js
├── services/
│   ├── users.js
│   └── posts.js
├── schemas/
│   ├── users/
│   │   ├── createUserSchema.js
│   │   ├── getAllUsersSchema.js
│   │   ├── updateUserSchema.js
│   │   └── index.js
│   ├── posts/
│   │   ├── createPostSchema.js
│   │   ├── getAllPostsSchema.js
│   │   ├── updatePostSchema.js
│   │   └── index.js
│   └── index.js
├── middlewares/
│   ├── errorHandler.js
│   └── validate.js
└── utils/
    └── APIError.js
```

#### 3.1 Models Layer (`models/`)

**Tasks:**
- Move User schema to `models/users.js`
- Create Post schema in `models/posts.js` with the following fields:
  - `title` (String, required)
  - `content` (String, required)
  - `author` (String, required)
  - `tags` (Array of Strings, optional)
  - `published` (Boolean, default: false)
  - `likes` (Number, default: 0)
  - `timestamps` (enabled)
- Export Mongoose models from each file

**Example structure:**
```javascript
// models/posts.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // your schema definition
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
```

#### 3.2 Services Layer (`services/`)

**Tasks:**
- Create `services/users.js` with all user-related database operations:
  - `createUser(userData)`
  - `getAllUsers(query)` - with pagination
  - `getUserById(id)`
  - `updateUserById(id, userData)`
  - `deleteUserById(id)`
- Create `services/posts.js` with all post-related database operations:
  - `createPost(postData)`
  - `getAllPosts(query)` - with pagination
  - `getPostById(id)`
  - `updatePostById(id, postData)`
  - `deletePostById(id)`

**Important:** Services should only interact with models/database. They should NOT handle HTTP requests/responses

#### 3.3 Controllers Layer (`controllers/`)

**Tasks:**
- Create `controllers/users.js` with controller functions:
  - `createUser(req, res)`
  - `getAllUsers(req, res)`
  - `getUserById(req, res)`
  - `updateUserById(req, res)`
  - `deleteUserById(req, res)`
- Create `controllers/posts.js` with controller functions:
  - `createPost(req, res)`
  - `getAllPosts(req, res)`
  - `getPostById(req, res)`
  - `updatePostById(req, res)`
  - `deletePostById(req, res)`

**Important:** 
- Controllers call service functions
- Controllers handle HTTP responses
- Use `APIError` class to throw errors (e.g., "Post not found" → `throw new APIError("Post not found", 404)`)
- Remove all direct `res.status().json()` error responses - use `throw new APIError()` instead

#### 3.4 Routers Layer (`routers/`)

**Tasks:**
- Create `routers/users.js` using `express.Router()`
- Create `routers/posts.js` using `express.Router()`
- Map routes to controller functions
- Apply validation middleware where needed
- Register routers in `index.js` using `app.use('/users', userRouter)` and `app.use('/posts', postRouter)`

**Example:**
```javascript
// routers/posts.js
const express = require('express');
const postsController = require('../controllers/posts');
const schemas = require('../schemas');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', validate(schemas.posts.createPostSchema), postsController.createPost);
router.get('/', validate(schemas.posts.getAllPostsSchema), postsController.getAllPosts);
// ... other routes

module.exports = router;
```

---

### 4. Implement APIError Class

**Tasks:**
- Create `utils/APIError.js`
- Create a custom error class that extends `Error`
- Include `statusCode` and `isClientError` properties
- Use `Error.captureStackTrace()` for proper stack traces

**Example:**
```javascript
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isClientError = this.statusCode >= 400 && this.statusCode < 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = APIError;
```

---

### 5. Implement Global Error Handler Middleware

**Tasks:**
- Create `middlewares/errorHandler.js`
- Handle `APIError` instances
- Handle MongoDB errors:
  - `CastError` (invalid ObjectId format)
  - `MongoServerError` with code `11000` (duplicate key)
  - `ValidationError` (Mongoose validation errors)
- Return appropriate error responses with consistent format:
  ```json
  {
    "message": "Error message",
    "success": false,
    "isClientError": true/false
  }
  ```
- Handle unexpected errors (500 status)

**Important:** This middleware should be the LAST middleware registered in `index.js` (after all routes).

---

### 6. Implement Joi Validation Middleware

**Tasks:**
- Create `middlewares/validate.js`
- Accept a schema object that can validate `req.body`, `req.query`, and `req.params`
- Use Joi to validate each specified part of the request
- Throw `APIError` with status 400 if validation fails
- Call `next()` if validation passes

**Example:**
```javascript
const APIError = require('../utils/APIError');

module.exports = (schema) => {
    return (req, res, next) => {
        for (const key in schema) {
            const { error } = schema[key].validate(req[key], { abortEarly: true });
            if (error) {
                throw new APIError(error.details[0].message, 400);
            }
        }
        next();
    }
}
```

---

### 7. Create Joi Validation Schemas

**Tasks:**

#### 7.1 User Schemas (`schemas/users/`)

Create validation schemas for:

**`createUserSchema.js`:**
- Validate `req.body`:
  - `name`: string, alphanum, min 3, max 30, required
  - `email`: string, email format, required
  - `password`: string, min 8, max 30, required
  - `age`: number, min 18, max 150, required

**`getAllUsersSchema.js`:**
- Validate `req.query`:
  - `page`: number, min 1 (optional)
  - `limit`: number, min 1, max 100 (optional)

**`updateUserSchema.js`:**
- Validate `req.body`:
  - `name`: string, alphanum, min 3, max 30 (optional)
  - `email`: string, email format (optional)
  - `age`: number, min 18, max 150 (optional)
- Validate `req.params`:
  - `id`: string, hex, length 24, required

**`index.js`:**
- Export all user schemas

#### 7.2 Post Schemas (`schemas/posts/`)

Create validation schemas for:

**`createPostSchema.js`:**
- Validate `req.body`:
  - `title`: string, min 3, max 200, required
  - `content`: string, min 10, required
  - `author`: string, min 2, max 100, required
  - `tags`: array of strings (optional)
  - `published`: boolean (optional, default: false)
  - `likes`: number, min 0 (optional, default: 0)

**`getAllPostsSchema.js`:**
- Validate `req.query`:
  - `page`: number, min 1 (optional)
  - `limit`: number, min 1, max 100 (optional)

**`updatePostSchema.js`:**
- Validate `req.body`:
  - `title`: string, min 3, max 200 (optional)
  - `content`: string, min 10 (optional)
  - `author`: string, min 2, max 100 (optional)
  - `tags`: array of strings (optional)
  - `published`: boolean (optional)
- Validate `req.params`:
  - `id`: string, hex, length 24, required

**`index.js`:**
- Export all post schemas

#### 7.3 Main Schema Index (`schemas/index.js`)

Export all schemas in a structured way:
```javascript
module.exports = {
    users: require('./users'),
    posts: require('./posts')
}
```

---

### 8. Configure CORS

**Tasks:**
- Install and require `cors` package
- Add CORS middleware to `index.js`
- Use `app.use(cors())` to allow all origins (for development)

**Note:** In production, you would configure specific origins, but for this lab, allowing all origins is acceptable.

---

### 9. Update Main Server File (`index.js`)

**Tasks:**
- Load environment variables using `dotenv`
- Initialize Express app
- Add middleware: `express.json()`, `cors()`
- Import and register routers: `/users` and `/posts`
- Register global error handler middleware (LAST)
- Connect to MongoDB using environment variables
- Start server on port from environment variables

**Example structure:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routers
app.use('/users', userRouter);
app.use('/posts', postRouter);

// Global Error Handler (MUST be last)
app.use(errorHandler);

// Server setup
const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        .then(() => {
            console.log('✅✅ Connected to MongoDB');
        })
        .catch((err) => {
            console.log('❌❌ Failed to connect to MongoDB');
            console.log(err);
        });
    console.log(`✅✅ Server is running on Port:${PORT}`);
});
```

---

## Testing Your Implementation

Test all endpoints using Postman, Thunder Client, or curl commands.

### Test Cases:

#### Users Endpoints:

1. **Create User:**
   ```json
   POST http://localhost:3000/users
   {
     "name": "JohnDoe",
     "email": "john@example.com",
     "password": "password123",
     "age": 25
   }
   ```

2. **Get All Users (with pagination):**
   ```
   GET http://localhost:3000/users?page=1&limit=5
   ```

3. **Get User by ID:**
   ```
   GET http://localhost:3000/users/{userId}
   ```

4. **Update User:**
   ```json
   PATCH http://localhost:3000/users/{userId}
   {
     "name": "JaneDoe",
     "age": 30
   }
   ```

5. **Delete User:**
   ```
   DELETE http://localhost:3000/users/{userId}
   ```

#### Posts Endpoints:

1. **Create Post:**
   ```json
   POST http://localhost:3000/posts
   {
     "title": "My First Post",
     "content": "This is the content of my first post",
     "author": "John Doe",
     "tags": ["nodejs", "express"],
     "published": true
   }
   ```

2. **Get All Posts (with pagination):**
   ```
   GET http://localhost:3000/posts?page=1&limit=5
   ```

3. **Get Post by ID:**
   ```
   GET http://localhost:3000/posts/{postId}
   ```

4. **Update Post:**
   ```json
   PATCH http://localhost:3000/posts/{postId}
   {
     "title": "Updated Post Title",
     "published": true
   }
   ```

5. **Delete Post:**
   ```
   DELETE http://localhost:3000/posts/{postId}
   ```

### Error Testing:

Test error handling with:

1. **Invalid ObjectId:**
   ```
   GET http://localhost:3000/posts/invalid-id
   ```
   Should return: `400 Bad Request` with CastError message

2. **Missing Required Fields:**
   ```json
   POST http://localhost:3000/posts
   {
     "title": "Test"
   }
   ```
   Should return: `400 Bad Request` with validation error

3. **Resource Not Found:**
   ```
   GET http://localhost:3000/posts/507f1f77bcf86cd799439011
   ```
   Should return: `404 Not Found` with "Post not found" message

4. **Invalid Query Parameters:**
   ```
   GET http://localhost:3000/posts?page=-1&limit=200
   ```
   Should return: `400 Bad Request` with validation error

---

## Submission Checklist

- [ ] All dependencies installed (`cors`, `dotenv`, `joi`)
- [ ] `.env` file created with PORT, MONGO_URI, and DB_NAME
- [ ] `.env` added to `.gitignore`
- [ ] Code refactored to MVC architecture:
  - [ ] Models folder with `users.js` and `posts.js`
  - [ ] Services folder with `users.js` and `posts.js`
  - [ ] Controllers folder with `users.js` and `posts.js`
  - [ ] Routers folder with `users.js` and `posts.js`
- [ ] `APIError` class created in `utils/APIError.js`
- [ ] Global error handler middleware created and registered (last middleware)
- [ ] MongoDB errors handled (CastError, duplicate key, ValidationError)
- [ ] Validation middleware created (`middlewares/validate.js`)
- [ ] Joi schemas created for all endpoints:
  - [ ] User schemas (create, getAll, update)
  - [ ] Post schemas (create, getAll, update)
- [ ] CORS middleware configured
- [ ] All CRUD operations working for both Users and Posts
- [ ] All error responses use `APIError` class (no direct `res.status().json()` for errors)
- [ ] Server runs using `npm run dev`
- [ ] All endpoints tested and working correctly

---

## Tips

- **Start small:** Refactor one resource (Users or Posts) completely before moving to the next
- **Test frequently:** After each major change, test your endpoints to ensure everything still works
- **Follow the pattern:** Use the Day 3 demo code as a reference for structure and patterns
- **Error handling:** Remember to throw `APIError` instaed of using the response object
- **Validation:** Use Joi schemas to validate `req.body`, `req.query`, and `req.params` as needed
- **Environment variables:** Never commit `.env` file to git - always use `.gitignore`

---

## Common Issues & Solutions

1. **"Cannot find module" errors:**
   - Check file paths and exports
   - Ensure `module.exports` is used correctly

2. **Error handler not catching errors:**
   - Make sure error handler is registered AFTER all routes
   - Ensure errors are thrown (not returned) in async functions

3. **Validation not working:**
   - Check that schema structure matches: `{ body: ..., query: ..., params: ... }`
   - Verify middleware is applied to the correct routes

4. **MongoDB connection issues:**
   - Check `.env` file values
   - Ensure MongoDB is running
   - Verify connection string format

---

Good luck! 🚀
