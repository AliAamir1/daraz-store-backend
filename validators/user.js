import { body, param } from "express-validator";
import { Users } from "../db/connection.js";

export const userValidation = (method) => {
  switch (method) {
    case "update":
      return [body("username").optional().notEmpty().isString()];
    case "remove":
      return [param("userId").notEmpty().isUUID()];
  }
};
