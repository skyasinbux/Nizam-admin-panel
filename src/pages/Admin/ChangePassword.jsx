import { useState } from "react";
import "./ChangePassword.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [data, setData] = useState({
    userId: "",
    currentPassword: "",
    newPassword: "",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Basic validation for new password
    if (data.newPassword.length !== 4 || isNaN(data.newPassword)) {
        toast.error("Password must be a 4-digit number");
        return;
      }

    try {
      const response = await axios.post(`${url}/api/admin/changepassword`, {
        userId: data.userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });

      toast.success(response.data.message);
      setData({
        userId: "",
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
        setData({
            userId: "",
            currentPassword: "",
            newPassword: "",
          });
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Error changing password");
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <h1>Change Your Password</h1>

        <div className="add-product-name  flex-col">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            name="userId"
            onChange={onChangeHandler}
            value={data.userId}
            type="text"
            placeholder="Enter User ID"
            required
          />
        </div>

        <div className="add-product-name  flex-col">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            id="currentPassword"
            name="currentPassword"
            onChange={onChangeHandler}
            value={data.currentPassword}
            type="password"
            placeholder="Enter Current Password"
            required
          />
        </div>

        <div className="add-product-name  flex-col">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            onChange={onChangeHandler}
            value={data.newPassword}
            type="password"
            placeholder="Enter New Password"
            required
          />
        </div>

        <button type="submit" className="add-btn">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
