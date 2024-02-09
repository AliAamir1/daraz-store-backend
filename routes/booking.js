import express from "express";
import booking from "../controllers/booking.js";

import { isAdmin } from "../middleware/auth.js";
import { catchErrors } from "../handler/errorHandlers.js";

import { bookingValidator } from "../validators/booking.js";
import { confirmDataValidation } from "../handler/validationHandler.js";

const bookingRouter = express.Router();

bookingRouter.get(
  "/",
  bookingValidator("get"),
  confirmDataValidation,
  catchErrors(booking.get)
);
bookingRouter.post(
  "/",
  bookingValidator("create"),
  confirmDataValidation,
  catchErrors(booking.create)
);
bookingRouter.put(
  "/:bookingId",
  bookingValidator("update"),
  confirmDataValidation,
  catchErrors(booking.update)
);
bookingRouter.delete(
  "/:bookingId",
  bookingValidator("remove"),
  confirmDataValidation,
  isAdmin,
  catchErrors(booking.remove)
);

export default bookingRouter;
