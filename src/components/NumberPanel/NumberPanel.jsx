import { useState } from "react";
import PropTypes from "prop-types";
import "./NumberPanel.css";


const NumberPanel = ({ onChange }) => {
  const [password, setPassword] = useState("");

  const handleButtonClick = (number) => {
    if (password.length < 4 && typeof number === "number") {
      const newPassword = password + number;
      setPassword(newPassword);
      onChange(newPassword);
    }
  };

  const handleEsc = () => {
    setPassword("");
    onChange("");
  };

  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, "ESC", 0];

  return (
    <div className="number-panel">
      <div className="number-display">
        {[...Array(4)].map((_, index) => (
          <span key={index} className="circle">
            {password[index] ? "●" : ""}
          </span>
        ))}
      </div>
      <div className="number-buttons">
        {buttons.map((value, index) => (
          <button
            key={index}
            onClick={() =>
              value === "ESC" ? handleEsc() : handleButtonClick(value)
            }
          >
            {value}
          </button>
        ))}
      </div>
      
    </div>
  );
};

NumberPanel.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default NumberPanel;
