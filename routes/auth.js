const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   get api/auth
// @desc    get logged in user
// @acces   private

router.get("/", (req, res) => {
  res.send("user log in");
});

// @route   POST api/auth
// @desc    auth user
// @access   private

router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "please enter a password of 6 digits or more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //destructure
    try {
      //email authentication
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "invalid credentials" });

      //password authenticaton
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(500).json({ msg: "invalid credentials" });

      //payload and signature
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message); //this is for the developer
      res.status(500).sen("sever error");
    }
  }
);

module.exports = router;
