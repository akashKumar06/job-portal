import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must contain at least 3 characters."],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    niches: {
      firstNiche: String,
      secondNiche: String,
      thirdNiche: String,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must contain at least 8 characters."],
    },
    avatar: {
      type: String, // cloudinary url
      required: [true, "Please provide a profile picture."],
    },
    resume: {
      publicId: String,
      url: String, // cloudinary url
    },
    coverletter: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Job Seeker", "Employeer"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
