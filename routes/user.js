import express from 'express';
import { get_all_users } from "../controllers/user.js";
import { authenticateToken } from '../middleware/auth.js';

const user_router = express.Router();

user_router.get('/', authenticateToken,  get_all_users);



export default user_router;