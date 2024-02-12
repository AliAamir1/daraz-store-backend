import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "express-async-errors";

import db from "./db/connection.js";
import router from "./routes/router.js";

const PORT = process.env.SERVER_PORT || 6000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  db.sequelize.authenticate().then(() => {
    console.log("Connected to Database");
  });

  if (process.env.NODE_ENV !== "production") {
    db.sequelize.sync({ alter: true }).then(() => {
      //{ force: true }
      console.log("Drop and re-sync db.");
    });
  }
});
