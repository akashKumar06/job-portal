import { ErrorHandler } from "../middlewares/error.middleware.js";
import Job from "../models/job.model.js";

async function postJob(req, res, next) {
  try {
    const {
      title,
      jobType,
      location,
      companyName,
      introduction,
      responsibilites,
      qualifications,
      offers,
      salary,
      hiringMultipleCandidates,
      websiteTitle,
      websiteUrl,
      jobNiche,
    } = req.body;

    if (
      [
        title,
        jobType,
        location,
        companyName,
        introduction,
        responsibilites,
        qualifications,
        salary,
        jobNiche,
      ].some((field) => field?.trim() === "")
    ) {
      next(new ErrorHandler("Please provide all the required details", 400));
    }

    if ((websiteTitle && !websiteUrl) || (!websiteTitle && websiteUrl)) {
      return next(
        new ErrorHandler(
          "Provide both website title and url or leave both",
          400
        )
      );
    }

    const createdBy = req.user._id;
    const job = await Job.create({
      title,
      jobType,
      location,
      companyName,
      introduction,
      responsibilites,
      qualifications,
      offers,
      salary,
      hiringMultipleCandidates,
      website: {
        title: websiteTitle,
        url: websiteUrl,
      },
      jobNiche,
      createdBy,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllJobs(req, res, next) {
  try {
    const { city, niche, keyword } = req.query;
    const query = {};
    if (city) {
      query.location = { $regex: city, $options: "i" };
    }
    if (niche) {
      query.jobNiche = { $regex: niche, $options: "i" };
    }
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { companyName: { $regex: keyword, $options: "i" } },
        { introduction: { $regex: keyword, $options: "i" } },
      ];
    }
    const allJobs = await Job.find(query);
    return res.status(200).json({
      success: true,
      jobs: allJobs,
      count: allJobs.length,
    });
  } catch (error) {
    next(error);
  }
}

async function getJob(req, res, next) {
  try {
    const jobId = req.params?.id;
    const job = await Job.findById(jobId);
    if (!job) return next(new ErrorHandler("Job not found", 400));
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
}

async function getMyJobs(req, res, next) {
  try {
    const userId = req.user._id;
    const jobs = await Job.find({ createdBy: userId });
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteJob(req, res, next) {
  try {
    const jobId = req.params._id;
    const job = Job.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("Oops Job not found.", 400));
    }
    await job.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export { postJob, getAllJobs, getJob, getMyJobs, deleteJob };
