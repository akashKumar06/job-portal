import { ErrorHandler } from "../middlewares/error.middleware.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

async function postApplication(req, res, next) {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;
    const isAlreadyApplied = await Application.findone({
      applicantId: userId,
      jobId: jobId,
    });
    if (isAlreadyApplied) {
      return next(
        new ErrorHandler("You have already applied to this job.", 400)
      );
    }
    const job = await Job.findById(jobId);
    const application = await Application.create({
      applicantId: userId,
      createdBy: job.createdBy,
      jobId,
    });
    return res.status(200).json({
      message: "Job applied successfully.",
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
}

async function getApplications(req, res, next) {
  try {
    const role = req.user.role;
    if (role === "Job Seeker") {
      const applications = await Application.find({
        applicantId: req.user._id,
      }).populate("jobId");
      return res.status(200).json({
        success: true,
        applications,
      });
    }

    if (role === "Employer") {
      const applications = await Application.find({
        createdBy: req.user._id,
      }).populate("applicantId");
      return res.status(200).json({
        success: true,
        applications,
        user: req.user,
      });
    }

    return next(new ErrorHandler("Role did not match.", 400));
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    const status = req.body.status;
    const applicationId = req.params.id;
    const application = await Application.findByIdAndUpdate(
      applicationId,
      {
        $set: { status },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
}
async function deleteApplication(req, res, next) {
  try {
    const applicationId = req.params.id;
    await Application.findByIdAndDelete(applicationId);
    return res.status(200).json({
      message: "Application withdrawn successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
}
export { postApplication, getApplications, updateStatus, deleteApplication };
