import express from "express";

import authrouter from "./auth.js";
import user_router from "./user.js";
import seedRouter from "./seed.js";

import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.use("/auth", authrouter);
router.use("/user", authenticateToken, user_router);
router.use("/seed", seedRouter);

export default router;
