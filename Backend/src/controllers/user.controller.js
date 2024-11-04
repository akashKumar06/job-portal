import { ErrorHandler } from "../middlewares/error.middleware.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendToken } from "../utils/jwtToken.js";

async function registerUser(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      address,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverletter,
      password,
      role,
    } = req.body;

    if (
      [name, email, phone, address, password, role].some(
        (field) => field?.trim() === ""
      )
    ) {
      return next(new ErrorHandler("All field are required", 400));
    }

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(new ErrorHandler("Please provide niches.", 400));
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const resumeLocalPath = req.files?.resume?.[0]?.path;
    if (!avatarLocalPath || !resumeLocalPath) {
      return next(new ErrorHandler("Please upload avatar and resume.", 400));
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const resume = await uploadOnCloudinary(resumeLocalPath);

    if (!avatar || !resume) {
      return next(new ErrorHandler("Failed to upload on cloud.", 500));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }

    const userData = {
      name,
      email,
      phone,
      address,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverletter,
      password,
      role,
      avatar: {
        publicId: avatar.public_id,
        url: avatar.url,
      },
      resume: {
        publicId: resume.public_id,
        url: resume.url,
      },
    };

    const user = await User.create(userData);
    sendToken(user, 201, res, "User registered successdully");
  } catch (error) {
    return next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { role, email, password } = req.body;
    if (!role || !email || !password) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("Invalid credentials.", 400));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid credentials.", 400));
    }

    if (role !== user.role) {
      return next(new ErrorHandler("User role does not match.", 400));
    }
    sendToken(user, 200, res, "User logged in successfully.");
  } catch (error) {
    return next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).clearCookie("token", options).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).select("-password");
    if (!user) return next(new ErrorHandler("User does not exists.", 400));
    return res.status(200).json({ user, success: true });
  } catch (error) {
    next(error);
  }
}
export { registerUser, loginUser, logoutUser, getUser };
