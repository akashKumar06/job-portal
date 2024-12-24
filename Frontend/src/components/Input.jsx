import { forwardRef } from "react";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const Input = forwardRef(({ id }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <input type={showPassword ? "text" : "password"} id={id} ref={ref} />
      {!showPassword ? (
        <FaRegEyeSlash
          className="eye_icon"
          onClick={(e) => setShowPassword((show) => !show)}
        />
      ) : (
        <FaEye
          className="eye_icon"
          onClick={(e) => setShowPassword((show) => !show)}
        />
      )}
    </>
  );
});
export default Input;
