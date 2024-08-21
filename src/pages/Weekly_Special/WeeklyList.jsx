import { useEffect, useState } from "react";
import "./WeeklyList.css";
import { url, currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";



const WeeklyList = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);



  useEffect(() => {
    fetchList(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]); // Depend on itemsPerPage as well

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/weekly/weeklylist`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };


  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination controls
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/weekly/removeweekly`, {
      id: foodId,
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
    <div className="list add flex-col">
      <h2 className="list-head">All Weekly List</h2>

      <input placeholder="Search here..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
     className="styled-input" type="text" />

      <div className="list-table">
        <div className="list-table-format title">
          <b>Item Name</b>
          <b>Day</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {filteredList.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              
              <button onClick={() => removeFood(item._id)} className="remove_btn"><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
              </button>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeeklyList;
