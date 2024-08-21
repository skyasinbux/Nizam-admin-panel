// EditItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";

import "./Edit.css";
import { url } from '../../assets/assets';

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState({
    name: '',
    price: '',
  });

 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setList(prevItem => ({
      ...prevItem,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/api/food/list/edit/${id}`, list);
      toast.success("Item Updated Successfully");

      navigate('/list'); // Redirect to admin panel or another page after updating
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };

  return (
<>
    <Link className='back' to="/list">
    <IoMdArrowRoundBack/>
    </Link>
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={handleChange}
            value={list.name}
            type="text"
            placeholder="Type new name"
            required
          />
        </div>        
          <div className="add-product-name flex-col">
            <p>Product Price</p>
            <input
              type="Number"
              name="price"
              onChange={handleChange}
              value={list.price}
              placeholder="Type new amount"
            />

        </div>
        <button type="submit" className="add-btn">
          UPDATE
        </button>
      </form>
    </div>
</>
  );
}

export default EditItem;


