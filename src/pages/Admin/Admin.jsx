import { useState, useEffect } from "react";
import "./Admin.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const admin = () => {

  const [data, setData] = useState({
    userId: "",
    email: "",
    password: "",
  });
  const [adminList, setadminList] = useState([]);

  useEffect(() => {
    fetchadmin();
  }, []);

  const fetchadmin = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/list`);
      if (response.data.success) {
        setadminList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching admin");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

   

    if (data.password.length !== 4 || isNaN(data.password)) {
      toast.error("Password must be a 4-digit number");
      return;
    }

    const formData = new FormData();
    
    formData.append("userId", data.userId);
    formData.append("password", data.password);
    formData.append("email", data.email);


    try {
      const response = await axios.post(`${url}/api/admin/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          
          userId: "",
          email: "",
          password: "",
        });

        fetchadmin(); // Refresh the admin list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding admin");
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
        <h1>Add New Admin</h1>
        

        
        
        <div className="add-product-name flex-col">
          <p>User ID</p>
          <input
            name="userId"
            onChange={onChangeHandler}
            value={data.userId}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Email</p>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Password (4-digit)</p>
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Type here"
            required
          />
        </div>
       
       
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>


      
    </div>
  );
};

export default admin;
