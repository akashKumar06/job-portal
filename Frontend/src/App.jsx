import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import userService from "./services/apiUser";
import { login } from "./store/slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProfile from "./components/MyProfile";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import MyJobs from "./components/MyJobs";
import Applications from "./components/Applications";
import MyApplications from "./components/MyApplications";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    userService
      .getUser()
      .then((data) => {
        dispatch(login(data));
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index path="my-profile" element={<MyProfile />} />
          <Route index path="update-profile" element={<UpdateProfile />} />
          <Route index path="update-password" element={<UpdatePassword />} />
          <Route index path="my-jobs" element={<MyJobs />} />
          <Route index path="applications" element={<Applications />} />
          <Route index path="my-applications" element={<MyApplications />} />
        </Route>
        <Route path="/posts/application/:id" element={<PostApplication />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" theme="dark" />
    </BrowserRouter>
  );
}

export default App;
