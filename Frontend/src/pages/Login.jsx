import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();

    data.append("email", email);
    data.append("password", password);
    data.append("role", role);

    setError("");
    setLoading(true);
    userService
      .login(data)
      .then((data) => {
        setLoading(false);
        dispatch(login(data));
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.log(err.message);
      });
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <section className="authPage">
      <div className="container login-container">
        <div className="header">
          <h3>Login to your account</h3>
        </div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputTag">
            <label htmlFor="loginAs">Login as</label>
            <div>
              <select
                name="role"
                id="loginAs"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Employer">Login as an Employer</option>
                <option value="Job Seeker">Login as a Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="email">Email Address</label>
            <div>
              <input
                id="email"
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging In" : "Login"}
          </button>
          <Link to="/register">Register Now</Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
