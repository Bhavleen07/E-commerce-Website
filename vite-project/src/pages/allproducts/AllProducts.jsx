import React, { useContext, useEffect } from "react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Allproducts() {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = product
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchkey ? searchkey.toLowerCase() : "")
    )
    .filter((obj) =>
      obj.category
        .toLowerCase()
        .includes(filterType ? filterType.toLowerCase() : "")
    )
    .filter((obj) => {
      if (!filterPrice) return true;
      const [min, max] = filterPrice.split("-").map(Number);
      return obj.price >= min && obj.price <= max;
    });

  return (
    <Layout>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 auto-rows-fr">
            {filteredProducts.map((item, index) => {
              const { title, price, imageUrl, id } = item;
              return (
                <div
                  onClick={() => navigate(`/productinfo/${id}`)}
                  key={index}
                  className="cursor-pointer border-2 hover:shadow-xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="overflow-hidden w-full h-56 sm:h-64 md:h-72 rounded-t-2xl">
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                      src={imageUrl}
                      alt={title}
                    />
                  </div>
                  <div className="p-3 sm:p-4 border-t-2">
                    <h2
                      className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Kaurkrafts
                    </h2>
                    <h1
                      className="title-font text-sm sm:text-base font-medium text-gray-900 mb-1"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {title}
                    </h1>
                    <p
                      className="text-sm sm:text-base leading-relaxed mb-2"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ₹{price}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addCart(item);
                      }}
                      className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs sm:text-sm w-full py-1.5 sm:py-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <p
                className="text-center w-full mt-10"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                No products found.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Allproducts;
