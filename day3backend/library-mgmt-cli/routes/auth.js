const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multipart = multer({ storage: storage });

router.post("/signup", multipart.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // req.body.photoUrl = req.file.path;
  let result = await userController.addUser(req.body);
  console.log(result);
  if (result.status) {
    let payload = {
      email: result.user.email,
    };
    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
    console.log("access token is: ", token);
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });
    console.log("refresh token is: ", refreshToken);
    refreshTokens.push(refreshToken);
    // res.status(201).send(result.user);
    res.status(201).json({ access_token: token, refresh_token: refreshToken });
  } else {
    // res.status(401).send(result.err)
    res.status(400).json(result.result);
  }
});

router.post("/token", async (req, res) => {
    const { token, email } = JSON.parse(req.body.body);
    console.log(req.body);
    console.log(req.body.body);
   
    if (!token) {
        res.status(400).send("Token  not found");
    } else if (refreshTokens.includes(token)) {
        res.status(403).send("RefreshToken is not valid");
//   if (!token || !refreshTokens.includes(token)) {
//     res.send(403);
  } else {
    try {
      let payload = { email: email };
      let newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      });
      console.log("newly generated access token", newAccessToken);
      res.status(201).json({ access_token: newAccessToken });
    } catch (e) {
      console.log(e);
      res.status(401).send(e);
    }
  }
});

router.post("/login", async (req, res) => {
  console.log("reached the router");
  console.log(req.body);
    let result = await userController.loginUser(req.body);
    console.log(result);
  if (result.status) {
    console.log(result.result);
    let payload = {
      email: result.result.email,
    };
    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
    console.log(token);
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });
    refreshTokens.push(refreshToken);
    res.status(201).json({ access_token: token, refresh_token: refreshToken });
  } else {
    res.status(400).json(result.result);
  }
});

module.exports = router;