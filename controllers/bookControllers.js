const Book = require("../models/bookModel");
const {
	bookCreationValidationSchema,
	bookModificationValidationSchema,
} = require("../schema/ValidationSchema");

const createBook = async (req, res) => {
	const { title, author, summary } = req.body;

	const { error } = bookCreationValidationSchema.validate({
		title,
		author,
		summary,
	});

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const existingBook = await Book.findOne({ title, author });

	if (existingBook) {
		return res.status(400).json({
			error: "Book with the same title and author already exists.",
		});
	}

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
	const { title, author, summary } = req.body;

	const updatedBookInfo = {
		title,
		author,
		summary,
	};

	const isUpdatedBookInfoNull = Object.values(updatedBookInfo).every(
		(value) => !!value == false
	);

	const { error } = bookModificationValidationSchema.validate({
		title,
		author,
		summary,
	});

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	if (isUpdatedBookInfoNull) {
		return res.status(404).json({
			error: "No values entered for updation",
		});
	}

	const book = await Book.findById(id);
	if (!book) {
		return res.status(404).json({
			error: "Book with the given Id does not exist.",
		});
	}

	if (title && author) {
		const existingBook = await Book.findOne({ title, author });

		if (existingBook) {
			return res.status(400).json({
				error: "Book with the same title and author already exists.",
			});
		}
	} else {
		if (!updatedBookInfo.author) updatedBookInfo.author = book.author;
		if (!updatedBookInfo.title) updatedBookInfo.title = book.title;

		console.log(updatedBookInfo);
		const { title, author } = updatedBookInfo;

		const existingBook = await Book.findOne({
			title,
			author,
		});

		if (existingBook) {
			return res.status(400).json({
				error: "Book with the same title and author already exists.",
			});
		}
	}

	const allowedUpdates = ["title", "author", "summary"];
	const isValidUpdate = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).json({ error: "Invalid updates!" });
	}

	try {
		const book = await Book.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!book) {
			return res.status(404).json();
		}
		res.status(200).json(book);
	} catch (error) {
		res.status(400).json(error);
	}
};

const deleteBook = async (req, res) => {
	const id = req.params.id;
	try {
		const book = await Book.findByIdAndDelete(id);

		if (!book) {
			return res.status(404).json({ error: "Book not found " });
		}
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = {
	createBook,
	getAllBooks,
	getBookById,
	updateBook,
	deleteBook,
};
