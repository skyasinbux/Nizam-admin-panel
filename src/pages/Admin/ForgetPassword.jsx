import { useState} from "react";
import "./Admin.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post(`${url}/api/admin/forgetPassword`, { email });

          toast.success(response.data.message);
          setEmail(" ");
      } catch (error) {
          toast.error(error.response?.data?.message || 'Something went wrong');
          setEmail(" ");

      }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <h1>Forget Password</h1>
        <div className="add-product-name flex-col">
          <p>Email</p>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Type here"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          SEND
        </button>
        <Link to="/">BACK</Link>
      </form>      
    </div>
  );
};

export default ForgetPassword;
