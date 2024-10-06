import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken"
import { NGO } from "../models/ngo.model.js";


export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token) {
            return res.status(401).json(new ApiError(401, "Unauthorized request"))
        }
    
         const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
         const ngouser = await NGO.findById(decodedToken?._id).select("-password -refreshToken")
    
         if(!ngouser) {
            return res.status(401).json(  new ApiError(401, "Invalid Access Token"))
         }
    
         req.ngouser = ngouser;
         next()
    } catch (error) {
        return res.status(401).json( new ApiError(401, error?.message || "Invalid access token"))
    }
}) 