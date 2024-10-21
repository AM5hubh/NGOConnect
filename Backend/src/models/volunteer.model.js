import mongoose, { Schema } from "mongoose";

// volunteerModel.js
const volunteerSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContact: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      relationship: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },
    governmentId: {
      type: String,
      required: true,
      trim: true,
    },
    idType: {
      type: String,
      required: true,
      enum: ["driver_license", "state_id", "passport"],
    },
    previousVolunteer: {
      type: Boolean,
      default: false,
    },
    criminalRecord: {
      type: Boolean,
      default: false,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    availability: {
      weekdays: Boolean,
      weekends: Boolean,
      mornings: Boolean,
      afternoons: Boolean,
      evenings: Boolean,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    emailverified: {type: Boolean},
  },
  {
    timestamps: true,
  }
);

export const Volunteer = mongoose.model("Volunteer", volunteerSchema);
