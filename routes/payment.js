import express from "express";

import {
  makePaymentIntent,
  makeProduct,
  generateCheckoutSession,
} from "../controllers/payment.js";

import { catchErrors } from "../handler/errorHandlers.js";
import { authenticateToken } from "../middleware/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", catchErrors(makePaymentIntent));
paymentRouter.post("/create-product", catchErrors(makeProduct));
paymentRouter.post(
  "/generate-checkout-session",
  authenticateToken,
  catchErrors(generateCheckoutSession)
);

export default paymentRouter;
