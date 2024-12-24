import { useReducer, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import jobsService from "../services/apiJobs";
import { toast } from "react-toastify";
const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
];

const niches = [
  "Web Development",
  "Mobile App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain Development",
  "Cloud Computing",
  "Internet of Things (IoT)",
  "Augmented Reality (AR) & Virtual Reality (VR)",
  "DevOps & Automation",
  "Big Data Analytics",
  "Software Testing & Quality Assurance",
  "Embedded Systems Development",
  "E-commerce Development",
  "Database Administration",
  "Backend Development",
  "Frontend Development",
  "API Development & Integration",
];

function reducer(state, action) {
  switch (action.type) {
    case "set-title":
      return { ...state, title: action.payload };
    case "set-jobType":
      return { ...state, jobType: action.payload };
    case "set-location":
      return { ...state, location: action.payload };
    case "set-companyName":
      return { ...state, companyName: action.payload };
    case "set-introduction":
      return { ...state, introduction: action.payload };
    case "set-responsibilities":
      return { ...state, responsibilities: action.payload };
    case "set-qualifications":
      return { ...state, qualifications: action.payload };
    case "set-offers":
      return { ...state, offers: action.payload };
    case "set-salary":
      return { ...state, salary: action.payload };
    case "set-hiringMultipleCandidates":
      return { ...state, hiringMultipleCandidates: action.payload };
    case "set-websiteUrl":
      return { ...state, websiteUrl: action.payload };
    case "set-websiteTitle":
      return { ...state, websiteTitle: action.payload };
    case "set-jobNiche":
      return { ...state, jobNiche: action.payload };
    default:
      return state;
  }
}

function JobPost() {
  const [job, dispatch] = useReducer(reducer, {});
  const [isLoading, setIsLoading] = useState(false);
  function handlePostJob() {
    setIsLoading(true);
    jobsService
      .postJob(job)
      .then((data) => {
        toast(data.message);
      })
      .catch((err) => {
        toast(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div className="account_components">
      <h3>Post a Job</h3>
      <div>
        <label htmlFor="">Title</label>
        <input
          type="text"
          placeholder="Job Title"
          value={job?.title}
          onChange={(e) =>
            dispatch({ type: "set-title", payload: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="">Job Type</label>
        <select
          value={job?.jobType}
          onChange={(e) =>
            dispatch({ type: "set-jobType", payload: e.target.value })
          }
        >
          <option value="">Select job type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Location (City)</label>
        <select
          name="location"
          id="location"
          value={job?.location}
          onChange={(e) =>
            dispatch({ type: "set-location", payload: e.target.value })
          }
        >
          <option value="">Select city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">Company Name</label>
        <input
          type="text"
          placeholder="Company Name"
          value={job?.companyName}
          onChange={(e) =>
            dispatch({ type: "set-companyName", payload: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="">Company/Job Introduction</label>
        <textarea
          placeholder="Company / Job Introduction"
          row={7}
          value={job?.introduction}
          onChange={(e) =>
            dispatch({ type: "set-introduction", payload: e.target.value })
          }
        ></textarea>
      </div>
      <div>
        <label htmlFor="">Responsibilities</label>
        <textarea
          placeholder="Job responsibilities"
          row={7}
          value={job?.responsibilities}
          onChange={(e) =>
            dispatch({ type: "set-responsibilities", payload: e.target.value })
          }
        ></textarea>
      </div>
      <div>
        <label htmlFor="">Qualifications</label>
        <textarea
          placeholder="Required qualification for job"
          row={7}
          value={job?.qualifications}
          onChange={(e) =>
            dispatch({ type: "set-qualifications", payload: e.target.value })
          }
        ></textarea>
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label htmlFor="">What we Offer</label>
          <span>
            <FaCircleInfo />
            Optional
          </span>
        </div>
        <textarea
          placeholder="What are we offering in return"
          row={7}
          value={job?.offers}
          onChange={(e) =>
            dispatch({ type: "set-offers", payload: e.target.value })
          }
        ></textarea>
      </div>
      <div>
        <label htmlFor="">Job Niche</label>
        <select
          name="niche"
          id="niche"
          value={job?.jobNiche}
          onChange={(e) =>
            dispatch({ type: "set-jobNiche", payload: e.target.value })
          }
        >
          <option value="">Select niche</option>
          {niches.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">Salary</label>
        <input
          type="text"
          placeholder="Salary"
          value={job?.salary}
          onChange={(e) =>
            dispatch({ type: "set-salary", payload: e.target.value })
          }
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label htmlFor="">Hiring Multiple Candidates?</label>
          <span>
            <FaCircleInfo />
            Optional
          </span>
        </div>
        <select
          name=""
          id=""
          value={job?.hiringMultipleCandidates}
          onChange={(e) =>
            dispatch({
              type: "set-hiringMultipleCandidates",
              payload: e.target.value,
            })
          }
        >
          <option value="">Hiring multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label htmlFor="">Personel website name</label>
          <span>
            <FaCircleInfo />
            Optional
          </span>
        </div>
        <input
          type="text"
          value={job?.websiteTitle}
          onChange={(e) =>
            dispatch({ type: "set-websiteTitle", payload: e.target.value })
          }
          placeholder="personel webiste name"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label htmlFor="">Personel website URL</label>
          <span>
            <FaCircleInfo />
            Optional
          </span>
        </div>
        <input
          type="text"
          value={job?.websiteUrl}
          onChange={(e) =>
            dispatch({ type: "set-websiteUrl", payload: e.target.value })
          }
          placeholder="personel webiste URL"
        />
      </div>
      <div>
        <button
          style={{ margin: "0 auto" }}
          className="btn"
          onClick={handlePostJob}
          disabled={isLoading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
}

export default JobPost;
