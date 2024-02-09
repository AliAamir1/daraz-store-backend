import express from "express";
import { seedUsers, seedProducts, seedBookings } from "../controllers/seed.js";

import { catchErrors } from "../handler/errorHandlers.js";

const seedRouter = express.Router();

seedRouter.get("/user", catchErrors(seedUsers));
seedRouter.get("/product", catchErrors(seedProducts));
seedRouter.get("/booking", catchErrors(seedBookings));

export default seedRouter;
