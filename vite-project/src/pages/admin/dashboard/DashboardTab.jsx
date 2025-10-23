import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";
import Layout from "../../../components/layout/Layout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

function DashboardTab() {
  const context = useContext(myContext);
  const { mode, product, edithandle, deleteProduct, order, user } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // 🔹 Add navigate

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

  // 🔹 Selected product view
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

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
              <img
                src={selectedProduct.imageUrl || "/placeholder.png"}
                alt={selectedProduct.title || "Product"}
                className="w-full h-64 md:h-96 object-cover rounded-2xl"
              />
            </div>

            <div className="md:ml-10 mt-4 md:mt-0 w-full md:w-1/2">
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
                {selectedProduct.description || "No description available."}
              </p>
              <h2 className="text-xl font-semibold mb-2">
                ₹{selectedProduct.price || "-"}
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

  // 🔹 Default Dashboard Tabs
  return (
    <div>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0}>
            <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12]"
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
                  className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <AiFillShopping /> Order
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>

            {/* Product Tab */}
            <TabPanel>
              <div className="px-4 md:px-0 mb-16">
                <h1
                  className="text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Product Details
                </h1>
                <div className="flex justify-end mb-4">
                  <div onClick={goToAdd}>
                    <button
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
                </div>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                      className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <tr>
                        <th className="px-6 py-3">S.No</th>
                        <th className="px-6 py-3">Image</th>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    {product.map((item, index) => {
                      const { title, price, imageUrl, category, date } = item;
                      return (
                        <tbody key={item.id || index}>
                          <tr
                            className="bg-gray-50 border-b dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            style={{
                              backgroundColor:
                                mode === "dark" ? "rgb(46 49 55)" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                            onClick={() => navigate(`/productinfo/${item.id}`)} // 🔹 Updated
                          >
                            <td className="px-6 py-4">{index + 1}.</td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap"
                            >
                              <div className="w-20 h-20 overflow-hidden rounded-2xl">
                                <img
                                  className="w-full h-full object-cover"
                                  src={imageUrl || "/placeholder.png"}
                                  alt={title || "Product"}
                                />
                              </div>
                            </th>
                            <td className="px-6 py-4">{title}</td>
                            <td className="px-6 py-4">₹{price}</td>
                            <td className="px-6 py-4">{category}</td>
                            <td className="px-6 py-4">{date}</td>
                            <td className="px-6 py-4">
                              <div
                                className="flex gap-2 cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div onClick={() => deleteProduct(item)}>
                                  {/* delete icon */}
                                </div>
                                <div>
                                  <Link
                                    to={"/updateproduct"}
                                    onClick={() => edithandle(item)}
                                  >
                                    {/* edit icon */}
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </TabPanel>

            {/* Order Tab */}
            <TabPanel>{/* unchanged code */}</TabPanel>

            {/* User Tab */}
            <TabPanel>{/* unchanged code */}</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default DashboardTab;
