import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb "}))
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

//routes declaration
app.use("/api/v1/users", userRouter) // goes to user.routes.js
//http://localhost:8000/api/v1/users/register


export {app}