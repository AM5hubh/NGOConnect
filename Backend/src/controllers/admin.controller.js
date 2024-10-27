  import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
import UserOtpVerification from "../models/user.otpverification.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  // Check if admin already exists
  const existedAdmin = await Admin.findOne({ email });
  if (existedAdmin) {
    return res
      .status(409)
      .json(new ApiError(409, "Admin with this email already exists"));
  }

  // Create a new Admin
  const admin = new Admin({ name, email, password, verified: false });
  const savedAdmin = await admin.save();

  sendOtpVerificationEmail(savedAdmin, res); // Send OTP for verification
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for email and password in the request body
  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Email and password are required"));
  }

  // Restrict login to a specific email
  const allowedEmail = "ssahamate2020@gmail.com";
  if (email !== allowedEmail) {
    return res
      .status(403)
      .json(
        new ApiError(403, "Unauthorized: Access is allowed only for admin only")
      );
  }

  // Find the admin by the provided email
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json(new ApiError(400, "Admin does not exist"));
  }

  // Check if the admin account is verified
  if (!admin.verified) {
    return res
      .status(403)
      .json(
        new ApiError(403, "Admin is not verified. Please verify your account.")
      );
  }

  // Validate the password
  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  // Generate OTP
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
  );

  // Send OTP verification email
  await sendOtpVerificationEmail(admin, res);

  // Respond with a message indicating that an OTP has been sent
  res.status(200).json({
    message: "OTP has been sent to your email. Please verify to log in.",
    admin,
    accessToken,
    refreshToken,
  });
});

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(req.admin._id, { refreshToken: undefined });

  res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Admin logged out successfully" });
});

const sendOtpVerificationEmail = async ({ _id, email }, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready for messages");
      console.log(success);
    }
  });

  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify you email address and complete<p>this otp expires in 1 Hour</p></p>`,
    };
    const saltrounds = 10;
    const hashedOtp = await bcrypt.hash(otp, saltrounds);
    const newUserOtpVerification = new UserOtpVerification({
      userId: _id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newUserOtpVerification.save();
    await transporter.sendMail(mailOptions);
    res.json({
      status: "Pending",
      message: "Verification otp email sent",
      date: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let { userId,email, otp } = req.body;

    // Check if userId or otp is missing
    if (!userId || !otp) {
      return res
        .status(400)
        .json(new ApiError(400, "Empty OTP details are not allowed"));
    }
    const admin = await Admin.findOne({ email });
    // Find user OTP verification record
    const userOtpRecord = await UserOtpVerification.findOne({ userId });

    // Check if no record is found or the record is already verified
    if (!userOtpRecord) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Account records do not exist or have already been verified. Please sign up or log in."
          )
        );
    }

    const { expiresAt, otp: hashedOtp } = userOtpRecord;

    // Check if the OTP has expired
    if (expiresAt < Date.now()) {
      await UserOtpVerification.deleteMany({ userId });
      return res
        .status(400)
        .json(new ApiError(400, "Code has expired. Please request again."));
    }

    // Compare the provided OTP with the hashed OTP
    const validOtp = bcrypt.compare(otp, hashedOtp);

    // If the OTP is invalid
    if (!validOtp) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid code passed. Check your inbox."));
    }

    // If the OTP is valid, update user verification status and delete OTP records
    await Admin.updateOne({ _id: userId }, { verified: true });
    await UserOtpVerification.deleteMany({ userId });

    res.json({
      admin,
      status: "VERIFIED",
      message: `User email verified successfully.`,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { email, userId, otp } = req.body;

  // Check if userId or otp is missing
  if (!userId || !otp) {
    return res
      .status(400)
      .json(new ApiError(400, "Empty OTP details are not allowed"));
  }

  // Find user OTP verification record
  const userOtpRecord = await UserOtpVerification.findOne({ userId });
  const admin = await Admin.findOne({ email });

  // Check if no record is found or the record is already verified
  if (!userOtpRecord) {
    return res
      .status(400)
      .json(new ApiError(400, "No OTP record found. Please log in again."));
  }

  const { expiresAt, otp: hashedOtp } = userOtpRecord;

  // Check if the OTP has expired
  if (expiresAt < Date.now()) {
    await UserOtpVerification.deleteMany({ userId });
    return res
      .status(400)
      .json(new ApiError(400, "OTP has expired. Please request a new one."));
  }

  // Compare the provided OTP with the hashed OTP
  const validOtp = bcrypt.compare(otp, hashedOtp);
  // If the OTP is invalid
  if (!validOtp) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid OTP. Please check your inbox."));
  }

  // If the OTP is valid, log the admin in by generating tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    userId
  );

  // Clear OTP record
  await UserOtpVerification.deleteMany({ userId });
  // Set cookies and send response
  res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .json({
      admin,
      message: "Admin logged in successfully",
      accessToken,
      refreshToken,
    });
});

const resendOtpVerificationCode = async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) {
      return res
        .status(400)
        .json(new ApiError(400, "Empty user details are not allowed"));
    } else {
      await UserOtpVerification.deleteMany({ userId });
      sendOtpVerificationEmail({ _id: userId, email }, res);
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const getCurrentAdmin = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.admin, "User fetched successfully"));
});

export {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  sendOtpVerificationEmail,
  verifyOtp,
  resendOtpVerificationCode,
  verifyLoginOtp,
  getCurrentAdmin
};
