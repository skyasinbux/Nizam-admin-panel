import { useEffect, useState } from "react";
import "./OrdersList.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const OrderList = () => {

  const [cartHistory, setCartHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchCartHistory = async () => {
      try {
        const response = await axios.get(`${url}/api/cart/cartlist`, {
          params: {
            page: page + 1,
            limit: rowsPerPage
          }
        });
        console.log(response.data); // Log the response to check it
        if (response.data.success) {
          setCartHistory(response.data.carts);
          setTotalRecords(response.data.totalRecords);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching cart history');
      }
    };

    fetchCartHistory();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="list add">
      <div className="cart-history">
        <h2 className="order-list-head">Order List</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Discount Amount</TableCell>
                <TableCell>Final Price</TableCell>
                <TableCell>Cus Name</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Saved At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartHistory.map((cart, index) => (
                <TableRow key={index}>
                  <TableCell>{cart.order.map(item => `${item.food} (${item.quantity})`).join(', ')}</TableCell>
                  <TableCell>OMR {cart.total}</TableCell>
                  <TableCell>OMR {cart.discount}</TableCell>
                  <TableCell>OMR {cart.finalPrice}</TableCell>
                  <TableCell>{cart.customerName}</TableCell>
                  <TableCell>{cart.phoneNumber}</TableCell>
                  <TableCell>{cart.deliveryAddress}</TableCell>
                  <TableCell>{new Date(cart.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]} // Adjusted rows per page options
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default OrderList;
