const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signup(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  try {
    const user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();

    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.send({ email: user.email, accessToken: token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function login(req, res) {

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });


  if (!user) {
    return res.status(401).send({ message: "User doesn't exists" });
  } 
  else {
    const isPasswordValid = bcrypt.compare(password, user.password)


    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password or Email" });
    } 
    else {
      const token = jwt.sign(
        { name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.send({ email: user.email, accessToken: token  });
    }
  }
}

module.exports = { signup, login };
