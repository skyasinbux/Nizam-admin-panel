import { useState } from "react";
import "./Weekly.css";
import {  url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Weekly = () => {

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "All",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

   

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    const response = await axios.post(`${url}/api/weekly/weekly`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        name: "",

        price: "",
        category: data.category,
      });

    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        
        
       
        <div className="add-product-name flex-col">
          
          <div className="add-price flex-col">
            <p>Choose day</p>
            <select name="category" required onChange={onChangeHandler}>
              <option value="">--Select Day--</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className="flex-col">
          <p>Item name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
          <div className="add-price flex-col">
            <p>Item Price</p>
            <input
              type="Number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="Type here"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Weekly;
