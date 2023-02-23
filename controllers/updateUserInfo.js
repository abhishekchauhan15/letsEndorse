const { encrypt, decrypt } = require("../utils/crypto.js");
const User = require("../models/userSchema");

exports.updateUserInfo = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const id = req.user.id;
    //   console.log(id)
    const updatedUser = await User.findByIdAndUpdate(id, {
      name: name ? name : req.user.name,
      email: email ? email : req.user.email,
      phoneNumber: phoneNumber ? phoneNumber : req.user.phoneNumber,
    });

    if (updatedUser) {
      return res
        .status(200)
        .json({ error: false, message: "Profile updated successfully." });
    } else {
      return res.status(400).json({
        error: true,
        message:
          "Profile update failed. You are probably sending the wrong token",
      });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
