import React, { useContext } from "react";
import { FaUserTie } from "react-icons/fa";
import myContext from "../../../context/data/myContext";
import Layout from "../../../components/layout/Layout";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, product, order, user, loading } = context; // added loading state

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap justify-center -m-4 text-center">
            {/* Total Products */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {product && product.length > 0
                    ? product.length
                    : loading
                    ? "Loading..."
                    : "0"}
                </h2>
                <p
                  className="text-purple-500 font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total Products
                </p>
              </div>
            </div>

            {/* Total Orders */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {order && order.length > 0
                    ? order.length
                    : loading
                    ? "Loading..."
                    : "0"}
                </h2>
                <p
                  className="text-purple-500 font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total Orders
                </p>
              </div>
            </div>

            {/* Total Users */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {user && user.length > 0
                    ? user.length
                    : loading
                    ? "Loading..."
                    : "0"}
                </h2>
                <p
                  className="text-purple-500 font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total Users
                </p>
              </div>
            </div>
          </div>
        </div>
        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;
