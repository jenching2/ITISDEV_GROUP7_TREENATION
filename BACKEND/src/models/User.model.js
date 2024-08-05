// Author: DENISE OCTAVIANO

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ADD MORE FIELD ON USER SCHEMA PLS!!!
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, require: true },
    message: { type: String },
    mobile: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    console.error("Error on saving user ", error);
  }
});

// Compare given password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
