import {Router} from "express";
import {getMe,registerVolunteer, verifyOtp,getVolunteersByStatus,updateVolunteerStatus, loginVolunteer, getAllVolunteers} from "../controllers/volunteer.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerVolunteer) 
router.route("/allvolunteers").get(getAllVolunteers) 
router.route("/getme").get(getMe) 
router.route("/login").post(loginVolunteer) 
router.route("/veriftotp").post(verifyOtp) 
router.route("/getbystatus").get(getVolunteersByStatus) 
router.route('/getbystatus/:volunteerId/status').patch(updateVolunteerStatus);

export default router