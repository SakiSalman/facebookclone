import express from 'express';
import { loggedInUser, login, register } from '../controllers/userController.js';



// init router 
const router = express.Router();


// User Auth Routes

router.post('/login', login)
router.post('/register', register)
router.get('/me', loggedInUser)


// export default router 
export default router;