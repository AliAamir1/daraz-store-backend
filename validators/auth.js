import { body } from "express-validator";
import { Users } from "../db/connection.js";
import { strongPasswordValidator } from "../utils/auth.js";

const authIncomingDataValidation = (method) => {
  switch (method) {
    case "signup":
      // username, email, password
      return [];
    case "login":
      // email, password
      return [
        body("password")
          .notEmpty()
          .custom((value) => {
            console.log("strongPasswordValidator inner");
            return false;
          }),
      ];
    case "update_password":
      // new_password, old_password, user_id
      console.log("within update_passworddddddddddd");
      return [
        body("new_password").custom((value, { req }) => {
          const passwordState = strongPasswordValidator(value);
          return passwordState.isValid;
        }),
        body("old_password").notEmpty().isString(),
        body("user_id").notEmpty(),
      ];
  }

  return [];
};

export { authIncomingDataValidation };
