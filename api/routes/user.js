import express from 'express';
import { activateUser, loggedInUser, register, Userlogin } from '../controllers/userController.js';



// init router 
const router = express.Router();


// User Auth Routes

router.post('/login', Userlogin)
router.post('/register', register)
router.post('/activation/:token', activateUser)
router.get('/me', loggedInUser)


// export default router 
export default router;