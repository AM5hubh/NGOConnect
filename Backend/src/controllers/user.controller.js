import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Volunteer } from "../models/volunteer.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import UserOtpVerification from "../models/user.otpverification.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullname, email, username, password } = req.body;

  // Validate input fields
  if (![fullname, email, username, password].every((field) => field?.trim())) {
    return next(new ApiError(400, "All fields are required"));
  }

  // Check if the user already exists by username or email
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return next(new ApiError(409, "User with Username or Email already exists"));
  }

  // Create a new user
  const user = new User({
    fullname,
    email,
    password, // Make sure to hash the password before saving
    username,
  });

  // Save the user to the database
  const savedUser = await user.save();

  // Send OTP verification email
  try {
    await sendOtpVerificationEmail(savedUser,res);
  } catch (error) {
    // If email sending fails, consider deleting the user or retrying
    await User.findByIdAndDelete(savedUser._id);
    return next(new ApiError(500, "Failed to send verification email"));
  }

  // Retrieve the created user without sensitive fields
  // const createdUser = await User.findById(savedUser._id).select("-password -refreshToken");
  // if (!createdUser) {
  //   return next(new ApiError(500, "Something went wrong while registering the user"));
  // }

  // // Send success response
  // return res
  //   .status(201)
  //   .json(new ApiResponse(201, createdUser, "User registered successfully"));
});


const loginUser = asyncHandler(async (req, res) => {
  //req body -> data
  //username or email
  //find user
  //password check
  //access and refresh token generation
  //send to cookies

  const { email, username, password } = req.body;

  if (!(username || email)) {
    return res
      .status(400)
      .json(new ApiError(400, "Username or email required"));
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  const volunteer = await Volunteer.findOne({ email });
  if (!user) {
    return res.status(400).json(new ApiError(400, "User does not exist"));
  }

  const isPasswordvalid = await user.isPasswordCorrect(password);

  if (!isPasswordvalid) {
    return res.status(401).json(new ApiError(401, "Invalid user credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  //send to cookies
  const loggedInUser = await User.findById(user._id).select(
    "-password -refeshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          volunteer: volunteer,
          accessToken,
          refreshToken,
        },
        "User Logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newrefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // console.log(req.user)
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}, '-password -refreshToken'); // Fetch all users from the database, excluding password and refresh token
  return res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
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
    let { userId, otp } = req.body;

    // Check if userId or otp is missing
    if (!userId || !otp) {
      return res
        .status(400)
        .json(new ApiError(400, "Empty OTP details are not allowed"));
    }

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
    const validOtp = await bcrypt.compare(otp, hashedOtp);

    // If the OTP is invalid
    if (!validOtp) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid code passed. Check your inbox."));
    }

    // If the OTP is valid, update user verification status and delete OTP records
    await User.updateOne({ _id: userId }, { verified: true });
    await UserOtpVerification.deleteMany({ userId });

    res.json({
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

const resendOtpVerificationCode = async (req, res) => {
  try {
    let { userId, email } = req.body;
    if (!userId || !email) {
      return res.status(400).json(new ApiError(400, "Empty user details are not allowed"));
    }
    else {
      await UserOtpVerification.deleteMany({ userId });
      sendOtpVerificationEmail({ _id: userId, email }, res)
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    })
  }
}

const verifyUser = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user by ID and update the verified status
    const user = await User.findByIdAndUpdate(
      userId,
      { verified: true }, // Set verified to true
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  getAllUser,
  verifyUser,
  verifyOtp,
  resendOtpVerificationCode,
  sendOtpVerificationEmail
};
