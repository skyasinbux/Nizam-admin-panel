import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPopup.css";
import { assets, url } from "../../assets/assets";
import PropTypes from "prop-types";
import NumberPanel from "../NumberPanel/NumberPanel";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin, onLoginSuccess }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${url}/api/admin/login`, {
        userId,
        password,
      });
      console.log("Login response:", response.data); // Debug API response
      if (response.data.success) {


        onLoginSuccess(response.data); // Pass the entire response data

        navigate("/"); // Redirect to Home page after successful login



      } else {

        toast.error(response.data.message);

      }
    } catch (error) {

      toast.error("Error logging in:",error);

    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>Admin Login</h2>
          {/* <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          /> */}
        </div>
        <div className="login-popup-inputs">
          <input
            type="text"
            placeholder="User-Id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <NumberPanel onChange={setPassword} />
        </div>
        <button onClick={handleLogin}>Login</button>
        <Link to="forget-password">Forget Password?</Link>

      </div>
    </div>
  );
};

LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginPopup;
