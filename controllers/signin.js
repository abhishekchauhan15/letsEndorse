const User = require("../models/userSchema");
const jwtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const authenticate = require("../middleware/authenticate");
const { encrypt, decrypt } = require("../utils/crypto.js");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const encryptedEmail = encrypt(email);
    const user = await User.findOne({ email: encryptedEmail });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.json({ message: "User signed in successfully", token });
      } else {
        res.json({ error: "Invalid credentials" });
      }
    } else {
      res.json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};
