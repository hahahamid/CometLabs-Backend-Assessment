const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// SIGNUP SECTION 


async function signup(req, res) {

  // getting user data from body of POST request
  
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  try {
    
    // creating new user object from model 

    const user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();


    // creating token for 1 day 

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


// LOGIN SECTION 


async function login(req, res) {

  const email = req.body.email;
  const password = req.body.password;

  // searching user in the database wrt email 

  const user = await User.findOne({ email: email });

  // If user is not found in the database 

  if (!user) {
    return res.status(401).send({ message: "User doesn't exists" });
  } 
  else {

    // comparing user password to the one saved in database  
    
    const isPasswordValid = bcrypt.compare(password, user.password)

    // If password or email doesn't matches 

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
