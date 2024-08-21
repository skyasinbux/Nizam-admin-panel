import { useEffect, useState } from "react";
import "./DiscountList.css";
import { url, currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { RiDeleteBinFill } from "react-icons/ri";


const DiscountList = () => {
  const [discount, setDiscounts] = useState([]);


  const fetchList = async () => {
    const response = await axios.get(`${url}/api/discount/list2`);
    if (response.data.success) {
      setDiscounts(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  

  const removeDiscount = async (discountId) => {
    const response = await axios.post(`${url}/api/discount/removediscount`, {
      id: discountId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add">
      <h2 className="list-head">Discount List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Discount percentage</b>
          <b>Action</b>
        </div>
        {discount.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{item.discount}</p>
              
              <button onClick={() => removeDiscount(item._id)} className="remove_btn"><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscountList;
