import express from "express";

import { makePaymentIntent, makeProduct } from "../controllers/payment.js";

import { catchErrors } from "../handler/errorHandlers.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", catchErrors(makePaymentIntent));
paymentRouter.post("/create-product", catchErrors(makeProduct));

export default paymentRouter;
