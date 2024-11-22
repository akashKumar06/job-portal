import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadJobs } from "../store/slices/jobSlice";
import Spinner from "./Spinner";
import { FaSearch } from "react-icons/fa";
import jobsService from "../services/apiJobs";
import { useNavigate } from "react-router-dom";
import applicationService from "../services/apiApplication";
import { apply, loadApplications } from "../store/slices/applicationSlice";
import { applyJob, loadJobsApplied } from "../store/slices/userSlice";
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

function Jobs() {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState();

  const { jobs } = useSelector((state) => state.jobs);
  const { user, jobsApplied } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    jobsService
      .fetchAllJobs(city, niche, keyword)
      .then((data) => {
        dispatch(loadJobs(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [city, niche, user]);

  function handleSearch() {
    jobsService
      .fetchAllJobs(city, niche, keyword)
      .then((data) => {
        dispatch(loadJobs(data));
      })
      .catch((err) => console.log(err));
  }

  if (loading) return <Spinner />;
  return (
    <section className="jobs">
      <div className="search-tab-wrapper">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Find Job</button>
        <FaSearch />
      </div>
      <div className="wrapper">
        <div className="filter-bar">
          <div className="cities">
            <h2>Filter job by city</h2>
            {cities.map((city, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="city"
                  id={city}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor={city}>{city}</label>
              </div>
            ))}
          </div>
          <div className="cities">
            <h2>Filter job by niche</h2>
            {niches.map((niche, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="niche"
                  id={niche}
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
                <label htmlFor={niche}>{niche}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="mobile-filter">
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Filter by city</option>
              {cities.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
            </select>
            <select value={city} onChange={(e) => setNiche(e.target.value)}>
              <option value="">Filter by niche</option>
              {niches.map((niche, index) => (
                <option key={index}>{niche}</option>
              ))}
            </select>
          </div>
          <div className="jobs_container">
            {jobs &&
              jobs.map((job) => {
                return (
                  <div className="card" key={job._id}>
                    {job.hiringMultipleCandidates === "Yes" ? (
                      <p className="hiring-multiple">
                        Hiring multiple candidates
                      </p>
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
                      <button
                        className="btn"
                        onClick={() =>
                          navigate(`/posts/application/${job._id}`)
                        }
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Jobs;
