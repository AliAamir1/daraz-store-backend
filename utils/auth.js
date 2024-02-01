// jwtUtils.js
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2990d' });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,  { expiresIn: '2990d' });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token.split(' ')[1], process.env.REFRESH_TOKEN_SECRET); //Remove brearer from token
};

const getAcessTokenFromRequest = (req)=>{
  return req.header('Authorization')?.split(' ')[1] ?? null;
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, getAcessTokenFromRequest };
