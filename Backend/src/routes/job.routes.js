import express from "express";
import { isAuthorized, verifyJWT } from "../middlewares/auth.middleware.js";
import {
  postJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
  getJob,
} from "../controllers/job.controller.js";
const router = express.Router();

router.route("/").get(getAllJobs);
router.route("/post").post(verifyJWT, isAuthorized("Employer"), postJob);
router.route("/myJobs").get(verifyJWT, isAuthorized("Employer"), getMyJobs);
router
  .route("/delete/:id")
  .delete(verifyJWT, isAuthorized("Employer"), deleteJob);
router.route("/:id").get(verifyJWT, getJob);
export default router;
