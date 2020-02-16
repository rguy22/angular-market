var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
// mongoose.connect("mongodb://localhost/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  admin: { type: Boolean, required: true }
});

const User = mongoose.model("User", userSchema);

/* GET users listing. */
router.get("/", async (_, res) => {
  const users = await User.find().exec();
  // users.deleteMany();
  res.send(users);
});

router.post(
  "/",
  [
    check("userName", "User name is required")
      .not()
      .isEmpty(),
    check("password", "please enter password between 8-12 charcters").isLength({
      min: 8,
      max: 12
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.msg);
      return res.status(400).json(errors.errors);
    }
    const { userName, password } = req.body;
    const guess = password;

    try {
      const user = await User.findOne({ userName: userName });

      if (!user) {
        return res.status(400).json({ errors: "User Name Not Exist" });
      }
      console.log(guess, user.password);

      bcrypt.compare(guess, user.password, function(err, reso) {
        if (reso) {
          res.status(200).send(user);
        } else {
          res.status(400).json({ errors: "Password incorrect" });
        }
      });
    } catch (err) {
      res.status(500).json({ errors: "Something Happen :(" });
    }
  }
);

router.post(
  "/firstRegister",
  [
    check("userName", "User name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 12 }),
    check(
      "password",
      "Please enter a password between 8-12 characters"
    ).isLength({ min: 8, max: 12 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let { userName, password } = req.body;
    userName = userName.toLowerCase();
    console.log(errors);

    if (!errors.isEmpty()) {
      console.log("err empty");
      return res.status(400).json(errors);
    }

    if (!userName) {
      errors.userName = "User name is required";
      return res.status(400).json(errors);
    }

    if (!password) {
      errors.password = "Password is required";
      return res.status(400).json(errors);
    }

    User.findOne({ userName: userName }).then(user => {
      if (user) {
        errors.userName = "User Name already exists";
        return res.status(400).json(errors);
      } else {
        res.status(200).json({
          checked: true
        });
      }
    });
  }
);

router.post(
  "/register",
  [
    check("city", "city is required")
      .not()
      .isEmpty(),
    check("street", "street is required")
      .not()
      .isEmpty(),
    check("firstName", "First name is required")
      .not()
      .isEmpty(),
    check("lastName", "Last name is required")
      .not()
      .isEmpty(),
    check("userName", "User name is required")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 12 }),

    check(
      "password",
      "Please enter a password between 8-12 characters"
    ).isLength({ min: 8, max: 12 })
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const {
      firstName,
      lastName,
      userName,
      city,
      street,
      password,
      admin
    } = req.body;

    try {
      let user = await User.findOne({ userName });
      if (user) {
        res.status(400).send({ errors: "User alredy exist" });
      }
      user = new User({
        firstName,
        lastName,
        userName,
        password,
        city,
        street,
        admin
      });

      console.log(user);

      bcrypt.hash(user.password, 10, async function(err, hash) {
        if (err) throw err;
        user.password = hash;
        await user
          .save()

          .then(user => res.json(user))
          .catch(err => res.json(err));
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: "Something Happen :(" });
    }
  }
);

module.exports = router;
