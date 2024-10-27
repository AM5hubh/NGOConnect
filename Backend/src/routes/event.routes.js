import {Router} from "express";
import { createEvent, deleteEvent, getNGOEvents, updateEvent } from "../controllers/event.controller.js";


const router = Router()



router.route("/create").post(createEvent)
router.route("/delete").post(deleteEvent)
router.route("/update").post(updateEvent)
router.route("/get").get(getNGOEvents)


export default router