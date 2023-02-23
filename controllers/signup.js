const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { encrypt, decrypt } = require("../utils/crypto.js");

exports.signup = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  if (!name || !phoneNumber || !email || !password) {
    res.status(422).json({ error: "Please fill all the fields" });
  }
  if (
    !/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/.test(
      email
    )
  )
    return res.status(422).json({ error: "Invalid Email" });

  //   if (phoneNumber != 10) {
  //     return res.status(400).json({
  //       message: "Phone number must be 10 digits",
  //     });
  //   }

  try {
    const checkEncryptedEmail = encrypt(email);
    const userExist = await User.findOne({ email: checkEncryptedEmail });
    if (userExist) return res.status(422).json({ error: "User already exist" });

    console.log("name: ", name);
    console.log("phoneNumber: ", phoneNumber);
    console.log("email: ", email);
    console.log(password);

    const encryptedName = encrypt(name);
    const encryptedPhoneNumber = encrypt(phoneNumber);
    const encryptedEmail = encrypt(email);
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("encryptedName: ", encryptedName);
    console.log("encryptedPhoneNumber: ", encryptedPhoneNumber);
    console.log("encryptedEmail: ", encryptedEmail);
    console.log("encryptedPassword: ", hashedPassword);

    const user = new User({
      name: encryptedName,
      phoneNumber: encryptedPhoneNumber,
      email: encryptedEmail,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
