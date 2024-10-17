import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  refreshToken: String,
}, { timestamps: true });

// Pre-save middleware to hash the password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
adminSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate access token
adminSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id, role: 'admin' }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

// Generate refresh token
adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id, role: 'admin' }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const Admin = mongoose.model('Admin', adminSchema);
