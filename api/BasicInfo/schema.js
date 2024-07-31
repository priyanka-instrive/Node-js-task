const Joi = require("joi");

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};
const managementTeamMemberSchema = Joi.object({
  name: Joi.string().required(),
  designation: Joi.string().required(),
  profile_summary: Joi.string().optional(),
  linkedin_summary: Joi.string().uri().optional(),
}).required();
const productSchema = Joi.object({
  product_name: Joi.string().required(),
  product_portfolio_description: Joi.string().required(),
  url: Joi.string().uri().optional(),
}).required();

module.exports.create = {
  basicInfo: Joi.object().keys({
    basic_company_info: Joi.object()
      .keys({
        company_name: Joi.string().required(),
        head_office_address: Joi.string().required(),
        country: Joi.string().required(),
        postal_code: Joi.string().required(),
        city: Joi.string().required(),
        country_code: Joi.string().required(),
        contact_number: Joi.string().required(),
        website_url: Joi.string().optional(),
      })
      .required(),

    key_contact_person: Joi.object()
      .keys({
        name: Joi.string().required(),
        designation: Joi.string().required(),
        country_code: Joi.string().required(),
        contact_number: Joi.string().required(),
        email: Joi.string().email().required(),
        user_image: Joi.any().optional(),
      })
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$')
      ),
  }),

  managementInfo: Joi.object().keys({
    tell_about_yourself: Joi.object()
      .keys({
        company_profile: Joi.string().required(),
        url: Joi.string().uri().optional(),
        vision: Joi.string().optional(),
      })
      .required(),
    management_team_details: Joi.array().items(managementTeamMemberSchema),
  }),

  productInfo: Joi.object().keys({
    show_product_portfolio: Joi.array().items(productSchema).required(),
  }),
};
