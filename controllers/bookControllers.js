const Book = require("../models/bookModel");

const createBook = async (req, res) => {
	const { title, author, summary } = req.body;
	try {
		const book = new Book({ title, author, summary });
		await book.save();
		res.status(201).json(book);
	} catch (error) {
		res.status(500).json(error);
	}
};

const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json(error);
	}
};

const getBookById = async (req, res) => {
	const id = req.params.id;
	try {
		const book = await Book.findById(id);
		if (!book) {
			return res.status(404).json({ error: "Book not found " });
		}
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json(error);
	}
};

const updateBook = async (req, res) => {
	const id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = ["title", "author", "summary"];
	const isValidUpdate = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const book = await Book.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!book) {
			return res.status(404).send();
		}
		res.status(200).send(book);
	} catch (error) {
		res.status(400).send(error);
	}
};

const deleteBook = async (req, res) => {
	const id = req.params.id;
	try {
		const book = await Book.findByIdAndDelete(id);

		if (!book) {
			return res.status(404).send();
		}
		res.status(200).send(book);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createBook,
	getAllBooks,
	getBookById,
	updateBook,
	deleteBook,
};
