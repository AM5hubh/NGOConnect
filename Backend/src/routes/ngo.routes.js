import {Router} from "express";
import {verifyJWT} from "../middlewares/ngoauth.middleware.js";
import { 
  registerNGOUser, 
  loginNGOUser, 
  logoutNGOUser, 
  refreshNGOAccessToken, 
  getCurrentNGOUser 
} from '../controllers/ngo.controller.js'; // Path to the NGO controller
// import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router()

// Route for NGO user registration
router.route('/register').post(registerNGOUser);

// Route for NGO user login
router.route('/login').post(loginNGOUser);

// Route for NGO user logout (requires authentication)
router.route('/logout').post(logoutNGOUser);

// Route for refreshing NGO access token
router.route('/refresh-token').post(refreshNGOAccessToken);

// Route for getting current NGO user details (requires authentication)
router.route('/current').get(verifyJWT,getCurrentNGOUser);

export default router;
