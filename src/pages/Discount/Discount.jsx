import { useState } from "react";
import "./Discount.css";
import {  url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Discount = () => {

  const [data, setData] = useState({
    discount: "",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

   

    const formData = new FormData();

    formData.append("discount", Number(data.discount));

    const response = await axios.post(`${url}/api/discount/discount`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({

        discount: "",

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
            <p>Add Discount</p>
            <input
              type="Number"
              name="discount"
              onChange={onChangeHandler}
              value={data.discount}
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

export default Discount;
