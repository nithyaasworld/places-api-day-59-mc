const UserModel = require("../models/users");
const bcrypt = require('bcrypt');
const defaultPic = '/images/avatar.png'

const addUser = async ({ userName, email, password, profilePic }) => {
    if (!profilePic) {
        profilePic = defaultPic;
    }
    // let emailRegex = /.*@.*\..*/;
    // if (!emailRegex.test(email)) {
    //     return { status: false, result: "Invalid Email ID" };
    // }
    //insert bcrypt 
    let hash = await bcrypt.hash(password, 10);
    
    let user = new UserModel({ name: userName, email, password: hash, profilePic })
    let result = {};
    await user.save().then((res) => {
        result["status"] = true;
        result["user"] = res;
    }).catch((err) => {
        result["status"] = false;
        result["err"] = err;
    });
    return result;
};

const getUsers =  async () => {
    let users = await UserModel.find();
    return users;
}

module.exports = {
 addUser
};
