# Laravel Task: Form with Validation

## Overview

Build a form for creating and updating tasks using Laravel. Apply validation using **Form Request** classes for both Store and Update operations.

## Documentation References

- https://laravel.com/docs/master/validation#creating-form-requests
- https://laravel.com/docs/master/validation#quick-displaying-the-validation-errors

---

## Requirements

### 1. Title

- Required
- Minimum length: 3 characters
- Must be unique

### 2. Description

- Required
- Minimum length: 10 characters

### 3. Due Date

- Required
- Must be a valid date

### 4. Priority

- Required
- Allowed values:
    - low
    - medium
    - high
    - urgent

### 5. Status

- Required
- Allowed values:
    - to-do
    - in_progress
    - done

### 6. Creator and Assignee IDs

- Required
- Must exist in the database (foreign key validation, e.g., `exists:users,id`)
- Add input fields for both **creator_id** and **assignee_id** in the form

---

## Additional Conditions

### Update Handling

- Validation must pass if the **title is not changed**
- Ignore the current task ID in the unique rule

### Security

- Ensure the submitted **creator_id exists in the database**
- Ensure the submitted **assignee_id exists in the database**
- Prevent sending invalid or non-existing IDs

### Error Handling

- Display validation error messages clearly in the view
- Customize default error messages to be more descriptive and user-friendly

---

## Relationships & Features

### Polymorphic Comments

Add comments using a **polymorphic relationship**.

- Reference: https://laravel.com/docs/master/eloquent-relationships#polymorphic-relationships
- Do NOT use a one-to-many relationship
- Reason: to reuse the same comments table for other models (e.g., tasks, posts, images)

---

### Comments

- A task can have multiple comments
- A comment belongs to a user
- A comment belongs to a commentable model (task via polymorphic relation)

---

### User Relations

- A task belongs to a user (creator)
- A task can be assigned to a user (assignee)
- A user can have many tasks
- A user can have many comments

---

### Task Relations

- A task can have many comments
- A task belongs to a creator (user)
- A task belongs to an assignee (user)

---

### Requirements for Comments

- Comment body is required
- Each comment must be linked to:
    - an existing user (`exists:users,id`)
    - a valid commentable model

---

### Additional Features

- Use **Eager Loading** to optimize queries and avoid the N+1 problem
    - Example:
        - `Task::with(['creator', 'assignee', 'comments.user'])->get()`

- Display the commenter's information with each comment

---
