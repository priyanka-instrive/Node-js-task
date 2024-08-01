const Joi = require("joi");

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.userSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  address: Joi.string().optional(),
  country: Joi.string().optional(),
  status: Joi.string().optional(),
});

const schema = Joi.object({
  limit: Joi.number().required(),
  page: Joi.number().required(),
  searchTerm: Joi.string().allow(null, "").optional(),
  sortBy: Joi.string().allow(null, "").optional(),
  sortOrder: Joi.string().allow(null, "").optional(),
}).required();

const validateUserData = (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateUserData,
  schema,
};
