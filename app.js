const express = require("express");
const app = express();
const auth = require("./system/middleware/authentication");

if (process.env.NODE_ENV === "local") {
  require("dotenv").config({
    path: `./${process.env.NODE_ENV}.env`,
  });
}
console.log("process.env.NODE_ENV==>>", process.env.NODE_ENV);
app.use(express.json());

const userInfo = require("./api/BasicInfo/route");
const fileUpload = require("./api/User/route");

//public route
app.get("/", () => {
  res.send("hello world");
});
app.use("/", userInfo);

//private route
app.use("/", auth.authenticate);
app.use("/", fileUpload);

app.listen(3000, () => {
  console.log("Server Is Running On " + 3000);
});
