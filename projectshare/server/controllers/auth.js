import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(); // used to encrypt the password
    const passwordHash = await bcrypt.hash(password, salt); // salt is passed in and password is hashed

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000), // random value
      impressions: Math.floor(Math.random() * 1000), // random value
    });
    const savedUser = await newUser.save(); //save the new user
    res.status(201).json(savedUser); // sends back response back to the frontend
  } catch (err) {
    res.status(500).json({ error: err.message }); // if theres a problem frontend will receive error code
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  {
    try {
      const { email, password } = req.body; //requesting the email and password when the user logs in
      const user = await User.findOne({ email: email }); // searches for the user with the specific email and stores it in User
      if (!User) return res.status(400).json({ msg: "User does not exist. " }); // if user does not exist then return this error code

      const isMatch = await bcrypt.compare(password, user.password); // using bcrypt with the same salt to compare the entered password with the password stored in db
      if (!isMatch) return res.status(400).json({ msg: "Invalid password. " }); // if the entered password is wrong

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message }); // if theres a problem frontend will receive error code
    }
  }
};
