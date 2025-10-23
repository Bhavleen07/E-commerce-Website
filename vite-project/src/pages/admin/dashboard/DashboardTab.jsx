import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";
import Layout from "../../../components/layout/Layout";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

function DashboardTab() {
  const context = useContext(myContext);
  const { mode, product, edithandle, deleteProduct, order, user } = context;

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const closeModal = () => setSelectedProduct(null);
  const goToAdd = () => (window.location.href = "/addproduct");

  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(fireDB, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // 🔹 Inline product detail view (like Allproducts)
  if (selectedProduct) {
    return (
      <Layout>
        <div className="container mx-auto px-5 py-10">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black px-4 py-2 rounded mb-5"
          >
            ← Back to Products
          </button>

          <div className="flex flex-col md:flex-row items-center">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              className="rounded-2xl w-full md:w-1/2 object-cover"
            />
            <div className="md:ml-10 mt-6 md:mt-0">
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {selectedProduct.title}
              </h1>
              <p
                className="text-gray-600 mb-4"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {selectedProduct.description}
              </p>
              <h2 className="text-xl font-semibold mb-2">
                ₹{selectedProduct.price}
              </h2>
              <button
                type="button"
                onClick={() => addCart(selectedProduct)}
                className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 🔹 Dashboard Tabs Default View
  return (
    <div>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0}>
            <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12]"
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />
                    Products
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500 hover:shadow-pink-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center"
                >
                  <div className="flex gap-2 items-center">
                    <AiFillShopping /> Order
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center"
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>

            {/* ✅ Product Tab (Updated Layout) */}
            <TabPanel>
              <div className="px-4 md:px-0 mb-16">
                <h1
                  className="text-center mb-8 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  All Featured Products
                </h1>

                <div className="flex justify-end mb-6">
                  <button
                    onClick={goToAdd}
                    type="button"
                    className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      Add Product <FaCartPlus size={20} />
                    </div>
                  </button>
                </div>

                {/* 🔹 Product Grid Layout (2 per row like Allproducts.jsx) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.map((item, index) => (
                    <div
                      key={item.id || index}
                      onClick={() => setSelectedProduct(item)}
                      className="cursor-pointer bg-white dark:bg-gray-800 border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-56 object-cover"
                      />
                      <div className="p-4">
                        <h2
                          className="text-lg font-semibold"
                          style={{
                            color: mode === "dark" ? "white" : "black",
                          }}
                        >
                          {item.title}
                        </h2>
                        <p
                          className="text-gray-600 mb-2"
                          style={{
                            color: mode === "dark" ? "#d1d5db" : "#4b5563",
                          }}
                        >
                          ₹{item.price}
                        </p>

                        <div className="flex justify-between items-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProduct(item);
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                          <Link
                            to={"/updateproduct"}
                            onClick={(e) => {
                              e.stopPropagation();
                              edithandle(item);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* 🔹 Order Tab (unchanged) */}
            <TabPanel>{/* ... existing order tab content ... */}</TabPanel>

            {/* 🔹 User Tab (unchanged) */}
            <TabPanel>{/* ... existing user tab content ... */}</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default DashboardTab;
