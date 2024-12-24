import { useRef, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import Input from "./Input";
import userService from "../services/apiUser";
import { toast } from "react-toastify";
function UpdatePassword() {
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  function handleUpdatePassword(e) {
    const newData = {
      oldPassword: currentPassword.current.value,
      newPassword: newPassword.current.value,
      confirmPassword: confirmPassword.current.value,
    };
    userService
      .updatePassword(newData)
      .then((data) => {
        console.log(data);
        toast(data.message);
      })
      .catch((err) => toast(err.message));
  }

  return (
    <div className="account_components update_password_component">
      <h3>Update Password</h3>
      <div>
        <label htmlFor="current-password">Current Password</label>
        <Input id="current-password" ref={currentPassword} />
      </div>
      <div>
        <label htmlFor="new-password">New Password</label>
        <Input id="new-password" ref={newPassword} />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <Input id="confirm-password" ref={confirmPassword} />
      </div>
      <div className="save_change_btn_wrapper">
        <button className="btn" onClick={handleUpdatePassword}>
          Update Password
        </button>
      </div>
    </div>
  );
}

export default UpdatePassword;
