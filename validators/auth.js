import { body } from "express-validator";
import { Users } from "../db/connection.js";
import { validatePassword } from "../utils/auth.js";

const authIncomingDataValidation = (method) => {
  switch (method) {
    case "signup":
      return [
        body("username").notEmpty().isString(),
        body("password").custom(validatePassword),
        body("email").notEmpty().isEmail(),
      ];
    case "login":
      return [
        body("password").custom(validatePassword),
        body("email").notEmpty().isEmail(),
      ];
    case "update_password":
      return [
        body("new_password").custom(validatePassword),
        body("old_password").notEmpty().isString(),
        body("user_id").notEmpty(),
      ];
  }

  return [];
};

export { authIncomingDataValidation };
