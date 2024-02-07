// authMiddleware.js

import { verifyAccessToken, getAcessTokenFromRequest } from "../utils/auth.js";

const authenticateToken = (req, res, next) => {
  const token = getAcessTokenFromRequest(req);
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.log("error", error);
    return res.sendStatus(403);
  }
};

const isAdmin = (req, res, next) => {
  const { roles } = req.user;

  if (roles.includes("admin")) {
    next();
  } else {
    return res.sendStatus(403);
  }
};

export { authenticateToken, isAdmin };
