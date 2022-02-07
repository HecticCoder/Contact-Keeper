const express = require("express");
const { check, validationResult } = require("express-validator"); //checks for a certain shit to be present
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POST api/users
// @desc    register user
// @access    public

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(), //express validator checks
    check("email", "email is required").isEmail(), //to make sure they name is not empty and email is email
    check("password", "please enter a password of minimum 6 digits").isLength({
      min: 6,
    }), //check if pass is of 6 digits
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //key value of email is same is in email: email email is same
      if (user) {
        return res.status(500).send("user already exists.");
      }
      user = new User({
        name,
        email,
        password,
      });

      //encrypting the passowrd using blowfish encryption algorithm
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt); //salt is a random string which encryots the passoword
      await user.save(); //this saves the user(along with the encrypted password)

      //json webtoken payload and signature
      const payload = {
        id: user.id,
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
      console.error(err.message);
      res.status(500).send("server error"); //this shows that an error has occured on the server side
    }
    //this requests the client for the body to be registered
  }
); // in this '/' pretains to users in this file

//get is used for fetching data from the server and post is used to submit data to the server

// whereas put and delete are used to update and delete something from the server

module.exports = router;
