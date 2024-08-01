const { BasicSchema, ManagmentSchema, productInfoSchema } = require("./index");

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
    return newData;
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

module.exports = {
  create,
  find,
  createProduct,
  createManagment,
  update,
  findUser,
};
