import express from "express";
import { isAuthorized, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  postApplication,
  employerGetAllApplication,
  jobSeekerGetAllApplication,
  deleteApplication,
} from "../controllers/application.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.get(
  "/employer/getall",
  verifyJWT,
  isAuthorized("Employer"),
  employerGetAllApplication
);

router.get(
  "/jobseeker/getall",
  verifyJWT,
  isAuthorized("Job Seeker"),
  jobSeekerGetAllApplication
);
router
  .route("/delete/:id")
  .delete(verifyJWT, isAuthorized("Job Seeker"), deleteApplication);
router
  .route("/apply/:id")
  .post(
    upload.single("resume"),
    verifyJWT,
    isAuthorized("Job Seeker"),
    postApplication
  );

export default router;
