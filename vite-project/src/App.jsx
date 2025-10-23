import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/Order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OurStory from "./pages/OurStory";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import BulkOrders from "./pages/BulkOrders";
import AllProducts from "./pages/allproducts/AllProducts";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bulk-orders" element={<BulkOrders />} />
          {/* No need to navigate from Dashboard to ProductInfo anymore */}
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/*" element={<NoPage />} />

          {/* Protected Routes (user only) */}
          <Route
            path="/order"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />

          {/* Admin Only Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutesForAdmin>
                <Dashboard />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoutesForAdmin>
                <AddProduct />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRoutesForAdmin>
                <UpdateProduct />
              </ProtectedRoutesForAdmin>
            }
          />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;

/* ---------------- Protected Routes ---------------- */

// For logged-in users
export const ProtectedRoutes = ({ children }) => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

// For admin only
export const ProtectedRoutesForAdmin = ({ children }) => {
  const storedUser = sessionStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const admin = JSON.parse(storedUser);
  const email = admin?.email || admin?.user?.email; // unified check

  if (email === "kaurkraftshop@gmail.com") {
    return children;
  } else {
    return <Navigate to="/" replace />; // non-admins go to homepage
  }
};
