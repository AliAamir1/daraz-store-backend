import { body, param, check } from "express-validator";
import { filterRequestFields } from "../utils/helper.js";

const productValidator = (method) => {
  switch (method) {
    case "get":
      return [
        check("page")
          .optional()
          .notEmpty()
          .isInt()
          .withMessage("Page must be an integer"),
        check("limit")
          .optional()
          .notEmpty()
          .isInt()
          .withMessage("Limit must be an integer"),
        check("name")
          .optional()
          .notEmpty()
          .isString()
          .withMessage("Name must be a string"),
        check("price_min")
          .optional()
          .notEmpty()
          .isFloat()
          .withMessage("Price_min must be a number"),
        check("price_max")
          .optional()
          .notEmpty()
          .isFloat()
          .withMessage("Price_max must be a number"),
        check("quantity_min")
          .optional()
          .notEmpty()
          .isInt()
          .withMessage("Price_max must be an integer"),
        check("quantity_max")
          .notEmpty()
          .optional()
          .isInt()
          .withMessage("Price_max must be an integer"),

        check("brand")
          .optional()
          .isString()
          .withMessage("brand must be a string"),
      ];
    case "getById":
      return [param("productId").notEmpty().isUUID()];
    case "create":
      return [
        filterRequestFields("body", ["name", "price", "quantity", "brand"]),
        body("name").notEmpty().isString(),
        body("price").notEmpty().isFloat(),
        body("quantity").notEmpty().isInt(),
        body("brand").notEmpty().isString(),
      ];
    case "update":
      return [
        filterRequestFields("body", ["name", "price", "quantity", "brand"]),
        body("name").optional().notEmpty().isString(),
        body("price").optional().notEmpty().isFloat(),
        body("quantity").optional().notEmpty().isInt(),
        body("brand").optional().notEmpty().isString(),
        param("productId").notEmpty().isUUID(),
      ];
    case "remove":
      return [param("productId").notEmpty().isUUID()];
    default:
      return [];
  }
};

export { productValidator };
