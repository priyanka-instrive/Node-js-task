const express = require("express");
const app = express();
const auth = require("./system/middleware/authentication");
const morgan = require("morgan");
const middlewareConfig = require("./system/middleware/config");
const cors = require("cors");
const helmet = require("helmet");

if (process.env.NODE_ENV === "local") {
  require("dotenv").config({
    path: `./${process.env.NODE_ENV}.env`,
  });
}
app.use(express.json());
app.use(cors(middlewareConfig.cors));
app.use(helmet());
app.use(morgan(middlewareConfig.morganRequestFormat));
app.use(express.urlencoded({ extended: true }));

const userInfo = require("./api/BasicInfo/route");
const fileUpload = require("./api/User/route");
const passwordRoute = require("./api/ResetPassword/route");

//public route
app.get("/", () => {
  res.send("hello world");
});
app.use("/user", userInfo);
app.use("/password", passwordRoute);

//private route
app.use(auth.authenticate);
app.use("/auth", fileUpload);

app.listen(3000, () => {
  console.log("Server Is Running On " + 3000);
});
