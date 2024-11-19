import { useState } from "react";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
function Navbar() {
  const [show, setShow] = useState();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h4>My JOBS</h4>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to="/" onClick={() => setShow(!show)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => setShow(!show)}>
                Jobs
              </Link>
            </li>
            {user ? (
              <li>
                <Link to="/dashboard" onClick={() => setShow(!show)}>
                  Dashboard
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={() => setShow(!show)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburgur" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
}

export default Navbar;
