const express = require("express");
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get("/get_books", BookController.getBooks);

router.post("/create_book", BookController.createBook);

router.get("/get_book/:id", BookController.getBookbyId);

router.put("/update_book/:id", BookController.updateBookbyId);

router.delete("/    delete_book/:id", BookController.deleteBookbyId);

module.exports = router;
