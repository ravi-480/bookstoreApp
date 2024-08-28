const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const createdUser = new User({
        name,
        email,
        password: hashPassword,
      });
      await createdUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          id:createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      } else {
        return res.status(200).json({
          message: "Login successfully",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
