import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Volunteer } from "../models/volunteer.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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

// Example function where trimming is being done
const sanitizeField = (field) => {
  return typeof field === "string" ? field.trim() : field;
};

// Update registration code to use sanitizeField function
const registerVolunteer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
      city,
      state,
      zipCode,
      emergencyContact,
      governmentId,
      idType,
      previousVolunteer,
      criminalRecord,
      skills,
      availability,
    } = req.body;
    const volunteer = await User.findById(user);
    if (!volunteer) {
      return next(new ApiError(404, "Volunteer not found"));
    }
    // Use sanitizeField to safely trim strings
    const volunteerData = {
      firstName: sanitizeField(firstName),
      lastName: sanitizeField(lastName),
      email: sanitizeField(email),
      phone: sanitizeField(phone),
      dateOfBirth,
      address: sanitizeField(address),
      city: sanitizeField(city),
      state: sanitizeField(state),
      zipCode: sanitizeField(zipCode),
      emergencyContact: {
        name: sanitizeField(emergencyContact?.name),
        relationship: sanitizeField(emergencyContact?.relationship),
        phone: sanitizeField(emergencyContact?.phone),
      },
      governmentId: sanitizeField(governmentId),
      idType,
      previousVolunteer,
      criminalRecord,
      skills: skills?.map(sanitizeField),
      availability,
    };

    // Save volunteer data to database
    const newVolunteer = new Volunteer(volunteerData);
    await newVolunteer.save();
    try {
      await sendOtpVerificationEmail(newVolunteer, res);
    } catch (error) {
      // If email sending fails, consider deleting the user or retrying
      await Volunteer.findByIdAndDelete(newVolunteer._id);
      return next(new ApiError(500, "Failed to send verification email"));
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while registering the volunteer",
      error: error.message,
    });
  }
};

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
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address. This OTP expires in 1 hour.</p>`,
    };

    const saltrounds = 10;
    const hashedOtp = await bcrypt.hash(otp, saltrounds);
    const newUserOtpVerification = new UserOtpVerification({
      userId: _id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour from now
    });

    await newUserOtpVerification.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: "Pending",
      message: "Verification OTP email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // Check if userId or otp is missing
    if (!userId || !otp) {
      return res
        .status(400)
        .json(new ApiError(400, "OTP details are required"));
    }

    // Find user OTP verification record
    const userOtpRecord = await UserOtpVerification.findOne({ userId });

    // If no record is found or already verified
    if (!userOtpRecord) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid or already verified account"));
    }

    const { expiresAt, otp: hashedOtp } = userOtpRecord;

    // Check if the OTP has expired
    if (expiresAt < Date.now()) {
      await UserOtpVerification.deleteMany({ userId });
      return res
        .status(400)
        .json(new ApiError(400, "OTP expired. Please request a new one."));
    }

    // Compare the provided OTP with the hashed OTP
    const validOtp = await bcrypt.compare(otp, hashedOtp);

    // If the OTP is invalid
    if (!validOtp) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid OTP. Please check your inbox."));
    }

    // If OTP is valid, update volunteer verification status and delete OTP records
    await Volunteer.updateOne({ _id: userId }, { emailverified: true });
    await UserOtpVerification.deleteMany({ userId });

    res.status(200).json({
      status: "VERIFIED",
      message: "Volunteer email verified successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const resendOtpVerificationCode = async (req, res) => {
  try {
    const { userId, email } = req.body;

    // Check if userId and email are provided
    if (!userId || !email) {
      return res
        .status(400)
        .json(new ApiError(400, "User details are required"));
    }

    // Delete any existing OTP verification records for the user
    await UserOtpVerification.deleteMany({ userId });

    // Send a new OTP verification email
    await sendOtpVerificationEmail({ _id: userId, email }, res);
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const loginVolunteer = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ApiError(400, "Email and password are required"));
  }

  // Find the volunteer by email
  const volunteer = await Volunteer.findOne({ email });
  if (!volunteer) {
    return next(new ApiError(401, "Invalid credentials"));
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, volunteer.password);
  if (!isMatch) {
    return next(new ApiError(401, "Invalid credentials"));
  }

  // Check if the email is verified
  if (!volunteer.verified || !volunteer.emailverified) {
    return next(
      new ApiError(401, "Volunteer not verified or email not verified")
    );
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    volunteer._id
  );

  res.status(200).json({
    status: "Success",
    message: "Login successful",
    data: {
      accessToken,
      refreshToken,
      volunteer: {
        _id: volunteer._id,
        email: volunteer.email,
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
      },
    },
  });
});

const getAllVolunteers = asyncHandler(async (req, res, next) => {
  const volunteers = await Volunteer.find();

  res.status(200).json({
    status: "Success",
    data: volunteers,
  });
});

const updateVolunteer = asyncHandler(async (req, res, next) => {
  const { userId } = req.params; // Assume userId is passed as a URL parameter
  const updateData = req.body;

  // Find the volunteer by ID and update
  const updatedVolunteer = await Volunteer.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedVolunteer) {
    return next(new ApiError(404, "Volunteer not found"));
  }

  res.status(200).json({
    status: "Success",
    message: "Volunteer updated successfully",
    data: updatedVolunteer,
  });
});

const getMe = asyncHandler(async (req, res, next) => {
  // const { userId } = req.user; // Assume userId is set in the request object after authentication middleware

  // const volunteer = await Volunteer.findById(userId);
  // if (!volunteer) {
  //   return next(new ApiError(404, "Volunteer not found"));
  // }

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const getVolunteersByStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.query;

  // Validate the status parameter
  if (
    !status ||
    !["pending", "approved", "rejected"].includes(status.toLowerCase())
  ) {
    return next(new ApiError(400, "Invalid or missing status parameter"));
  }

  // Find volunteers with the matching status
  const volunteers = await Volunteer.find({ status: status.toLowerCase() });

  // Check if any volunteers were found
  if (!volunteers || volunteers.length === 0) {
    return next(
      new ApiError(404, "No volunteers found with the specified status")
    );
  }

  // Return the volunteers
  res.status(200).json({
    status: "Success",
    data: volunteers,
  });
});

const updateVolunteerStatus = async (req, res) => {
  const { volunteerId } = req.params; // Get the volunteer ID from the route parameters
  const { status } = req.body; // Get the new status from the request body

  // Validate status
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const volunteer = await Volunteer.findById(volunteerId);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found." });
    }

    // Update volunteer status
    volunteer.status = status;

    await volunteer.save(); // Save the changes

    return res.status(200).json({
      message: "Volunteer status updated successfully.",
      data: volunteer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export {
  registerVolunteer,
  getMe,
  updateVolunteer,
  loginVolunteer,
  updateVolunteerStatus,
  getAllVolunteers,
  getVolunteersByStatus,
  verifyOtp,
  resendOtpVerificationCode,
  sendOtpVerificationEmail,
};
