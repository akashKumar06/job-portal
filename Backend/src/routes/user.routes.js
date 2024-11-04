import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getUser);
router.route("/profile/update").put(
  verifyJWT,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);
router.route("/password/update").put(verifyJWT, updatePassword);
export default router;
