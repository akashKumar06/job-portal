import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import applicationService from "../services/apiApplication";
import { toast } from "react-toastify";
import { loadApplications } from "../store/slices/applicationSlice";
import Spinner from "../pages/Spinner";

function Applications() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.application);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    applicationService
      .getApplications(user.role)
      .then((data) => {
        dispatch(loadApplications(data.applications));
        setIsLoading(false);
      })
      .catch((err) => {
        toast(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;
  if (applications && applications.length == 0) return <h1>No applications</h1>;
  return (
    <div className="account_components">
      <h3>Applications for your posted jobs</h3>
      <div className="applications_container">
        {applications &&
          applications.map((application) => (
            <div className="card" key={application._id}>
              <p className="sub-sec">
                <span>Job Title:</span>
                {application.jobInfo.jobTitle}
              </p>
              <p className="sub-sec">
                <span>Applicant's Name</span>
                {application.jobSeekerInfo.name}
              </p>
              <p className="sub-sec">
                <span>Applicant's Email</span>
                {application.jobSeekerInfo.email}
              </p>
              <p className="sub-sec">
                <span>Applicant's Phone</span>
                {application.jobSeekerInfo.phone}
              </p>
              <p className="sub-sec">
                <span>Applicant's Address</span>
                {application.jobSeekerInfo.address}
              </p>
              <p className="sub-sec">
                <span>Applicant's Cover Letter: </span>
                <textarea
                  name="coverLetter"
                  id="coverLetter"
                  rows={5}
                  value={application?.jobSeekerInfo?.coverLetter}
                  disabled
                ></textarea>
              </p>
              <div className="btn-wrapper">
                <button
                  className="outline_btn"
                  onClick={() => handleDeleteApplication(application._id)}
                >
                  Delete Application
                </button>
                <Link
                  to={application?.jobSeekerInfo?.resume?.url}
                  className="btn"
                  target="_blank"
                >
                  View Resume
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Applications;
