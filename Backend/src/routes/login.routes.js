import {Router} from "express";
import {loginVolunteer} from "../controllers/volunteer.controller.js"
import { loginUser } from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/login").post(loginVolunteer) 
router.route("/login").post(loginUser) 


export default router