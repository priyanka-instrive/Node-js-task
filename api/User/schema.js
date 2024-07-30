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
