import { useEffect, useState } from "react";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCash } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import jobsService from "../services/apiJobs";
import { useDispatch, useSelector } from "react-redux";
import { loadJob } from "../store/slices/jobSlice";
import Spinner from "./Spinner";
import applicationService from "../services/apiApplication";
import { Bounce, toast } from "react-toastify";

function PostApplication() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { job } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState({});
  const [isApplicationLoading, setIsApplicationLoading] = useState(false);
  const [resume, setResume] = useState(null);

  function handleSubmit() {
    const formData = new FormData();
    const newApplication = {
      name: application.name,
      email: application.email,
      address: application.address,
      phone: application.phone,
      coverLetter: application.coverLetter,
    };

    for (const key in newApplication) {
      formData.append(key, newApplication[key]);
    }

    formData.append("resume", resume);
    setIsApplicationLoading(true);
    applicationService
      .applyJob(formData, id)
      .then((data) => {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setIsApplicationLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setIsApplicationLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    setApplication(() => ({ ...user }));
    jobsService
      .fetchJobById(id)
      .then((data) => {
        dispatch(loadJob(data));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id, user]);

  let qualifications, offerings, responsibilities;
  if (job.offers) {
    offerings = job.offers.split(". ");
  }
  if (job.responsibilities) {
    responsibilities = job.responsibilities.split(".");
  }
  if (job.qualifications) {
    qualifications = job.qualifications.split(".");
  }

  if (loading) return <Spinner />;
  return (
    <article className="application_page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>Application form</h3>
        <div>
          <label htmlFor="title">Job Titlte</label>
          <input
            value={application.title || ""}
            onChange={(e) =>
              setApplication((application) => ({
                ...application,
                title: e.target.value,
              }))
            }
            type="text"
            placeholder={job.title}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            value={application?.name || ""}
            onChange={(e) =>
              setApplication((application) => ({
                ...application,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            value={application?.email || ""}
            onChange={(e) =>
              setApplication((application) => ({
                ...application,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            value={application?.phone || ""}
            onChange={(e) =>
              setApplication((application) => ({
                ...application,
                phone: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={application?.address || ""}
            onChange={(e) =>
              setApplication((application) => ({
                ...application,
                address: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            name="coverLetter"
            id="coverLetter"
            rows={10}
            value={application?.coverLetter || ""}
            onChange={(e) =>
              setApplication((application) => ({
                ...application,
                coverLetter: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor="resume">Resume</label>
          <input
            type="file"
            onChange={(e) => {
              setResume(() => e.target.files[0]);
            }}
          />
        </div>
        <div style={{ alignItems: "flex-end" }}>
          <button type="submit" className="btn" disabled={isApplicationLoading}>
            Apply
          </button>
        </div>
      </form>
      <div className="job-details">
        <header>
          <h3>{job.title}</h3>
          {job.personelWebsite && (
            <Link to={job.personelWebsite.url}>
              {job.personelWebsite.title}
            </Link>
          )}
          <p>{job.location}</p>
          <p>{job.salary} a month</p>
        </header>
        <hr />
        <section>
          <div className="wrapper">
            <h3>Job Details</h3>
            <div>
              <IoMdCash />
              <div>
                <span>Pay</span>
                <span>{job.salary} a month</span>
              </div>
            </div>
            <div>
              <FaToolbox />
              <div>
                <span>Job type</span>
                <span>{job.jobType}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Location</h3>
            <div className="location-wrapper">
              <FaLocationDot />
              <span>{job.location}</span>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Full Job Description</h3>
            <p>{job.introduction}</p>
            {job.qualifications && (
              <div>
                <h4>Qualifications</h4>
                <ul>
                  {qualifications.map((el) => (
                    <li key={el} style={{ listStyle: "inside" }}>
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {job.responsibilities && (
              <div>
                <h4>Responsibilities</h4>
                <ul>
                  {responsibilities.map((el) => (
                    <li key={el} style={{ listStyle: "inside" }}>
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {job.offers && (
              <div>
                <h4>Offering</h4>
                <ul>
                  {offerings.map((el) => (
                    <li key={el} style={{ listStyle: "inside" }}>
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <hr />
        <footer>
          <h3>Job Niche</h3>
          <p>{job.jobNiche}</p>
        </footer>
      </div>
    </article>
  );
}

export default PostApplication;
