const boom = require("@hapi/boom");
const service = require("./service");
const bcrypt = require("bcrypt");
const jwt = require("../../system/middleware/jwt");
const sendMail = require("../../system/sendmail/index");
const { v4: uuidv4 } = require("uuid");
const { convertImageToBase64 } = require("../../system/uploadImage/upload");
const schema = require("./schema");

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

const create = async (req, res) => {
  try {
    const basic_company_info = JSON.parse(req.body.basic_company_info);
    const key_contact_person = JSON.parse(req.body.key_contact_person);
    const tell_about_yourself = JSON.parse(req.body.tell_about_yourself);
    const management_team_details = JSON.parse(
      req.body.management_team_details
    );
    const show_product_portfolio = JSON.parse(req.body.show_product_portfolio);
    const userImage = req.file;
    key_contact_person["user_image"] = convertImageToBase64(userImage.path);
    const user = await service.findUser(key_contact_person.email);
    if (user) {
      return res.status(409).json("User Already Exists");
    }

    await validate(res, "basicInfo", {
      basic_company_info,
      key_contact_person,
    });
    await validate(res, "managementInfo", {
      tell_about_yourself,
      management_team_details,
    });
    await validate(res, "productInfo", {
      show_product_portfolio,
    });

    const basicInfo = await service.create({
      basic_company_info,
      key_contact_person,
    });

    const managment = await service.createManagment(
      { tell_about_yourself, management_team_details },
      basicInfo._id
    );

    const product = await service.createProduct(
      { show_product_portfolio },
      basicInfo._id
    );

    const result = {
      message: "User Details",
      detail: { basicInfo, managment, product },
    };
    res.status(201).json(result);
    return;
  } catch (error) {
    console.error("Error in create controller:", error);
    return res.status(500).json("Internal server error.", error);
  }
};

const updatePassword = async (req, res) => {
  let password = req.body.password;
  const secretKey = req.query.token;

  try {
    const findPass = await service.find(secretKey);
    if (!findPass) {
      return res.status(410).json("Reset Password Link Is Expired");
    }

    if (!password) {
      return res.status(400).json("Password is required.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let updateBody = { password: hashedPassword };
    const data = await service.update(findPass._id, updateBody);

    if (!data) {
      return res.status(500).json("Failed to update password.");
    }
    const result = {
      message: "User Password Updated Successfully",
      detail: data,
    };
    updateBody = { token: "" };
    await service.update(findPass._id, updateBody);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error during password update:", error);
    return res.status(500).json("An internal server error occurred");
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await service.findUser(email);
  if (!user) {
    return res.status(400).json("User not found.");
  }
  const match = await bcrypt.compare(password, user.password);
  console.log(password, user.password, match);
  if (match) {
    const token = await jwt.createToken(user._id);
    const refreshToken = await jwt.createRefreshToken(user._id);
    const result = {
      message: "Sign In Successfully",
      accessToken: token,
      refreshToken,
      _id: user._id,
    };
    return res.status(200).json(result);
  } else {
    return res.status(400).json("Incorrect Password. Please try again.");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await service.findUser(email);
  if (!user) {
    const result = {
      message: "User Not Found",
    };
    return res.status(400).json(result);
  }
  const secretKey = uuidv4();
  const link = `http://localhost:3000/update_password/?token=${secretKey}`;

  let updateBody = { token: secretKey };
  await service.update(user._id, updateBody);
  await sendMail(email, link);

  const result = {
    data: link,
    message: "Forget Password mail send Successfully",
  };
  return res.status(400).json(result);
};

const changePassword = async (req, res) => {
  const { email, currPassword, newPassword } = req.body;

  const user = await service.findUser(email);
  if (!user) {
    const result = {
      message: "User Not Found",
    };
    return res.status(400).json(result);
  }
  const match = await bcrypt.compare(currPassword, user.password);
  if (!match) {
    res.status(400).json("Password Not Match");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await service.update(user._id, { password: hashedPassword });

  const result = {
    message: " Password  Changed Successfully",
  };
  return res.status(400).json(result);
};

const getRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).json("Refresh Token Not Found");
  }
  const token = await jwt.verifyRefToken(res, refreshToken);
  const result = {
    message: "Token Generated Successfully",
    accessToken: token,
  };
  return res.status(201).json(result);
};

module.exports = {
  create,
  updatePassword,
  signin,
  forgotPassword,
  changePassword,
  getRefreshToken,
  validate,
};
