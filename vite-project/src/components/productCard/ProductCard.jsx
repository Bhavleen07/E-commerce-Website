import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";

function ProductCard() {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Add to cart
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 👉 Debug: log products + filters
  console.log("Products:", product);
  console.log("FilterType:", filterType, "FilterPrice:", filterPrice);

  const filteredProducts = product
    // 🔎 Search filter
    .filter((obj) => obj.title?.toLowerCase().includes(searchkey.toLowerCase()))
    // ✅ Category filter (case-insensitive, partial match allowed)
    .filter((obj) =>
      filterType
        ? obj.category &&
          obj.category
            .toString()
            .toLowerCase()
            .includes(filterType.toLowerCase())
        : true
    )
    // ✅ Price filter (parse price string to number)
    .filter((obj) => {
      if (!filterPrice) return true;
      const [min, max] = filterPrice.split("-").map(Number);
      const cleanedPrice = parseInt(
        obj.price.toString().replace(/\D/g, ""),
        10
      );
      return cleanedPrice >= min && cleanedPrice <= max;
    });

  return (
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

        <div className="flex flex-wrap -m-4">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 mx-auto">⚠️ No products found.</p>
          ) : (
            filteredProducts.slice(0, 8).map((item, index) => {
              const { title, price, imageUrl, id } = item;
              return (
                <div
                  key={index}
                  onClick={() => (window.location.href = `/productinfo/${id}`)}
                  className="p-4 md:w-1/4 drop-shadow-lg"
                >
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex justify-center cursor-pointer">
                      <img
                        className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-transform duration-300 ease-in-out"
                        src={imageUrl}
                        alt={title}
                      />
                    </div>
                    <div className="p-5 border-t-2">
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        kaurkrafts
                      </h2>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h1>
                      <p
                        className="leading-relaxed mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹ {price}
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addCart(item);
                          }}
                          type="button"
                          className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm w-full py-2"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
