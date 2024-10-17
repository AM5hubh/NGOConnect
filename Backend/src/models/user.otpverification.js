import mongoose,{Schema} from "mongoose";

const UserOtpVerificationSchema = new Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

const UserOtpVerification = mongoose.model(
    "UserOtpVerification",
    UserOtpVerificationSchema
)

export default UserOtpVerification;