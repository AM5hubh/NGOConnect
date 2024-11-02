import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  verifyOtp,
  resendOtpVerificationCode,
  verifyLoginOtp,
  getCurrentAdmin,
  getAllAdmin,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/register").post(registerAdmin);

router.route("/login").post(loginAdmin);

router.route("/logout").post(logoutAdmin);
router.route("/verifyOtp").post(verifyOtp);
router.route("/verifyLoginOtp").post(verifyLoginOtp);
router.route("/getcurrentadmin").get(verifyJWT,getCurrentAdmin);
router.route("/getalladmin").get(getAllAdmin);
router.route("/resendOtpVerificationCode").post(resendOtpVerificationCode);

export default router;
