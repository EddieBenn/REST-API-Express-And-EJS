import express from 'express';
const router =  express.Router();
import { protect } from '../middleware/authMiddleware';

import { registerUser, getRegisterPage, loginUser, getLoginPage, getMe, logoutUser } from '../controllers/userController';


router.get('/register', getRegisterPage);
router.get('/login', getLoginPage);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/mee', protect, getMe);
router.get('/logout', logoutUser);

export default router;