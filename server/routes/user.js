const express = require("express");
const { signup, signin , signout } = require("../controllers/user");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/signup",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body(
      "password",
      "Password Cannot be Blank or Should be 6 Characters."
    ).isLength({ min: 6 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
