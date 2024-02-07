// authMiddleware.js

import { verifyAccessToken, getAcessTokenFromRequest } from "../utils/auth.js";
import { Users } from "../db/connection.js";
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

const isAdmin = async (req, res, next) => {
  const { id: userId } = req.user;
  const user = await Users.findByPk(userId);

  if (user.roles.includes("admin")) {
    next();
  } else {
    return res.sendStatus(403);
  }
};

export { authenticateToken, isAdmin };
