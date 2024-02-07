import express from "express";
import { seedUsers } from "../controllers/seed.js";

import { catchErrors } from "../handler/errorHandlers.js";

const seedRouter = express.Router();

seedRouter.get("/", catchErrors(seedUsers));

export default seedRouter;
