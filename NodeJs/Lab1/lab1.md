# Lab 1: File System Operations and Basic Express Server in Node.js

## Overview

In this lab, you'll practice fundamental Node.js concepts including file operations, asynchronous programming, and creating a basic HTTP server with Express.

**Prerequisites**:

- Basic JavaScript knowledge
- VS Code installed
- Node.js installed

## Learning Objectives

- Understand synchronous vs asynchronous file operations

## Lab Tasks

### Part 1: File Operations

Create a file named `fileOperations.js`. Use this starter data for your students.json file:

```javascript
const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];
```

1. Create a JSON file named 'students.json' with the sample student data above from the code
2. Implement both synchronous and asynchronous file operations
3. Create functions to:
   - Write the studentData to students.json
   - Read from students.json
   - Add a new student
   - (bonus) Update a student's course
   - (bonus) Delete a student
4. (bonus)Compare the behavior of sync vs async operations

### Part 3: Simple Course Management Server

Create a file named `server.js`:

1. Create an HTTP server that:
   - Serves the student data on GET /students
   - Shows total number of students on GET /stats
   - Shows courses list on GET /courses
   - Returns 404 for undefined routes

## Requirements

### File Operations Requirements

- Implement both `readFileSync` and async `readFile` operations
- Handle errors appropriately
- Add comments explaining the differences you observe

### Server Requirements

- run on port 3000 or any other free port (e.g. 5000, 8080, etc.)
- Return appropriate Content-Type headers
- Return proper HTTP status codes
- Data should be served from the JSON file (not from memory)

## Bonus Challenges

1. Implement basic request logging (timestamp, method, URL)
2. Add a route to search students by name

## Getting Started

Use this basic server template:

```javascript
const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/students") {
      // TODO: Implement students route
    } else if (req.url === "/stats") {
      // TODO: Implement stats route
    } else if (req.url === "/courses") {
      // TODO: Implement courses route
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```
