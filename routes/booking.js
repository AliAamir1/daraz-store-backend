import express from "express";
import booking from "../controllers/booking.js";

import { isAdmin } from "../middleware/auth.js";
const bookingRouter = express.Router();

bookingRouter.get("/", booking.get);
bookingRouter.post("/", booking.create);
bookingRouter.put("/:bookingId", booking.update);
bookingRouter.delete("/:bookingId", isAdmin, booking.remove);

export default bookingRouter;
