import { body } from "express-validator";
import { Users } from "../db/connection.js";
import { strongPasswordValidator } from "../utils/auth.js";

const validatePassword = (value, { req }) => {
  const passwordState = strongPasswordValidator(value);
  return passwordState.isValid;
};

const authIncomingDataValidation = (method) => {
  console.log("Validation being hit");
  switch (method) {
    case "signup":
      return [
        body("username").notEmpty().isString(),
        body("password").custom((value, { req }) => {
          const passwordState = strongPasswordValidator(value);
          return passwordState.isValid;
        }),
        body("email").notEmpty().isEmail(),
      ];
      return [];
    case "login":
      return [
        body("password").custom((value, { req }) => {
          const passwordState = strongPasswordValidator(value);
          return passwordState.isValid;
        }),
        body("email").notEmpty().isEmail(),
      ];
    case "update_password":
      return [
        body("new_password").custom(validatePassword),
        // body("new_password").custom((value, { req }) => {
        //   const passwordState = strongPasswordValidator(value);
        //   return passwordState.isValid;
        // }),
        body("old_password").notEmpty().isString(),
        body("user_id").notEmpty(),
      ];
  }

  return [];
};

export { authIncomingDataValidation };
