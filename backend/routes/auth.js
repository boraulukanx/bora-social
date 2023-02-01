const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      locationLAT: req.body.locationLAT,
      locationLNG: req.body.locationLNG,
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log in a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("user not matched");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(404).json("wrong password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
