import { useEffect, useState } from "react";
import "./List.css"; // Ensure this CSS file exists and is correctly named
import { url, currency } from "../../assets/assets"; // Ensure these exports exist
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);


   useEffect(() => {
    fetchList(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]); // Depend on itemsPerPage as well

  const fetchList = async (page, limit) => {
    try {
      const response = await axios.get(`${url}/api/food/list?page=${page}&limit=${limit}`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error("An error occurred");
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
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list after removal
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error('Error removing food:', error);
      toast.error("An error occurred");
    }
  };

  const toggleVisibility = async (id, visible) => {
    try {
      await axios.patch(`${url}/api/food/list/visible/${id}`, { visible }); // Use dynamic URL variable
      setList(list.map(item =>
        item._id === id ? { ...item, visible } : item
      ));
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="list add flex-col">
      <h2 className="list-head">All Items List</h2>

    <input placeholder="Search here..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}

     className="styled-input" type="text" />

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
          <b>Show/Hide</b>
          <b>Action</b>
          <b>Visible</b>
          <b>Saved At</b>

        </div>
        {filteredList.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt="" />
            <p className="bold_item">{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <button onClick={() => removeFood(item._id)} className="remove_btn"><span className="text">Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
            </button>

            <label className="switch">
              <input type="checkbox" checked={item.visible} onChange={() => toggleVisibility(item._id, !item.visible)} />
              <span className="slider"></span>
            </label>
            <Link className="Edit_item" to={`/edititem/${item._id}`}>EDIT</Link>

            <p>{item.visible ? 'Item Visible' : 'Item hidden'}</p>
            <p>{new Date(item.createdAt).toLocaleString()}</p>

          </div>
        ))}
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

export default List;
