import express from 'express';

import authrouter from "./auth.js";
import user_router from "./user.js";

const router = express.Router();


router.use('/auth' , authrouter);
router.use('/user', user_router )

export default router;