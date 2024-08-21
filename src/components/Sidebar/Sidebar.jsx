import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";




const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option">
          <MdDashboard/>
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <IoIosAddCircle/>
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <FaListUl/>
          <p>List Items</p>
        </NavLink>
        <NavLink to="/weekly" className="sidebar-option">
        <IoIosAddCircle/>
          <p>Weekly Special</p>
        </NavLink>
        <NavLink to="/weeklylist" className="sidebar-option">
        <FaListUl/>
          <p>Weekly List</p>
        </NavLink>
        <NavLink to="/admin-list" className="sidebar-option">
          <BsPeopleFill/>
          <p>Admin</p>
        </NavLink>
        <NavLink to="/orderslist" className="sidebar-option">
        <FaListUl/>
          <p>Order List</p>
        </NavLink>
        <NavLink to="/discount" className="sidebar-option">
        <IoIosAddCircle/>
          <p>Discounts</p>
        </NavLink>
        <NavLink to="/discountlist" className="sidebar-option">
        <FaListUl/>
          <p>Discount list</p>
        </NavLink>
        <NavLink to="/category" className="sidebar-option">
        <IoIosAddCircle/>
          <p>Category</p>
        </NavLink>
        <NavLink to="/categorylist" className="sidebar-option">
        <FaListUl/>
          <p>Category list</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
