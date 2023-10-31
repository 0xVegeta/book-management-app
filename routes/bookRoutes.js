const express = require("express");
const bookRouter = express.Router();
const bookControllers = require("../controllers/bookControllers");

bookRouter.post("/books", bookControllers.createBook);
bookRouter.get("/books", bookControllers.getAllBooks);
bookRouter.get("/books/:id", bookControllers.getBookById);
bookRouter.patch("/books/:id", bookControllers.updateBook);
bookRouter.delete("/books/:id", bookControllers.deleteBook);

module.exports = bookRouter;
