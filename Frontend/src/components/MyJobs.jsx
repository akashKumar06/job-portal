import { useEffect, useState } from "react";
import jobsService from "../services/apiJobs";
import Spinner from "../pages/Spinner";
import { toast } from "react-toastify";
function MyJobs() {
  const [myJobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    jobsService
      .fetchAllJobs()
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  function handleDeleteJob(id) {
    console.log(id);
    jobsService
      .deleteJob(id)
      .then((data) => {
        const newJobs = myJobs.filter((job) => job._id !== id);
        setJobs(newJobs);
        toast(data.message);
      })
      .catch((err) => toast(err.message));
  }
  if (isLoading) return <Spinner />;
  if (myJobs?.length === 0)
    <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
      You have not posted any job!
    </h1>;
  return (
    <div className="account_components">
      <div className="applications_container">
        <h3>My Jobs</h3>
        <div className="applications_container">
          {myJobs.map((job) => (
            <div className="card" key={job._id}>
              <p className="sub-sec">
                <span>Job Title: </span>
                {job.title}
              </p>
              <p className="sub-sec">
                <span>Job Niche: </span>
                {job.jobNiche}
              </p>
              <p className="sub-sec">
                <span>Salary: </span>
                {job.salary}
              </p>
              <p className="sub-sec">
                <span>Location: </span>
                {job.location}
              </p>
              <p className="sub-sec">
                <span>Job Type: </span>
                {job.jobType}
              </p>
              <p className="sub-sec">
                <span>Company Name: </span>
                {job.companyName}
              </p>
              <p className="sub-sec">
                <span>Introduction: </span>
                {job.introduction}
              </p>
              <p className="sub-sec">
                <span>Qualifications: </span>
                {job.qualifications}
              </p>
              <p className="sub-sec">
                <span>Responsibilities: </span>
                {job.responsibilities}
              </p>
              {job.offers && (
                <p className="sub-sec">
                  <span>What we are offering: </span> {job.offers}
                </p>
              )}
              <button className="btn" onClick={() => handleDeleteJob(job._id)}>
                Delete Job
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyJobs;
