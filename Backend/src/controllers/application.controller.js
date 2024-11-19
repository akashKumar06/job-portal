import { ErrorHandler } from "../middlewares/error.middleware.js";
import { Application } from "../models/application.model.js";
import Job from "../models/job.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const postApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;
    if (!name || !email || !phone || !address || !coverLetter) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    const jobSeekerInfo = {
      id: req.user._id,
      name,
      email,
      phone,
      address,
      coverLetter,
      role: "Job Seeker",
    };

    const jobDetails = await Job.findById(id);

    if (!jobDetails) {
      return next(new ErrorHandler("Job not found.", 404));
    }

    const isAlreadyApplied = await Application.findOne({
      "jobInfo.jobId": id,
      "jobSeekerInfo.id": req.user._id,
    });
    if (isAlreadyApplied) {
      return next(
        new ErrorHandler("You have already applied for this job.", 400)
      );
    }

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      console.log(cloudinaryRes);
      jobSeekerInfo.resume = {
        url: cloudinaryRes.url,
        public_id: cloudinaryRes.public_id,
      };
    }

    const employerInfo = {
      id: jobDetails.createdBy,
      role: "Employer",
    };
    const jobInfo = {
      jobId: id,
      jobTitle: jobDetails.title,
    };

    const application = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });
    return res.status(201).json({
      success: true,
      message: "Application submitted.",
      application,
    });
  } catch (error) {
    next(error);
  }
};

export const employerGetAllApplication = async (req, res, next) => {
  const { _id } = req.user;
  const applications = await Application.find({
    "employerInfo.id": _id,
    "deletedBy.employer": false,
  });
  res.status(200).json({
    success: true,
    applications,
  });
};

export const jobSeekerGetAllApplication = async (req, res, next) => {
  const { _id } = req.user;
  const applications = await Application.find({
    "jobSeekerInfo.id": _id,
    "deletedBy.jobSeeker": false,
  });
  res.status(200).json({
    success: true,
    applications,
  });
};

export const deleteApplication = async (req, res, next) => {
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }
  const { role } = req.user;
  switch (role) {
    case "Job Seeker":
      application.deletedBy.jobSeeker = true;
      await application.save();
      break;
    case "Employer":
      application.deletedBy.employer = true;
      await application.save();
      break;

    default:
      console.log("Default case for application delete function.");
      break;
  }

  if (
    application.deletedBy.employer === true &&
    application.deletedBy.jobSeeker === true
  ) {
    await application.deleteOne();
  }
  res.status(200).json({
    success: true,
    message: "Application Deleted.",
  });
};
