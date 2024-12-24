import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import applicationService from "../services/apiApplication";
import { Link } from "react-router-dom";
import {
  loadApplications,
  applicationDelete,
} from "../store/slices/applicationSlice";
import Spinner from "../pages/Spinner";
import { toast } from "react-toastify";

function MyApplications() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { applications } = useSelector((state) => state.application);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const role = user.role;
    setIsLoading(true);
    applicationService
      .getApplications(role)
      .then((data) => {
        dispatch(loadApplications(data.applications));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [dispatch]);

  function handleDeleteApplication(id) {
    applicationService
      .deleteApplication(id)
      .then((data) => {
        dispatch(applicationDelete(id));
        toast(data.message);
      })
      .catch((err) => toast(err.message));
  }
  if (isLoading) return <Spinner />;
  return (
    <>
      <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
        You have not applied for any job
      </h1>
      <div className="account_components">
        <h3>My Applications for jobs</h3>
        <div className="applications_container">
          {applications &&
            applications.map((application) => (
              <div className="card" key={application._id}>
                <p className="sub-sec">
                  <span>Job Title:</span>
                  {application.jobInfo.jobTitle}
                </p>
                <p className="sub-sec">
                  <span>Name</span>
                  {application.jobSeekerInfo.name}
                </p>
                <p className="sub-sec">
                  <span>Email</span>
                  {application.jobSeekerInfo.email}
                </p>
                <p className="sub-sec">
                  <span>Phone</span>
                  {application.jobSeekerInfo.phone}
                </p>
                <p className="sub-sec">
                  <span>Address</span>
                  {application.jobSeekerInfo.address}
                </p>
                <p className="sub-sec">
                  <span>Cover Letter: </span>
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
    </>
  );
}

export default MyApplications;
