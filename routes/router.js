import express from "express";

import authrouter from "./auth.js";
import user_router from "./user.js";
import productRouter from "./product.js";
import seedRouter from "./seed.js";
import bookingRouter from "./booking.js";

import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use("/auth", authrouter);
router.use("/user", authenticateToken, user_router);
router.use("/product", authenticateToken, productRouter);
router.use("/seed", authenticateToken, isAdmin, seedRouter);
router.use("/booking", authenticateToken, bookingRouter);

export default router;
