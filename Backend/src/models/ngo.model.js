import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, //for search optimisation
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      index: true, //for search optimisation
    },
    registration: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true, //for search optimisation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    description: {
      type: String,
    },
    acheivements: {
      type: String,
    },
    sofname: {
      type: String,
    },
    website: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    imageUrl: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

export const NGO = mongoose.model("NGO", userSchema);
