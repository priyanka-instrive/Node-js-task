const { Schema, default: mongoose } = require("mongoose");
const { dbConn } = require("../../system/db/mongo");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    address: { type: String },
    country: { type: String },
    status: { type: String },
    errorlog: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserSchema = dbConn.model("User", userSchema, "Users");

module.exports = {
  UserSchema,
};
