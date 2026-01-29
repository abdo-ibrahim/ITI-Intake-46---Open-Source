const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Auth
server.db = router.db;
server.use(auth);

// Router
server.use(router);

// Start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
