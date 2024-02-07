import express from "express";
import { get, getById, update, remove } from "../controllers/user.js";
import { authenticateToken } from "../middleware/auth.js";

import { catchErrors } from "../handler/errorHandlers.js";

import { userValidation } from "../validators/index.js";
import { confirmDataValidation } from "../handler/validationHandler.js";

import { isAdmin } from "../middleware/auth.js";

const user_router = express.Router();

user_router.get("/", authenticateToken, catchErrors(get));
user_router.get("/:userId", authenticateToken, catchErrors(getById));
user_router.put(
  "/",
  authenticateToken,
  userValidation("update"),
  confirmDataValidation,
  catchErrors(update)
);
user_router.delete(
  "/:userId",
  authenticateToken,
  userValidation("remove"),
  confirmDataValidation,
  isAdmin,
  catchErrors(remove)
);

export default user_router;
