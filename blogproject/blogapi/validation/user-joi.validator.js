const Joi = require("joi");

const nameMessages = {
  "string.base": "Name must be a string",
  "string.empty": "Name is required",
  "string.min": "Name must be at least {#limit} characters",
  "string.max": "Name must not exceed {#limit} characters",
  "any.required": "Name is required",
};

const emailMessages = {
  "string.base": "Email must be a string",
  "string.empty": "Email is required",
  "string.email": "Invalid email format",
  "any.required": "Email is required",
};

const passwordMessages = {
  "string.base": "Password must be a string",
  "string.empty": "Password is required",
  "string.min": "Password must be at least 6 characters",
  "any.required": "Password is required",
};

const schema = Joi.object({
  name: Joi.string().min(1).max(255).required().messages(nameMessages),
  email: Joi.string().email().required().messages(emailMessages),
  password: Joi.string().min(6).required().messages(passwordMessages),
  role: Joi.string().optional(),
});

module.exports = schema;