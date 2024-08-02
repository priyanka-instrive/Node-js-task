const service = require("./service");
const schema = require("./schema");

const validate = async (res, schemaName, data) => {
  const schemaToValidate = schema.rfpSchema[schemaName];

  if (!schemaToValidate) {
    return {
      valid: false,
      message: `Schema not found: ${schemaName}`,
    };
  }

  let { error } = schemaToValidate.validate(data);
  if (error) {
    return {
      valid: false,
      message: error.details.map((detail) => detail.message).join(", "),
    };
  }
  return { valid: true };
};

const createTemplateBank = async (req, res) => {
  try {
    const company_conflict_check = JSON.parse(req.body.company_conflict_check);
    const Preliminary_information = JSON.parse(
      req.body.Preliminary_information
    );
    const scope_of_work = JSON.parse(req.body.scope_of_work);

    const pricing = JSON.parse(req.body.pricing);
    const other_key_information = JSON.parse(req.body.other_key_information);

    let validationResult = await validate(
      res,
      "company_conflict_check",
      company_conflict_check
    );
    if (!validationResult.valid) {
      return res.status(400).json({
        status: "error",
        message: validationResult.message,
      });
    }

    validationResult = await validate(
      res,
      "Preliminary_information",
      Preliminary_information
    );
    if (!validationResult.valid) {
      return res.status(400).json({
        status: "error",
        message: validationResult.message,
      });
    }

    validationResult = await validate(res, "scope_of_work", scope_of_work);
    if (!validationResult.valid) {
      return res.status(400).json({
        status: "error",
        message: validationResult.message,
      });
    }
    validationResult = await validate(res, "pricing", pricing);
    if (!validationResult.valid) {
      return res.status(400).json({
        status: "error",
        message: validationResult.message,
      });
    }
    validationResult = await validate(
      res,
      "other_key_information",
      other_key_information
    );
    if (!validationResult.valid) {
      return res.status(400).json({
        status: "error",
        message: validationResult.message,
      });
    }

    const basicInfo = await service.create({
      company_conflict_check,
      Preliminary_information,
      scope_of_work,
      pricing,
      other_key_information,
    });

    const result = {
      message: "User Details",
      detail: basicInfo,
    };
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error in create controller:", error);

    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = {
  createTemplateBank,
};
