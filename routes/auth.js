import express from "express";
import {
  signup,
  login,
  refreshToken,
  update_password,
} from "../controllers/auth.js";

import { authenticateToken } from "../middleware/auth.js";
import { confirmDataValidation } from "../handler/validationHandler.js";

import { catchErrors } from "../handler/errorHandlers.js";

import dataValidator from "../validators/index.js";

import { body } from "express-validator";

const authrouter = express.Router();

authrouter.post("/signup", catchErrors(signup));
authrouter.post(
  "/login",
  dataValidator.authIncomingDataValidation("login"),
  confirmDataValidation, // this is used to validate the above validator
  catchErrors(login)
);
authrouter.post("/refresh-token", catchErrors(refreshToken));
authrouter.post(
  "/update_password",
  dataValidator.authIncomingDataValidation("update_password"),
  authenticateToken,
  confirmDataValidation, //this is used to validate the above validator
  catchErrors(update_password)
);

export default authrouter;
