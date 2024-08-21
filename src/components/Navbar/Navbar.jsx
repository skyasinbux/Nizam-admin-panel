import "./Navbar.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";



import { assets } from "../../assets/assets";

const Navbar = ({ handleLogout }) => {
  const [menu, setMenu] = useState("home");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = () => {
    setDropdownVisible(false);
  };


  return (
    <div className="navbar">
      <div>
      <img className="logo_en" src={assets.nizam_en} alt="" />
      <img className="logo_urdu" src={assets.nizam_urdu} alt="" />
      </div>
     
      <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`${menu === "home" ? "active" : ""}`}
        >
          
        </Link>
      

      

{/* dropdown */}


<div className="dropdown-container">
        <button className="menu-dropdown" onClick={toggleDropdown}>
          <img className="profile" src={assets.profile_image} alt="Profile" />
        </button>
        {dropdownVisible && (
          <div className="dropdown">
            <Link to="/admin" onClick={handleLinkClick}>
              Admin
            </Link>
            <Link to="/changepassword">Settings</Link>
            <Link to="/" onClick={handleLogout} >
            Logout
            </Link>
          </div>
        )}
      </div>
{/* dropdown */}

    </div>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;



