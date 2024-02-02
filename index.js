import express from 'express';
import db from './db/connection.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';

import router from './routes/router.js';

const PORT = process.env.SERVER_PORT || 6000;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    db.sequelize.authenticate().then(() => {
        console.log("Connected to Database");
    })
    db.sequelize.sync().then(() => { //{ force: true }
        console.log("Drop and re-sync db.");
    });
});