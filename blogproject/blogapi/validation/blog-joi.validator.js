const Joi = require("joi");

const titleMessages = {
  "string.base": "Name must be a string",
  "string.empty": "Name is required",
  "string.min": "Name must be at least {#limit} characters",
  "string.max": "Name must not exceed {#limit} characters",
  "any.required": "Name is required",
};

const schema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages(titleMessages),
});

module.exports = schema;