const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  // ,
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
});



userSchema.methods.generateAuthToken = async function () {
  try {
    //dbId , userId
    // let tokenMern = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    let tokenMern= jwt.sign(JSON.stringify(this._id ), process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: tokenMern });
    await this.save();
    return tokenMern;
  } catch (error) {
    console.log(error);
  }
};

//collection creation
const User = mongoose.model("registration", userSchema);

module.exports = User;
