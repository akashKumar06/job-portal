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
import userService from "../services/apiUser";
import { toast } from "react-toastify";
import { logout } from "../store/slices/userSlice";
function Dashboard() {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  function handleLogout() {
    userService
      .logout()
      .then((data) => {
        dispatch(logout());
        toast(data.message);
        navigate("/");
      })
      .catch((err) => toast(err.message));
  }

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
              {user && user.role === "Employer" && (
                <li>
                  <NavLink to="new-job">Post New Job</NavLink>
                </li>
              )}
              {user && user.role === "Employer" && (
                <li>
                  <NavLink to="my-jobs">My Jobs</NavLink>
                </li>
              )}

              {user && user.role === "Employer" && (
                <li>
                  <NavLink to="applications">Applications</NavLink>
                </li>
              )}

              {user && user.role === "Job Seeker" && (
                <li>
                  <NavLink to="my-applications">My Applications</NavLink>
                </li>
              )}

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
