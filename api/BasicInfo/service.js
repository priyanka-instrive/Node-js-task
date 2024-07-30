const { BasicSchema, ManagmentSchema, productInfoSchema } = require("./index");
const sendMail = require("../../system/sendmail/index");
const { v4: uuidv4 } = require("uuid");
const schema = require("./schema");

const create = async (params) => {
  let newData;

  try {
    newData = await BasicSchema.create(params);
  } catch (error) {
    console.error("Error in service create method:", error);
    throw error;
  }

  return newData;
};

const createManagment = async (params, id) => {
  let newData;

  try {
    newData = await ManagmentSchema.create({ company_id: id, ...params });
  } catch (error) {
    console.error("Error in service create method:", error);
    throw error;
  }

  return newData;
};

const createProduct = async (params, id) => {
  let newData;

  try {
    newData = await productInfoSchema.create({ company_id: id, ...params });
    const data = await BasicSchema.findById(newData.company_id);
    if (data.key_contact_person.email) {
      const userEmail = data.key_contact_person.email;
      const secretKey = uuidv4();
      const link = `http://localhost:3000/update_password/?token=${secretKey}`;
      const basicData = await BasicSchema.findOneAndUpdate(
        {
          _id: newData.company_id,
        },
        { token: secretKey },
        { new: true, upsert: true }
      );
      await sendMail(userEmail, link);
      return newData;
    } else {
      throw new Error("Failed to retrieve user email for sending mail");
    }
  } catch (error) {
    console.error("Error in service create method:", error);
    throw error;
  }
};

const find = async (token) => {
  const newPassword = await BasicSchema.findOne({ token });
  return newPassword;
};

const update = async (userId, body) => {
  const updatePwd = await BasicSchema.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      ...body,
    },
    {
      new: true,
    }
  );
  return updatePwd;
};

const findUser = async (email) => {
  const query = { "key_contact_person.email": email };
  const data = await BasicSchema.findOne(query);
  return data;
};

const validate = async (res, schemaName, data) => {
  const schemaToValidate = schema.create[schemaName];
  let { error } = schemaToValidate.validate(data);
  if (error) {
    res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
    });
    return false;
  }
  return true;
};

module.exports = {
  create,
  find,
  createProduct,
  createManagment,
  update,
  findUser,
  validate,
};
