import express from "express";
import { seedUsers, seedProducts } from "../controllers/seed.js";

import { catchErrors } from "../handler/errorHandlers.js";

const seedRouter = express.Router();

seedRouter.get("/", catchErrors(seedUsers));
seedRouter.get("/product", catchErrors(seedProducts));

export default seedRouter;
