import express from "express";
import { get } from "../controllers/user.js";
// import { authenticateToken } from "../middleware/auth.js";

import { catchErrors } from "../handler/errorHandlers.js";

const user_router = express.Router();

user_router.get("/", catchErrors(get));

export default user_router;
