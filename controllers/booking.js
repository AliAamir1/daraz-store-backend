import { Bookings, Users, Products } from "../db/connection.js";
import { bookingStatuses } from "../consts.js";
// Get Bookings
const get = async (req, res, next) => {
  const {
    days,
    status,
    page = 1,
    limit = 20,
    productId,
    userId,
    bookingId,
    createdStart,
    createdEnd,
    completedStart,
    completedEnd,
  } = req.query;
  const createdDate = {
    ...(createdStart && { start: new Date(createdStart) }),
    ...(createdEnd && { end: new Date(createdEnd) }),
  };
  const completedDate = {
    ...(completedStart && { start: new Date(completedStart) }),
    ...(completedEnd && { end: new Date(completedEnd) }),
  };

  const offset = (page - 1) * limit;

  const filteredBookings = await Bookings.getFiltered({
    completedDate,
    createdDate,
    status,
    offset,
    limit,
    userId,
    productId,
    bookingId,
  });

  return res.status(200).json({ data: filteredBookings });
};

const create = async (req, res, next) => {
  const booking = req.body;

  const newBooking = await Bookings.create(booking);

  return res.status(201).json({ data: newBooking });
};

// Update Booking
const update = async (req, res, next) => {
  const { bookingId } = req.params;
  const updatedData = req.body;

  const existingBooking = await Bookings.findByPk(bookingId);

  if (!existingBooking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  if (updatedData.status === bookingStatuses.Delivered) {
    updatedData.completed_at = new Date();
  }
  await existingBooking.update(updatedData);

  return res.status(200).json({ data: existingBooking });
};

// Delete Booking
const remove = async (req, res, next) => {
  const { bookingId } = req.params;

  const existingBooking = await Bookings.findByPk(bookingId);

  if (!existingBooking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  await existingBooking.destroy();

  return res.status(200).json({ message: "Booking Deleted Successfully" });
};

export { get, create, update, remove };
export default { get, create, update, remove };
