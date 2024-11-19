import React from "react";

function Job({ job }) {
  return (
    <div className="card" key={job._id}>
      {job.hiringMultipleCandidates === "Yes" ? (
        <p className="hiring-multiple">Hiring multiple candidates</p>
      ) : (
        <p className="hiring">Hiring</p>
      )}
      <p className="title">{job.title}</p>
      <p className="company">{job.company}</p>
      <p className="location">{job.location}</p>
      <p className="salary">
        <span>Salary: </span>
        {job.salary}
      </p>
      <p className="posted">
        <span>Posted On: </span> {job.createdAt.substring(0, 10)}
      </p>
      <div className="btn-wrapper">
        {jobsApplied.includes(job._id) ? (
          <button className="btn" disabled={true}>
            Applied
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => handleApplyNow(job._id, job.createdBy)}
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}

export default Job;
