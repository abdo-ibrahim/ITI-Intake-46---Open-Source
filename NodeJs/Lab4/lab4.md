# Lab 4: Authentication & Authorization

## Objective
In this lab, you will add authentication and authorization layers to your existing Posts and Users CRUD operations from Lab 3. You'll implement user sign-up and sign-in with password hashing, JWT tokens, and protect routes based on authentication and user roles.

---

## Requirements

### 1. Install Required Dependencies

Install the necessary packages for authentication:

```bash
npm install bcrypt jsonwebtoken
```

**Packages explained:**
- `bcrypt`: Library for hashing passwords securely
- `jsonwebtoken`: Library for creating and verifying JWT tokens

---

### 2. Update Environment Variables

Add the JWT secret to your `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=iti-zag
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Tasks:**
- Add `JWT_SECRET` to your `.env` file
- Use a strong, random string for the secret (in production, use a secure random generator)

---

### 3. Update User Model

**Tasks:**
- Ensure your User model has a `role` field with enum `['admin', 'user']` and default `'user'`
- Ensure email has a unique index
- The model should already have: `name`, `email`, `password`, `role`, `age`, and `timestamps`

---

### 4. Update Post Model

**Tasks:**
- Add a `userId` field to the Post schema that references the User model
- Change the `author` field from String to ObjectId reference (or keep both - `author` as String for display and `userId` as ObjectId for reference)
- **Recommended approach:** Keep `author` as String (author name) and add `userId` as ObjectId reference to User
- Use `mongoose.Schema.Types.ObjectId` with `ref: 'User'` for the `userId` field

---

### 5. Create Authentication Middleware

**Tasks:**
- Create `middlewares/authenticate.js`
- Extract JWT token from `Authorization` header (format: `Bearer <token>`)
- Verify the token using `jsonwebtoken` and `JWT_SECRET`
- Use `util.promisify()` to convert `jwt.verify()` to a promise-based function
- Attach user information to `req.user` object with `userId` and `role` properties
- Throw `APIError` with status 401 if token is missing or invalid
- Handle errors appropriately and throw `APIError` for any verification failures

---

### 6. Create Authorization Middleware

**Tasks:**
- Create `middlewares/restrictTo.js`
- Accept an array of allowed roles as a parameter (returns a middleware function)
- Check if `req.user.role` is in the allowed roles array
- Throw `APIError` with status 403 if user doesn't have required role
- This middleware should be used AFTER `authenticate` middleware (since it depends on `req.user`)

---

### 7. Update User Service

**Tasks:**
- Remove the `createUser` function (replaced by `signUp`)
- Add `signUp` function:
  - Check if user with email already exists (throw `APIError` if exists)
  - Hash password using `bcrypt.hash()` with salt rounds of 12
  - Create user with hashed password
  - Return created user
- Add `signIn` function:
  - Find user by email
  - Compare provided password with hashed password using `bcrypt.compare()`
  - If password matches, generate JWT token with payload: `{ userId, role }`
  - Use `util.promisify()` to convert `jwt.sign()` to a promise-based function
  - Set token expiration to 1 hour using `{ expiresIn: '1h' }`
  - Return an object with `token` and `user` (user data without password)
  - Throw `APIError` with status 401 if email or password is invalid (use generic message: "Invalid email or password")
- Keep other service functions (`getAllUsers`, `getUserById`, `updateUserById`, `deleteUserById`) unchanged

---

### 8. Update User Controller

**Tasks:**
- Remove `createUser` controller function
- Add `signUp` controller function that calls `UserService.signUp()` and returns status 201
- Add `signIn` controller function that calls `UserService.signIn()` and returns status 200
- Keep other controller functions (`getAllUsers`, `getUserById`, `updateUserById`, `deleteUserById`) unchanged

---

### 9. Create Sign-Up and Sign-In Schemas

**Tasks:**

#### 9.1 Sign-Up Schema (`schemas/users/signUpSchema.js`)

Create validation schema for sign-up:
- `name`: string, alphanum, min 3, max 30, required
- `email`: string, email format, required (with custom error message)
- `password`: string, min 8, max 30, required

- `repeatPassword`: must match `password` using `Joi.ref('password')`, required
- `age`: number, min 18, max 150, required
- Export schema object with `body` property containing the Joi validation object

#### 9.2 Sign-In Schema (`schemas/users/signInSchema.js`)

Create validation schema for sign-in:
- `email`: string, email format, required (with custom error message)
- `password`: string, min 8, max 30, required
- Export schema object with `body` property containing the Joi validation object

#### 9.3 Update Schema Index (`schemas/users/index.js`)

**Tasks:**
- Export all user schemas including the new `signUpSchema` and `signInSchema`
- Keep existing exports: `getAllUsersSchema` and `updateUserSchema`

---

### 10. Update User Routes

**Tasks:**
- Remove the `POST /users` route (create user)
- Add `POST /users/sign-up` route (public, no authentication required)
  - Apply validation middleware with `signUpSchema`
  - Map to `usersController.signUp`
- Add `POST /users/sign-in` route (public, no authentication required)
  - Apply validation middleware with `signInSchema`
  - Map to `usersController.signIn`
- Protect `GET /users` route with `authenticate` middleware and `restrictTo(['admin'])`
- Apply authentication and admin restriction to other user management routes:
  - `GET /users/:id` - requires `authenticate` and `restrictTo(['admin'])`
  - `PATCH /users/:id` - requires `authenticate`, `restrictTo(['admin'])`, and validation
  - `DELETE /users/:id` - requires `authenticate` and `restrictTo(['admin'])`

---

### 11. Update Post Service

**Tasks:**
- Update `createPost` function to accept `userId` parameter and include it in the post data when creating
- Update `getAllPosts` function:
  - Accept `userId` parameter
  - Populate `userId` field with user data (name and email)
  - Add `isOwner` boolean flag to each post indicating if it belongs to the authenticated user
  - Convert posts to objects and compare `post.userId._id` (when populated) with authenticated `userId`
- Update `getPostById` function:
  - Accept `userId` parameter
  - Populate `userId` field with user data (name and email)
  - Add `isOwner` boolean flag to the post
  - Convert post to object and compare `post.userId._id` (when populated) with authenticated `userId`
- Update `updatePostById` function:
  - Accept `userId` parameter
  - Check if the post exists (return `null` if not found)
  - Check if the user is the author by comparing `post.userId` with `userId`
  - Throw `APIError` with status 403 if user is not the author
  - Update and return the post if user is authorized
- Update `deletePostById` function:
  - Accept `userId` parameter
  - Check if the post exists (return `null` if not found)
  - Check if the user is the author by comparing `post.userId` with `userId`
  - Throw `APIError` with status 403 if user is not the author
  - Delete and return the post if user is authorized
- **Important:** Services should check ownership and throw `APIError` for authorization errors, but return `null` for "not found" cases

---

### 12. Update Post Controller

**Tasks:**
- Update `createPost` to use `req.user.userId` from authentication middleware and pass it to service
- Update `getAllPosts` to pass `req.user.userId` to service (for ownership flag)
- Update `getPostById` to pass `req.user.userId` to service (for ownership flag)
- Update `updatePostById` to pass `req.user.userId` to service
- Update `deletePostById` to pass `req.user.userId` to service
- Handle "not found" cases by throwing `APIError` with status 404 when service returns `null`
- Ensure all post routes require authentication (handled in routes, not controller)

---

### 13. Update Post Routes

**Tasks:**
- Add `authenticate` middleware to ALL post routes:
  - `POST /posts` - create post (with validation)
  - `GET /posts` - get all posts (with validation for query params)
  - `GET /posts/:id` - get post by ID
  - `PATCH /posts/:id` - update post (with validation)
  - `DELETE /posts/:id` - delete post
- Ensure `authenticate` middleware runs before validation and controller functions
- All routes should be protected - no public post routes
---
## Submission Checklist

- [ ] All dependencies installed (`bcrypt`, `jsonwebtoken`)
- [ ] `JWT_SECRET` added to `.env` file
- [ ] Post model updated with `userId` field (ObjectId reference to User)
- [ ] `authenticate` middleware created and working
- [ ] `restrictTo` middleware created and working
- [ ] User service updated:
  - [ ] `signUp` function implemented with password hashing
  - [ ] `signIn` function implemented with password comparison and JWT generation
  - [ ] `createUser` function removed
- [ ] User controller updated:
  - [ ] `signUp` controller implemented
  - [ ] `signIn` controller implemented
  - [ ] `createUser` controller removed
- [ ] Sign-up and sign-in schemas created
- [ ] User routes updated:
  - [ ] `POST /users/sign-up` route added (public)
  - [ ] `POST /users/sign-in` route added (public)
  - [ ] `POST /users` route removed
  - [ ] User management routes protected with `authenticate` and `restrictTo(['admin'])`
- [ ] Post service updated:
  - [ ] `createPost` accepts and uses `userId`
  - [ ] `getAllPosts` accepts `userId` and adds `isOwner` flag to each post
  - [ ] `getPostById` accepts `userId` and adds `isOwner` flag
  - [ ] `updatePostById` checks ownership
  - [ ] `deletePostById` checks ownership
- [ ] Post controller updated to use `req.user.userId` and pass it to service functions
- [ ] Post routes protected with `authenticate` middleware
- [ ] All endpoints tested:
  - [ ] Sign up and sign in working
  - [ ] Protected routes require authentication
  - [ ] Admin routes restricted to admin users
  - [ ] Post ownership checks working (can only update/delete own posts)
  - [ ] Error handling working correctly

---

## Tips

- **Password Hashing:** Always use `bcrypt.hash()` with salt rounds of 10 - 12
- **Token Expiration:** Set appropriate expiration times (1 hour is good for this lab)
- **Error Messages:** Use generic error messages for authentication failures ("Invalid email or password") to prevent user enumeration
- **Testing:** Use Postman or Thunder Client to easily manage tokens in headers
- **Authorization:** Remember that authentication (who you are) is different from authorization (what you can do)
- **Ownership Checks:** Always verify ownership in the service layer, not just the controller

---

Good luck! 🚀
