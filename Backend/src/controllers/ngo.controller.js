import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { NGO } from "../models/ngo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (ngoId) => {
  try {
    const ngoUser = await NGO.findById(ngoId);
    // if (!ngoUser) {
    //   throw new ApiError(404, "NGO User not found");
    // }

    // Generate access and refresh tokens
    const accessToken = ngoUser.generateAccessToken();
    const refreshToken = ngoUser.generateRefreshToken();

    // Save refresh token to the database
    ngoUser.refreshToken = refreshToken;
    await ngoUser.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    // Handle the error without using res
    throw new ApiError(500, "Error generating tokens: " + error.message);
  }
};

const registerNGOUser = asyncHandler(async (req, res) => {
  const { name, email, contact, registration, password } = req.body;
  console.log(req.body);

  // Check if any field is missing or empty
  if (
    [name, email, registration, password].some((field) => !field?.trim())
  ) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const existingNGOUser = await NGO.findOne({
    $or: [{ email }, { contact }, { registration }],
  });

  if (existingNGOUser) {
    return res
      .status(409)
      .json(
        new ApiError(
          409,
          "NGO with provided Email, Contact, or Registration number already exists"
        )
      );
  }

  // let imagefile;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.imageUrl) &&
  //   req.files.imageUrl.length > 0
  // ) {
  //   imagefile = req.files.imageUrl[0].path;
  // }
  
  // const imagefileupload = await uploadOnCloudinary(imagefile);

  const ngoUser = await NGO.create({
    name,
    email,
    contact,
    registration,
    password,
    imageUrl: imagefileupload?.url || "",
  });

  const createdNGOUser = await NGO.findById(ngoUser._id).select(
    "-password -refreshToken"
  );

  if (!createdNGOUser) {
    return res
      .status(409)
      .json(
        new ApiError(409, "Something went wrong while registering NGO user")
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdNGOUser, "NGO User registered successfully")
    );
});


const loginNGOUser = asyncHandler(async (req, res) => {
  const { email, registration, password } = req.body;

  if (!(email || registration)) {
    return res
      .status(400)
      .json(new ApiError(400, "Email or Registration number required"));
  }

  const ngoUser = await NGO.findOne({
    $or: [{ email }, { registration }],
  });

  if (!ngoUser) {
    return res.status(400).json(new ApiError(400, "NGO User does not exist"));
  }

  const isPasswordValid = await ngoUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid NGO credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    ngoUser._id
  );

  const loggedInNGOUser = await NGO.findById(ngoUser._id).select(
    "-password -refreshToken"
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
        { ngouser: loggedInNGOUser, accessToken, refreshToken },
        "NGO User logged in successfully"
      )
    );
});

const logoutNGOUser = asyncHandler(async (req, res) => {
  await NGO.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: undefined },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "NGO User logged out successfully"));
});

const refreshNGOAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json(new ApiError(401, "Unauthorized request"));
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const ngoUser = await NGO.findById(decodedToken?._id);

    if (!ngoUser || incomingRefreshToken !== ngoUser?.refreshToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid or expired refresh token"));
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(ngoUser._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid refresh token"));
  }
});

const getCurrentNGOUser = asyncHandler(async (req, res) => {
  console.log(req.ngouser);
  return res
    .status(200)
    .json(new ApiResponse(200, req.ngouser, "NGO User fetched successfully"));
});

export {
  registerNGOUser,
  loginNGOUser,
  logoutNGOUser,
  refreshNGOAccessToken,
  getCurrentNGOUser,
};
