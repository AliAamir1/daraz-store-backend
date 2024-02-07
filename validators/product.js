import { body, param } from "express-validator";

const filterRequestBody = (expectedFields) => {
  return (req, res, next) => {
    const filteredBody = {};
    expectedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        filteredBody[field] = req.body[field];
      }
    });
    req.body = filteredBody;
    next();
  };
};

const productValidator = (method) => {
  switch (method) {
    case "getById":
      return [param("productId").notEmpty().isUUID()];
    case "create":
      return [
        body("name").notEmpty().isString(),
        body("price").notEmpty().isFloat(),
        body("quantity").notEmpty().isInt(),
        body("brand").notEmpty().isString(),
      ];
    case "update":
      return [
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
