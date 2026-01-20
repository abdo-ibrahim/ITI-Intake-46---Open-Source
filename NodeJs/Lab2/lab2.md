# Lab 2: Posts CRUD Operations

## Objective
In this lab, you will build upon the users CRUD operations you've already created. You'll create a new **Posts** resource with full CRUD functionality, following the same patterns you learned in Day 2.

---

## Requirements

### 1. Create Posts Schema and Model

Create a **Post** schema with the following fields:
- `title` (String, required) - The title of the post
- `content` (String, required) - The content/body of the post
- `author` (String, required) - The author's name
- `tags` (Array of Strings, optional) - Tags for categorizing posts
- `published` (Boolean, default: false) - Whether the post is published or draft
- `likes` (Number, default: 0) - Number of likes the post has received
- `timestamps` (enabled) - Automatically add `createdAt` and `updatedAt` fields

**Hint:** Use `mongoose.Schema` similar to how you created the `userSchema`.

---

### 2. Implement CRUD Operations for Posts

Create the following endpoints for the Posts resource:

#### **POST** `/posts`
- Create a new post
- Validate that `title`, `content`, and `author` are provided
- Return status 201 with the created post

#### **GET** `/posts`
- Get all posts with pagination support
- Query parameters: `page` (default: 1), `limit` (default: 10)
- Return posts with pagination metadata (page, limit, total, totalPages)

#### **GET** `/posts/:id`
- Get a single post by ID
- Validate that the ID is a valid MongoDB ObjectId
- Return 404 if post not found
- Return the post if found

#### **PATCH** `/posts/:id`
- Update a post by ID
- Validate that the ID is a valid MongoDB ObjectId
- Allow updating: `title`, `content`, `author`, `tags`, `published`
- Return 404 if post not found
- Return the updated post

#### **DELETE** `/posts/:id`
- Delete a post by ID
- Validate that the ID is a valid MongoDB ObjectId
- Return 404 if post not found
- Return success message upon deletion

**Note:** Follow the same patterns and error handling you used in the users CRUD operations.

---

### 3. Run Server Using Nodemon

Make sure your server runs using `nodemon`:
- Use the `dev` script from `package.json`: `npm run dev`
- Verify that nodemon automatically restarts the server when you make changes to your code

---

## Testing Your Implementation

Test all endpoints using:
- **Postman** or **Thunder Client** (VS Code extension)
- **curl** commands in terminal
- Or any API testing tool

### Example Test Cases:

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

2. **Get All Posts:**
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

---

## Bonus: Refactor to MVC Architecture

If you complete the basic requirements, refactor your code to follow a clean architecture pattern:

### Folder Structure:
```
demo-1/
├── index.js (main server file)
├── package.json
├── models/
│   ├── user.model.js
│   └── post.model.js
├── routes/
│   ├── user.routes.js
│   └── post.routes.js
├── controllers/
│   ├── user.controller.js
│   └── post.controller.js
└── services/
    ├── user.service.js
    └── post.service.js
```

### Architecture Layers:

1. **Models** (`models/`)
   - Define Mongoose schemas and models
   - Export the model for use in other files

2. **Routes** (`routes/`)
   - Define Express routes
   - Map routes to controller functions
   - Use `express.Router()` to create route modules

3. **Controllers** (`controllers/`)
   - Handle HTTP requests and responses
   - Call service functions
   - Return appropriate status codes and JSON responses

4. **Services** (`services/`)
   - Contain business logic
   - Interact with models/database
   - Return data to controllers

5. **Main Server** (`index.js`)
   - Initialize Express app
   - Connect to MongoDB
   - Register routes
   - Start the server

### Example Structure:

**models/post.model.js:**
```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // schema definition
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
```

**routes/post.routes.js:**
```javascript
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
// ... other routes

module.exports = router;
```

**controllers/post.controller.js:**
```javascript
const postService = require('../services/post.service');

const createPost = async (req, res) => {
    // validation
    // call service
    // return response
};

module.exports = { createPost, /* ... */ };
```

**services/post.service.js:**
```javascript
const Post = require('../models/post.model');

const createPost = async (postData) => {
    return await Post.create(postData);
};

module.exports = { createPost, /* ... */ };
```

**index.js:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// ... server setup
```

---

## Submission Checklist

- [ ] Posts schema and model created
- [ ] All 5 CRUD endpoints implemented (POST, GET all, GET by ID, PATCH, DELETE)
- [ ] Proper validation and error handling
- [ ] Server runs using `npm run dev` (nodemon)
- [ ] All endpoints tested and working
- [ ] (Bonus) Code refactored into MVC architecture with separate folders for models, routes, controllers, and services

---

## Tips

- Follow the same patterns you used for users CRUD
- Pay attention to error handling (invalid IDs, missing fields, not found)
- Use async/await for database operations
- Test each endpoint before moving to the next one

---

