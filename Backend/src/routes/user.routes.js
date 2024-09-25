import {Router} from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken,getCurrentUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([      //midleware multer
        // {
        //     name: "avatar",
        //     maxCount: 1
        // },
        // {
        //     name: "coverImage",
        //     maxCount: 1 
        // }
    ]),
    registerUser
) //called from app.js


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)

export default router