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
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import jsPDF from "jspdf";

function DashboardTab() {
  const context = useContext(myContext);
  const { mode, product, edithandle, deleteProduct, order, user } = context;

  const downloadInvoice = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("KaurKrafts Invoice", 20, 20);

  doc.setFontSize(12);
  doc.text(`Customer: ${order.userName}`, 20, 40);
  doc.text(`Status: ${order.status}`, 20, 50);

  let y = 70;

  order.cartItems.forEach((item, index) => {
    doc.text(`Product: ${item.title}`, 20, y);
    doc.text(`ID: ${item.id}`, 20, y + 10);
    doc.text(`Price: ₹${item.price}`, 20, y + 20);

    if (item.customization) {
      doc.text(`Name: ${item.customization.customerName}`, 20, y + 30);
      doc.text(`Text: ${item.customization.text}`, 20, y + 40);
      doc.text(`Date: ${item.customization.date}`, 20, y + 50);
    }

    y += 70;
  });

  doc.save(`invoice_${order.id}.pdf`);
  };
  
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

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
      toast.success(`Order updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // 🔹 Product View Page
  if (selectedProduct) {
    return (
      <Layout>
        <div className="container mx-auto px-5 py-10">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded mb-5"
          >
            ← Back
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={selectedProduct.imageUrl}
              className="w-full md:w-1/2 rounded"
              alt=""
            />

            <div>
              <h1 className="text-2xl font-bold">{selectedProduct.title}</h1>
              <p className="mt-2">{selectedProduct.description}</p>
              <h2 className="text-xl mt-3">₹{selectedProduct.price}</h2>

              <button
                onClick={() => addCart(selectedProduct)}
                className="bg-pink-600 text-white px-4 py-2 mt-4 rounded"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="container mx-auto">
      <Tabs defaultIndex={0}>
        {/* TAB BUTTONS */}
        <TabList className="flex justify-center gap-6 mb-10">
          <Tab>
            <button className="text-purple-500 flex items-center gap-2">
              <MdOutlineProductionQuantityLimits /> Products
            </button>
          </Tab>
          <Tab>
            <button className="text-pink-500 flex items-center gap-2">
              <AiFillShopping /> Orders
            </button>
          </Tab>
          <Tab>
            <button className="text-green-500 flex items-center gap-2">
              <FaUser /> Users
            </button>
          </Tab>
        </TabList>

        {/* ================= PRODUCT TAB ================= */}
        <TabPanel>
          <h1 className="text-center text-2xl font-bold mb-5">
            Product Details
          </h1>

          <button
            onClick={goToAdd}
            className="bg-pink-600 text-white px-4 py-2 rounded mb-5"
          >
            Add Product
          </button>

          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-200">
                <th>S.No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {product.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.imageUrl} className="w-20 h-20" />
                  </td>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>
                    <button onClick={() => deleteProduct(item)}>Delete</button>
                    <Link to="/updateproduct" onClick={() => edithandle(item)}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* ================= ORDER TAB ================= */}
        <TabPanel>
  <h1 className="text-center text-2xl font-bold mb-5">
    Order Details
  </h1>

  {/* ================= MOBILE VIEW (CARDS) ================= */}
  <div className="block md:hidden space-y-4">
    {order.map((item, index) => (
      <div
        key={item.id}
        className="bg-white shadow-md rounded-lg p-4 border"
      >
        <p className="text-sm font-semibold mb-1">
          Order #{index + 1}
        </p>

        <p className="text-xs text-gray-500 mb-2">
          Customer: {item.addressInfo?.name || "N/A"}
        </p>

        {/* PRODUCTS */}
        {item.cartItems?.map((cartItem, i) => (
          <div key={i} className="border-t pt-2 mt-2">
            <p className="font-semibold text-sm">
              {cartItem.title}
            </p>

            <p className="text-[10px] text-gray-500">
              ID: {cartItem.id}
            </p>

            {cartItem.customization && (
              <div className="text-[11px] mt-1">
                <p>Name: {cartItem.customization.customerName}</p>
                <p>Names: {cartItem.customization.text}</p>
                <p>Date: {cartItem.customization.date}</p>
                <p>Color: {cartItem.customization.color}</p>
                <p>Message: {cartItem.customization.message}</p>
              </div>
            )}

            {/* WhatsApp */}
            <a
              href={`https://wa.me/918699741106?text=${encodeURIComponent(
                `New Custom Order:

Product: ${cartItem.title}
Product ID: ${cartItem.id}

Customer: ${cartItem.customization?.customerName}
Names: ${cartItem.customization?.text}
Date: ${cartItem.customization?.date}
Color: ${cartItem.customization?.color}
Message: ${cartItem.customization?.message}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 px-2 py-1 bg-green-600 text-white text-[10px] rounded"
            >
              WhatsApp
            </a>
          </div>
        ))}

        {/* TOTAL */}
        <p className="mt-3 text-sm font-bold">
          Total: ₹
          {item.cartItems?.reduce(
            (acc, curr) => acc + parseInt(curr.price),
            0
          )}
        </p>

        {/* STATUS + ACTION */}
        <div className="mt-3 flex flex-col gap-2">
          <select
            value={item.status}
            onChange={(e) =>
              updateStatus(item.id, e.target.value)
            }
            className="border p-1 rounded text-xs"
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            onClick={() => downloadInvoice(item)}
            className="bg-black text-white px-2 py-1 text-xs rounded"
          >
            Download Invoice
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* ================= DESKTOP VIEW (TABLE) ================= */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-[800px] w-full text-left border">
      <thead>
        <tr className="bg-gray-200 text-sm">
          <th className="p-2">S.No</th>
          <th className="p-2">User</th>
          <th className="p-2">Products</th>
          <th className="p-2">Total</th>
          <th className="p-2">Status</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {order.map((item, index) => (
          <tr key={item.id} className="border-b text-sm">
            <td className="p-2">{index + 1}</td>

            <td className="p-2">
              {item.addressInfo?.name || "N/A"}
            </td>

            <td className="p-2">
              {item.cartItems?.map((cartItem, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">
                    {cartItem.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: {cartItem.id}
                  </p>
                </div>
              ))}
            </td>

            <td className="p-2">
              ₹
              {item.cartItems?.reduce(
                (acc, curr) => acc + parseInt(curr.price),
                0
              )}
            </td>

            <td className="p-2">{item.status}</td>

            <td className="p-2">
              <div className="flex flex-col gap-2">
                <select
                  value={item.status}
                  onChange={(e) =>
                    updateStatus(item.id, e.target.value)
                  }
                  className="border p-1 rounded text-xs"
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => downloadInvoice(item)}
                  className="bg-black text-white px-2 py-1 text-xs rounded"
                >
                  Invoice
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</TabPanel>

        {/* ================= USER TAB ================= */}
        <TabPanel>
          <h1 className="text-center text-2xl font-bold mb-5">
            User Details
          </h1>

          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-200">
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {user.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default DashboardTab;