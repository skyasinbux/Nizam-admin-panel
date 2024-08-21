import React,{ useState, useEffect }  from 'react'
import "./Dashboard.css"
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [cartHistory, setCartHistory] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [todayOrdersCount, setTodayOrders] = useState(0);
  const [last30DaysOrdersCount, setLast30DaysOrdersCount] = useState(0);
  const [discount, setDiscounts] = useState(0);
  const [recentOrders, setRecentOrders] = useState(0);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/discount/list`);
      setDiscounts(response.data); // The response is now an array of discounts
    } catch (error) {
      toast.error('Error fetching discount list');
    }

  };
  useEffect(() => {
    fetchList();
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCartHistory = async () => {
      try {
        const response = await axios.get(`${url}/api/cart/cartlist`)
        console.log(response.data); // Log the response to check it
        if (response.data.success) {
          setCartHistory(response.data.carts);
          setTotalRecords(response.data.totalRecords);
          setTodayOrders(response.data.todayOrdersCount);
          setLast30DaysOrdersCount(response.data.last30DaysOrdersCount);
          setRecentOrders(response.data.recentOrders);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching cart history');
      }
    };

    fetchCartHistory();
  }, []);
  
  return (
    <div>
<button className="ui-btn">
  <span>
  Time: {time.toLocaleTimeString()}

  </span>
</button>


<div className='row'>

    <div className="outer">
      <div className="dot"></div>
      <div className="card">
        <div className="ray"></div>
        <div className="text">{todayOrdersCount}</div>
        <div>Today Orders</div>
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
   </div>

   <div className="outer">
      <div className="dot"></div>
      <div className="card">
        <div className="ray"></div>
        <div className="text">{last30DaysOrdersCount}</div>
        <div>Orders in last 30 days</div>
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
   </div>

   <div className="outer">
      <div className="dot"></div>
      <div className="card">
        <div className="ray"></div>
        <div className="text">{totalRecords}</div>
        <div>Total Orders</div>
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
   </div>

   <div className="outer">
      <div className="dot"></div>
      <div className="card">
        <div className="ray"></div>
        <div className="text">{discount}%</div>
        <div>Discount Applied! <Link className='discount_change' to="discount">Change?</Link></div>
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
   </div>
</div>
{/* card table */}
<div className="table_card">
  <div className="card__border"></div>
  <div className="card_title__container">


  </div>

  

</div>

</div>

  )
}

export default Dashboard
