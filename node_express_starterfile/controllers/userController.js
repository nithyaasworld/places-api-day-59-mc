const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const addUser = async ({ name, email, password }) => {
  // let emailRegex = /.*@.*\..*/;
  // if (!emailRegex.test(email)) {
  //     return { status: false, result: "Invalid Email ID" };
  // }
  //insert bcrypt
  let hash = await bcrypt.hash(password, 10);

  let user = new UserModel({ name, email, password: hash });
  let result = {};
  await user
    .save()
    .then((res) => {
      result["status"] = true;
      result["user"] = res;
    })
    .catch((err) => {
      result["status"] = false;
      result["err"] = err;
    });
  return result;
};
const loginUser = async ({ email, password }) => {
  try {
    console.log("email is: ", email);
    let user = await UserModel.findOne({ email });
    console.log("user is: ", user);
    if (user === null) {
      return { status: false, result: { message: "Invalid Email" } };
    }
    console.log(user);
    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return { status: false, result: { message: "Invalid Password" } };
    }
    return { status: true, result: user };
  } catch (error) {
    return { status: false, result: { message: "Error: " + error.message } };
  }
};
module.exports = {
  addUser,
  loginUser,
};
