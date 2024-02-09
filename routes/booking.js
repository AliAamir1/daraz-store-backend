import express from "express";
import booking from "../controllers/booking.js";

import { isAdmin } from "../middleware/auth.js";
import { catchErrors } from "../handler/errorHandlers.js";

const bookingRouter = express.Router();

bookingRouter.get("/", catchErrors(booking.get));
bookingRouter.post("/", catchErrors(booking.create));
bookingRouter.put("/:bookingId", catchErrors(booking.update));
bookingRouter.delete("/:bookingId", isAdmin, catchErrors(booking.remove));

export default bookingRouter;
