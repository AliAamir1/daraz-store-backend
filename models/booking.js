import { query } from "express";
import { DataTypes, Op } from "sequelize";
import { bookingStatuses } from "../consts.js";

export default (sequelize, Sequelize) => {
  const Booking = sequelize.define(
    "Booking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      status: {
        type: DataTypes.ENUM(Object.values(bookingStatuses)),
        defaultValue: bookingStatuses.PENDING,
        allowNull: false,
      },
      completed_at: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      sequelize,
      defaultScope: {
        attributes: { exclude: [] },
      },
    }
  );

  Booking.getFiltered = async ({
    completedDate,
    createdDate,
    status,
    offset,
    limit,
    userId,
    productId,
    bookingId,
  }) => {
    const filterConditions = {
      [Op.and]: [
        (createdDate.start || createdDate.end) && {
          created_at: {
            ...(createdDate.start && { [Op.gte]: createdDate.start }),
            ...(createdDate.end && { [Op.lte]: createdDate.end }),
          },
        },
        (createdDate.start || createdDate.end) && {
          created_at: {
            ...(createdDate.start && { [Op.gte]: createdDate.start }),
            ...(createdDate.end && { [Op.lte]: createdDate.end }),
          },
        },
        status && { status: status },
        userId && { userId },
        productId && { productId },
        bookingId && { id: bookingId },
      ],
    };

    const filteredBooking = await Booking.findAll({
      where: filterConditions,
      offset: offset,
      limit: limit,
    });
  };
  return Booking;
};
