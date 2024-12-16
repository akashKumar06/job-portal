import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/apiUser";
import { login } from "../store/slices/userSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userService
      .getUser()
      .then((data) => {
        dispatch(login(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Heelo</h1>;
  return children;
}

export default ProtectedRoute;
