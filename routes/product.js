import express from "express";
import product from "../controllers/product.js";

import { isAdmin } from "../middleware/auth.js";
import { confirmDataValidation } from "../handler/validationHandler.js";
import { catchErrors } from "../handler/errorHandlers.js";

import { productValidator } from "../validators/product.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  isAdmin,
  productValidator("get"),
  confirmDataValidation,
  isAdmin,
  catchErrors(product.get)
);
productRouter.get(
  "/:productId",
  isAdmin,
  productValidator("getById"),
  confirmDataValidation,
  isAdmin,
  catchErrors(product.getById)
);
productRouter.post(
  "/",
  isAdmin,
  productValidator("create"),
  confirmDataValidation,
  isAdmin,
  catchErrors(product.create)
);
productRouter.put(
  "/:productId",
  isAdmin,
  productValidator("update"),
  confirmDataValidation,
  catchErrors(product.update)
);
productRouter.delete(
  "/:productId",
  isAdmin,
  productValidator("remove"),
  confirmDataValidation,
  catchErrors(product.remove)
);

export default productRouter;
