import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import JobPost from "../components/JobPost";
import MyJobs from "../components/MyJobs";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";
function Dashboard() {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  function handleLogout() {}

  return (
    <>
      <section className="account">
        <div className="component_header">
          <p>Dashboard</p>
          <p>
            Welcome! <span>{user.name}</span>
          </p>
        </div>
        <div className="container">
          <div className={show ? "sidebar showSidebar" : "sidebar"}>
            <ul className="sidebar_links">
              <h4>Manage Account</h4>
              <li>
                <NavLink to="my-profile">My Profile</NavLink>
              </li>
              <li>
                <NavLink to="update-profile">Update Profile</NavLink>
              </li>
              <li>
                <NavLink to="update-password">Update Password</NavLink>
              </li>
              {
                /* if user is an employer */
                <li>
                  <NavLink to="job/new">Post New Job</NavLink>
                </li>
              }
              {
                /* if user is an employer */
                <li>
                  <NavLink to="my-jobs">My Jobs</NavLink>
                </li>
              }

              {
                /* if user is an employer */
                <li>
                  <NavLink to="applications">Applications</NavLink>
                </li>
              }

              {
                /* if user is job seeker */
                <li>
                  <NavLink to="my-applications">My Applications</NavLink>
                </li>
              }

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          <div className="banner">
            <div
              className={
                show ? "sidebar_icon move_right" : "sidebar_icon move_left"
              }
            >
              <LuMoveRight
                onClick={() => setShow((show) => !show)}
                className={show ? "left_arrow" : "right_arrow"}
              />
            </div>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
