import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareYoutube,
} from "react-icons/fa6";
function Footer() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <footer>
        <div>
          <div>
            <img src="/logo.png" alt="logo" />
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Block No. 12, Bangru, Simdega</li>
              <li>bangru@gmail.com</li>
              <li>+91 9045673495</li>
            </ul>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {user && (
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to="/">
                <span>
                  <FaSquareXTwitter />
                </span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span>
                  <FaSquareYoutube />
                </span>
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span>
                  <FaLinkedin />
                </span>
                <span>Linkedin</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span>
                  <FaInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; Copyright 2024. All rights reserved by bangru
      </div>
    </>
  );
}

export default Footer;
