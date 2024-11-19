import {
  FaAddressBook,
  FaPencilAlt,
  FaPhoneAlt,
  FaRegUser,
} from "react-icons/fa";
import { MdCategory, MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiLock2Fill } from "react-icons/ri";
import { useRef, useState } from "react";
import userService from "../services/apiUser";

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

function Register() {
  const [user, setUser] = useState({});
  const [resume, setResume] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const avatarRef = useRef();
  const resumeRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    for (const key in user) {
      data.append(key, user[key]);
    }
    data.append("resume", resume);
    data.append("avatar", avatar);
    setIsLoading(true);
    setError("");
    userService
      .register(data)
      .then((data) => {
        // load the data to store
        console.log(data);
        setIsLoading(false);
        setUser({});
        setResume(null);
        setAvatar(null);
        avatarRef.current.value = null;
        resumeRef.current.value = null;
      })
      .catch((err) => setError(err.message));
  }

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">Create a new account</div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="registerAs">Register As</label>
              <div>
                <select
                  name="role"
                  id="registerAs"
                  value={user?.role || ""}
                  onChange={(e) =>
                    setUser((user) => ({ ...user, role: e.target.value }))
                  }
                >
                  <option value="">Select</option>
                  <option value="Employer">Register as an Employer</option>
                  <option value="Job Seeker">Register as a Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label htmlFor="name">Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={user?.name || ""}
                  onChange={(e) =>
                    setUser((user) => ({ ...user, name: e.target.value }))
                  }
                />
                <FaPencilAlt />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="email">Email Address</label>
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={user?.email || ""}
                  onChange={(e) =>
                    setUser((user) => ({ ...user, email: e.target.value }))
                  }
                />
                <MdMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label htmlFor="phone">Phone No.</label>
              <div>
                <input
                  id="phone"
                  type="text"
                  placeholder="1212-111-111"
                  value={user?.phone || ""}
                  onChange={(e) =>
                    setUser((user) => ({ ...user, phone: e.target.value }))
                  }
                />
                <FaPhoneAlt />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="address">Address</label>
              <div>
                <input
                  id="address"
                  type="text"
                  placeholder="address"
                  value={user?.address || ""}
                  onChange={(e) =>
                    setUser((user) => ({ ...user, address: e.target.value }))
                  }
                />
                <FaAddressBook />
              </div>
            </div>
            <div className="inputTag">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Your Password"
                  value={user?.password || ""}
                  onChange={(e) =>
                    setUser((user) => ({ ...user, password: e.target.value }))
                  }
                />
                <RiLock2Fill />
              </div>
            </div>
          </div>
          {user?.role === "Job Seeker" && (
            <>
              <div className="wrapper">
                <div className="inputTag">
                  <label htmlFor="firstNiche">Your first niche</label>
                  <div>
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
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label htmlFor="secondNiche">Your second niche</label>
                  <div>
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
                    <MdCategory />
                  </div>
                </div>
                <div className="inputTag">
                  <label htmlFor="thirdNiche">Your third niche</label>
                  <div>
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
                    <MdCategory />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="coverletter">Cover letter</label>
              <div>
                <textarea
                  rows={10}
                  value={user?.coverLetter || ""}
                  onChange={(e) =>
                    setUser((user) => ({
                      ...user,
                      coverLetter: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="resume">Resume</label>
              <div>
                <input
                  ref={resumeRef}
                  type="file"
                  name="resume"
                  id="resume"
                  style={{ border: "none" }}
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="avatar">Avatar</label>
              <div>
                <input
                  ref={avatarRef}
                  type="file"
                  name="avatar"
                  id="avatar"
                  style={{ border: "none" }}
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </button>
          <Link to="/login">Login Now</Link>
        </form>
      </div>
    </section>
  );
}

export default Register;
