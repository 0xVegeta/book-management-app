const Joi = require("joi");

const bookCreationValidationSchema = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
	summary: Joi.string().required().max(1000),
});

const bookModificationValidationSchema = Joi.object({
	title: Joi.string(),
	author: Joi.string(),
	summary: Joi.string().max(1000),
});

module.exports = {
	bookCreationValidationSchema,
	bookModificationValidationSchema,
};
