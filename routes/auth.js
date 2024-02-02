import express from 'express';
import { signup, login, refreshToken, update_password } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/auth.js';

import { catchErrors } from '../handler/errorHandlers.js';
const authrouter = express.Router();

authrouter.post('/signup', catchErrors(signup));
authrouter.post('/login', catchErrors(login));
authrouter.post('/refresh-token', catchErrors(refreshToken));
authrouter.post('/update_password', authenticateToken, catchErrors(update_password));

export default authrouter;
