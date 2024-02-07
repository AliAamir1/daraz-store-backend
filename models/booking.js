import { DataTypes } from "sequelize";

const booking_statuses = {
  PENDING: "pending",
  Delivered: "delivered",
  Cancelled: "cancelled",
};
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
        type: DataTypes.ENUM(Object.values(booking_statuses)),
        defaultValue: booking_statuses.PENDING,
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
  return Booking;
};
