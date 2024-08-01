const { UserSchema } = require("./index");

const create = async (params) => {
  try {
    if (!params) {
      throw new Error("Invalid input data");
    }

    const insertedUsers = await UserSchema.insertMany(params);
    return insertedUsers;
  } catch (error) {
    console.error("Error in service create method:", error);
    throw error;
  }
};

const getData = async (params) => {
  const { page, limit, sortBy, sortOrder, searchTerm } = params;

  try {
    const offset = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    const match = {};

    if (searchTerm) {
      match.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { mobile: { $regex: searchTerm, $options: "i" } },
        { address: { $regex: searchTerm, $options: "i" } },
        { country: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const pipeline = [
      {
        $addFields: {
          name: { $toString: "$name" },
        },
      },
      { $match: match },
      { $sort: sort },
      {
        $facet: {
          items: [{ $skip: offset }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];
    const result = await UserSchema.aggregate(pipeline).exec();

    if (
      result.length === 0 ||
      !result[0].items ||
      result[0].items.length === 0
    ) {
      return { message: "Data not found" };
    }

    const items = result[0].items;
    const totalItems = result[0].totalCount || 0;

    return { items, totalItems };
  } catch (error) {
    console.error("Error occurred:", error);
    return { message: "Something went wrong", error: error.message };
  }
};

module.exports = {
  create,
  getData,
};
