// jwtUtils.js
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2990d" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2990d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token.split(" ")[1], process.env.REFRESH_TOKEN_SECRET); //Remove brearer from token
};

const getAcessTokenFromRequest = (req) => {
  return req.header("Authorization")?.split(" ")[1] ?? null;
};

const generateHash = async (value) => {
  const salt = await bcrypt.genSalt(Number(process.env.HASH_COST_FACTOR));
  const hashedPassword = await bcrypt.hash(value, 10);
  return hashedPassword;
};

// const strongPasswordValidator = (str) => {
//   var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//   return re.test(str);
// };

const strongPasswordValidator = (value) => {
  let errors = [];
  if (typeof value !== "string") {
    return { isValid: false, message: "Value must be a string" };
  }

  if (value.length < 8) {
    errors.push("Your password must be at least 8 characters");
  }
  if (value.search(/[a-z]/i) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (value.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (errors.length > 0) {
    return { isValid: false, message: errors.join("\n") };
  }
  return { isValid: true, message: "Password Is Strong" };
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  getAcessTokenFromRequest,
  generateHash,
  strongPasswordValidator,
};
