import { useState} from "react";
import "./ForgetPassword.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const {token} = useParams()


  const onSubmitHandler = async (event) => {
      event.preventDefault();

      if (password.length !== 4 || isNaN(password)) {
        toast.error("Password must be a 4-digit number");
        return;
      }

      try {
          const response = await axios.post(`${url}/api/admin/resetpassword/`+token, { password });

          toast.success(response.data.message);
          setPassword("");
      } catch (error) {
          toast.error(error.response?.data?.message || 'Something went wrong 1');
          setPassword("");

      }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <h1>Reset Your Password</h1>
        <div className="add-product-name flex-col">
          <p>Enter new password</p>
          <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Type here"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          SUBMIT
        </button>
      </form>      
    </div>
  );
};

export default ResetPassword;
