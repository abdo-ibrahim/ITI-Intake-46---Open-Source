const http = require("http");
const fs = require("fs");

const filePath = "students.json";

// readFileSync operation
let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  console.log("Sync content:", data);
} catch (err) {
  console.error("Error reading file:", err);
}

// readFile operation
fs.readFile(filePath, "utf-8", (err, fileContent) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("Async content:", JSON.parse(fileContent));
  }
});
// Differences Observed:

// 1. readFileSync
// -- block execution code until file read completely
// -- Error handling done in try catch
// -- returns the file content directly

// 2. readFile
// -- allow code to continue executing and wait file read to complete
// -- errors handled via callback function
// -- provide contentfile in callback parameter

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/students") {
      // TODO: Implement students route
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else if (req.url === "/stats") {
      // TODO: Implement stats route

      // number of students
      const numberOfStudents = data.length;

      // number of courses
      const courses = data.map((s) => s.course);
      const numberOfCourses = [...new Set(courses)].length;

      const stats = { numberOfStudents, numberOfCourses };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats));
    } else if (req.url === "/courses") {
      // TODO: Implement courses route
      const courses = data.map((s) => s.course);
      const uniqueCourses = [...new Set(courses)];

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(uniqueCourses));
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
