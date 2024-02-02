import bcrypt from "bcrypt";
import { Users } from "../db/connection.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/auth.js";
import { generateHash } from "../utils/auth.js";

import { validateUser } from "../services/auth.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await Users.create({
    username,
    email,
    password,
    roles: ["user"],
  });

  res.status(201).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await Users.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }
  const loginState = await validateUser(user, password);
  if (!loginState.isValid) {
    return res.status(400).json({ message: loginState.message });
  }

  res.json({
    access_token: loginState.access_token,
    refresh_token: loginState.refresh_token,
  });
};

const refreshToken = (req, res) => {
  const refresh_token = req.header("Authorization");
  if (!refresh_token) {
    return res.sendStatus(401);
  }
  let user = verifyRefreshToken(refresh_token);

  delete user.iat;
  delete user.exp;

  const access_token = generateAccessToken(user);
  res.json({ access_token });
};

const update_password = async (req, res) => {
  const { new_password, old_password, user_id } = req.body;
  const user = await Users.findOne({ where: { id: user_id } });

  const error = user.wait.load
  if (new_password === old_password) {
    return res
      .status(400)
      .json({ message: "New Password Cannot Be same as Current Password" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (new_password.length < 4) {
    return res.status(400).json({ message: "Password not strong enough" });
  }

  console.log("old_password", old_password, user.password, user);
  const isPasswordValid = await bcrypt.compare(old_password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "old password not valid" });
  }

  user.password = new_password;

  await user.save();
  console.log(" user.password", user.password);
  return res.status(200).json({ message: "Password Updated Successfully" });
};

export { signup, login, refreshToken, update_password };
