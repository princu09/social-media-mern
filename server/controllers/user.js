const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const JWT_SECRET = "NorthFoxGroup";

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, Newuser) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to add user",
      });
    }
    res.json({
      message: "Success",
      user,
    });
  });
};

exports.signin = (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array()[0].msg });
  // }

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email was not found.",
      });
    }

    // Authentication user
    if (password != user.password) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }

    // Data
    const data = {
      user: {
        _id: user._id,
      },
    };

    // Create Token
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.cookie("authtoken", authtoken, { expire: new Date() + 1 });

    const { _id, name, email } = user;

    res.json({
      user: {
        _id,
        name,
        email,
      },
      authtoken,
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("authtoken");
  localStorage.clear();
  return res.json({
    message: "User signout successful",
  });
};
