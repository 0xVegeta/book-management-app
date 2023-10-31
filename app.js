const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
const { connectDB } = require("./config/db");

connectDB();
const express = require("express");
const expressApp = express();
const bodyParser = require("body-parser");
const bookRouter = require("./routes/bookRoutes");

expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use("/api", bookRouter);

module.exports = {
	app: expressApp,
};
