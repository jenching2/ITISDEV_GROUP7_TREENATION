// Author: DENISE OCTAVIANO

const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

module.exports = {
  register: async (req, res) => {
    const { username, password, name } = req.body;

    try {
      const user = new UserModel({ username, password, name });
      await user.save();

      res.status(201).json({ message: "Registration Succesful", data: user });
    } catch (error) {
      console.error("Error on registering user", error);
      res.status(500).json({ message: `An Error Occured: ${error}` });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found" });

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch)
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });

      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY ?? "",
        { expiresIn: "1 day" }
      );
      res.json({ token });
    } catch (error) {
      console.error("Error on login user", error);
      res.status(500).json({ message: `An Error Occured: ${error}` });
    }
  },
};
