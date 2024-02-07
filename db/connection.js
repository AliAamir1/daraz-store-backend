import dbConfig from "../config/db.config.js";

import Sequelize from "sequelize";
import { DataTypes } from "sequelize";

import User from "../models/user.js";
import Product from "../models/product.js";
import Booking from "../models/booking.js";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Users = (db.Users = User(sequelize, Sequelize));
const Bookings = (db.Booking = Booking(sequelize, Sequelize));
const Products = (db.Product = Product(sequelize, Sequelize));

Bookings.belongsTo(Users, {
  foreignKey: {
    type: DataTypes.UUID,
    name: "userId",
  },
});

Bookings.belongsTo(Products, {
  foreignKey: {
    type: DataTypes.UUID,
    name: "productId",
  },
});

export { Users, Bookings, Products };
export default db;
