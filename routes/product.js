import express from "express";
import product from "../controllers/product.js";

import { isAdmin } from "../middleware/auth.js";
import { confirmDataValidation } from "../handler/validationHandler.js";

import { productValidator } from "../validators/product.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  isAdmin,
  productValidator("get"),
  confirmDataValidation,
  isAdmin,
  product.get
);
productRouter.get(
  "/:productId",
  isAdmin,
  productValidator("getById"),
  confirmDataValidation,
  isAdmin,
  product.getById
);
productRouter.post(
  "/",
  isAdmin,
  productValidator("create"),
  confirmDataValidation,
  isAdmin,
  product.create
);
productRouter.put(
  "/:productId",
  isAdmin,
  productValidator("update"),
  confirmDataValidation,
  product.update
);
productRouter.delete(
  "/:productId",
  isAdmin,
  productValidator("remove"),
  confirmDataValidation,
  product.remove
);

export default productRouter;
