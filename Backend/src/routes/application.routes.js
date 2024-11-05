import express from "express";
import { isAuthorized, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  postApplication,
  getApplications,
  updateStatus,
  deleteApplication,
} from "../controllers/application.controller.js";
const router = express.Router();

router.route("/").get(verifyJWT, getApplications);
router
  .route("/delete/:id")
  .delete(verifyJWT, isAuthorized("Job Seeker"), deleteApplication);
router
  .route("/apply/:id")
  .post(verifyJWT, isAuthorized("Job Seeker"), postApplication);
router
  .route("/update/:id")
  .post(verifyJWT, isAuthorized("Employer"), updateStatus);
export default router;
