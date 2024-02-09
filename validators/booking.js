import { body, param, check } from "express-validator";
import { filterRequestFields } from "../utils/helper.js";
import { bookingStatusList } from "../consts.js";
const bookingValidator = (method) => {
  switch (method) {
    case "get":
      return [
        check("createdStart")
          .optional()
          .isISO6391()
          .withMessage("createdStart must be a valid date"),
        check("createdEnd")
          .optional()
          .isISO8601()
          .withMessage("createdEnd must be a valid date"),
        check("completedStart")
          .optional()
          .isISO8601()
          .withMessage("completedStart must be a valid date"),
        check("completedEnd")
          .optional()
          .isISO8601()
          .withMessage("completedEnd must be a valid date"),
        check("status")
          .optional()
          .isIn(bookingStatusList)
          .withMessage(`Status can only be of values ${bookingStatusList}`),
        check("page").optional().isInt().withMessage("Page must be an int"),
        check("limit").optional().isInt().withMessage("limit must be an int"),
        check("userId").optional().isUUID(),
        check("productId").optional().isUUID(),
        check("bookingId").optional().isUUID(),
      ];
    case "create":
      return [
        filterRequestFields("body", ["userId", "productId"]),
        body("userId").notEmpty().isUUID(),
        body("productId").notEmpty().isUUID(),
      ];
    case "update":
      return [
        param("bookingId").exists().isUUID(),
        body("userId").optional().isUUID(),
        body("productId").optional().isUUID(),
        body("status")
          .optional()
          .isIn(bookingStatusList)
          .withMessage(
            `Status can only be among the values [${bookingStatusList}]`
          ),
      ];
    case "remove":
      return [param("bookingId").exists().isUUID()];
    default:
      return [];
  }
};

export { bookingValidator };
