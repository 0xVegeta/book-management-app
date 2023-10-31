const Book = require("../models/Book");

const createBook = async ({ title, author, summary }) => {
	const book = new Book({ title, author, summary });
	try {
		await book.save();
		return book;
	} catch (error) {
		throw error;
	}
};


const getAllBooks = async () => {
	try {
		const books = await Book.find();
		return books;
	} catch (error) {
		throw error;
	}
};


const getBookById = async (id) => {
	try {
		const book = await Book.findById(id);
		if (!book) {
			return null;
		}
		return book;
	} catch (error) {
		throw error;
	}
};


const updateBook = async (id, updates) => {
	const allowedUpdates = ["title", "author", "summary"];
	const isValidUpdate = Object.keys(updates).every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidUpdate) {
		throw { error: "Invalid updates!" };
	}

	try {
		const book = await Book.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!book) {
			return null;
		}
		return book;
	} catch (error) {
		throw error;
	}
};


const deleteBook = async (id) => {
	try {
		const book = await Book.findByIdAndDelete(id);

		if (!book) {
			return null;
		}
		return book;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createBook,
	getAllBooks,
	getBookById,
	updateBook,
	deleteBook,
};
