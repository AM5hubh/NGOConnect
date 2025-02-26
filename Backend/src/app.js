import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
 });

app.use(errorHandler);

//  app.use((err, req, res, next) => {
//     if (err instanceof ApiError) {
//       return res.status(err.statusCode).json({
//         statusCode: err.statusCode,
//         message: err.message, // Error messages
//         errors: err.errors,   // Specific errors if any
//       });
//     }
  
//     return res.status(500).json({ message: "An unexpected error occurred" });
//   });

//routes import

import userRouter from './routes/user.routes.js'
import ngoRouter from './routes/ngo.routes.js'
import adminRouter from './routes/admin.routes.js'
import volunteerRouter from './routes/volunteer.routes.js'
import loginRouter from './routes/login.routes.js'
import eventRouter from './routes/event.routes.js'
//routes declaration
app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/auth", loginRouter) 
app.use("/api/v1/users", userRouter) 
app.use("/api/v1/ngouser", ngoRouter) 
app.use("/api/v1/volunteer", volunteerRouter)
app.use("/api/v1/event", eventRouter)
//${import.meta.env.VITE_RENDER_PATH}/users/register


export {app}