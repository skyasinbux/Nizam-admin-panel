import { useState, useEffect } from "react";
import "./AdminList.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from "react-router-dom";



const admin = () => {
  const [adminList, setadminList] = useState([]);
  
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
  useEffect(() => {
    fetchadmin();
  }, []);



  return (

    <div className="list add">
        <p>Admin List</p>
        <div className="list-table">
          <div className="list-table-format title">
            
            <b>User ID</b>

            <b>Change Password</b>

          </div>
          {adminList.map((admin, index) => (
            <div key={index} className="list-table-format">

              <p>{admin.userId}</p>
              <Link to="/changepassword">Change Password</Link>

              




            </div>
          ))}
        </div>
      </div>

  );
};

export default admin;

