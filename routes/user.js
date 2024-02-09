import express from "express";
import { get, getById, update, remove } from "../controllers/user.js";

import { catchErrors } from "../handler/errorHandlers.js";

import { userValidation } from "../validators/index.js";
import { confirmDataValidation } from "../handler/validationHandler.js";

import { isAdmin } from "../middleware/auth.js";

const user_router = express.Router();

user_router.get("/", catchErrors(get));
user_router.get("/:userId", catchErrors(getById));
user_router.put(
  "/",
  userValidation("update"),
  confirmDataValidation,
  catchErrors(update)
);
user_router.delete(
  "/:userId",
  userValidation("remove"),
  confirmDataValidation,
  isAdmin,
  catchErrors(remove)
);

export default user_router;
