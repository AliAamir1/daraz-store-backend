import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
  const BookingProduct = sequelize.define(
    "BookingProduct",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      defaultScope: {
        attributes: { exclude: [] },
      },
      scopes: {
        associated: {
          exclude: ["createdAt", "updatedAt", "bookingId"],
        },
      },
    }
  );

  return BookingProduct;
};
