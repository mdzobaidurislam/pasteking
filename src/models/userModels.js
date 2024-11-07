import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  referral_code: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  monetization: {
    type: Boolean,
    default: false,
  },
  waiting_time: {
    type: Number,
    default: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date and time when a user is created
  },
  verifyToken: {
    type: String,
    default: null,
  },
  verifyTokenExpiry: {
    type: Date,
    default: null,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
