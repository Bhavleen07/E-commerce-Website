import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function Order() {
  // ✅ Updated to use sessionStorage for user session
  const currentUser =
    JSON.parse(sessionStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("user")); // optional fallback for old orders
  const userid = currentUser?.uid || null;

  const context = useContext(myContext);
  const { mode, loading } = context;

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (!userid) return;

    const q = query(
      collection(fireDB, "orders"),
      where("userid", "==", userid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserOrders(ordersData);
    });

    return () => unsubscribe();
  }, [userid]);

  return (
    <Layout>
      {loading && <Loader />}
      {userid && userOrders.length > 0 ? (
        <div className="py-10 px-4 sm:px-6 lg:px-8">
          {userOrders.map((order, index) => (
            <div
              key={index}
              className="max-w-4xl mx-auto mb-8 border border-gray-300 rounded-lg shadow-md"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "white",
                color: mode === "dark" ? "white" : "",
              }}
            >
              {/* Order Info */}
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="text-sm font-medium">
                  <strong>Date:</strong> {order.date || "N/A"}
                </p>
                <p className="text-sm font-medium mt-2 sm:mt-0">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : order.status === "Shipped"
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </p>
              </div>

              {/* Cart Items */}
              <div className="px-6 py-4 space-y-4">
                {order.cartItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 rounded-lg p-4 sm:p-6"
                    style={{
                      backgroundColor:
                        mode === "dark" ? "rgb(46 49 55)" : "#f9fafb",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className="w-full sm:w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 w-full">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm mt-1">{item.description}</p>
                      <p className="text-sm mt-1 font-medium">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders</h2>
      )}
    </Layout>
  );
}

export default Order;
