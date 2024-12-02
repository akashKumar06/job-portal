import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
function UpdateProfile() {
  const { user: loggedInUser } = useSelector((state) => state.user);
  const [resumePreview, setResumePreview] = useState("");
  const [resume, setResume] = useState("");

  const [user, setUser] = useState(() => loggedInUser);

  function resumeHandler() {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload(() => {
      setResumePreview(reader.result);
      setResume(file);
    });
  }
  return (
    <div className="account_components">
      <h3>Update Profile</h3>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          onChange={(e) =>
            setUser((user) => ({ ...user, name: e.target.value }))
          }
          value={user.name}
        />
      </div>
      <div>
        <label htmlFor="address">Email Address</label>
        <input
          type="text"
          value={user.email}
          onChange={(e) =>
            setUser((user) => ({ ...user, email: e.target.value }))
          }
        />
      </div>
      {user.role === "Job Seeker" && (
        <div
          className={{ display: "flex", flexDirectio: "column", gap: "15px" }}
        >
          <label>My Preferred Job Niches</label>
          <select
            name="firstNiche"
            id="firstNiche"
            value={user?.firstNiche || ""}
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                firstNiche: e.target.value,
              }))
            }
          >
            {niches.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
          <select
            name="secondNiche"
            id="secondNiche"
            value={user?.secondNiche || ""}
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                secondNiche: e.target.value,
              }))
            }
          >
            {niches.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
          <select
            name="thirdNiche"
            id="thirdNiche"
            value={user?.thirdNiche || ""}
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                thirdNiche: e.target.value,
              }))
            }
          >
            {niches.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label>Phone Number</label>
        <input type="text" value={user.phone} />
      </div>
      <div>
        <label>Address</label>
        <input type="text" value={user.address} />
      </div>
      <div>
        <label>Upload Resume</label>
        <input type="file" onChange={resumeHandler} />
        {user && user.resume && (
          <div>
            <p>Current resume</p>
            <Link to={user.resume.url} target="_blank" className="view-resume">
              View Resume
            </Link>
          </div>
        )}
      </div>
      <div className="save_chage_btn_wrapper">
        <button className="btn">Save Changes</button>
      </div>
    </div>
  );
}

export default UpdateProfile;
