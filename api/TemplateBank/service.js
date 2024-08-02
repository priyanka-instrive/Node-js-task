const rfpSchema = require("./index");

const create = async (params) => {
  let newData;

  try {
    newData = await rfpSchema.create(params);
  } catch (error) {
    console.error("Error in service create method:", error);
    throw error;
  }

  return newData;
};

module.exports = {
  create,
};
