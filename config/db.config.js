import dotenv from 'dotenv'
dotenv.config();
const dbConfig = {
    HOST: process.env.SERVER,
    USER: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DATABASE,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

export default dbConfig;
