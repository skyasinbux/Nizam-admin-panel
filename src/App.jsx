import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes,Navigate } from "react-router-dom";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Add from "./pages/Add/Add";
import List from "./pages/Add/List";
import EditItem from "./pages/Add/Edit";
import Weekly from "./pages/Weekly_Special/Weekly";
import WeeklyList from "./pages/Weekly_Special/WeeklyList";
import Admin from "./pages/Admin/Admin";
import AdminList from "./pages/Admin/AdminList";
import OrderList from "./pages/Order Received/OrdersList";
import Discount from "./pages/Discount/Discount";
import DiscountList from "./pages/Discount/DiscountList";
import Category from "./pages/Category/Category";
import CategoryList from "./pages/Category/CategoryList";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./pages/Admin/ForgetPassword";
import ResetPassword from "./pages/Admin/ResetPassword";
import ChangePassword from "./pages/Admin/ChangePassword";




const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setUser] = useState(null);

  

  const handleLoginSuccess = (responseData) => {
    console.log("User data:", responseData); // Debug response data
    setIsLoggedIn(true);
    setShowLogin(false);
    // The responseData should be the object that includes the token
    localStorage.setItem("token", responseData.token); // Save the token in local storage for persistence
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    setShowLogin(true); // Ensure login popup is shown on logout
  };

  return (
    <>
       

    <ToastContainer />
      {showLogin && !isLoggedIn && (
        <LoginPopup
          onLoginSuccess={handleLoginSuccess}
          setShowLogin={setShowLogin}
        />
      )}

    <div className="app">
      <ToastContainer />
      <Navbar handleLogout={handleLogout} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <Add /> : <Navigate to="/" />}
          />
          <Route
            path="/list"
            element={isLoggedIn ? <List /> : <Navigate to="/" />}
          />
          <Route
            path="/edititem/:id"
            element={isLoggedIn ? <EditItem /> : <Navigate to="/" />}
          />
          <Route
            path="/admin"
            element={isLoggedIn ? <Admin /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-list"
            element={isLoggedIn ? <AdminList /> : <Navigate to="/" />}
          />
          <Route
            path="/changepassword"
            element={isLoggedIn ? <ChangePassword /> : <Navigate to="/" />}
          />
          <Route
            path="/weekly"
            element={isLoggedIn ? <Weekly /> : <Navigate to="/" />}
          />
          <Route
            path="/weeklylist"
            element={isLoggedIn ? <WeeklyList /> : <Navigate to="/" />}
          />
          
          <Route
            path="/orderslist"
            element={isLoggedIn ? <OrderList /> : <Navigate to="/" />}
          />

          <Route
            path="/discount"
            element={isLoggedIn ? <Discount /> : <Navigate to="/" />}
          />
          <Route
            path="/discountlist"
            element={isLoggedIn ? <DiscountList /> : <Navigate to="/" />}
          />
          <Route
            path="/category"
            element={isLoggedIn ? <Category /> : <Navigate to="/" />}
          />
          <Route
            path="/categorylist"
            element={isLoggedIn ? <CategoryList /> : <Navigate to="/" />}
          />
          <Route
            path="/forget-password"
            element={<ForgetPassword /> }
          />
          <Route
            path="/resetpassword/:token"
            element={<ResetPassword />}
          />
          
          

        </Routes>
      </div>
    </div>
    </>
  );
};

export default App;
