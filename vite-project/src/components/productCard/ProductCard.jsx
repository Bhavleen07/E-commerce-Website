import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";

function ProductCard({ product: singleProduct }) {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;
  const isSingle = singleProduct ? true : false;

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

  const displayProducts = isSingle ? [singleProduct] : product;

  return (
  <section className={isSingle ? "" : "text-gray-600 body-font"}>
      <div className={isSingle ? "" : "w-full"}>
        

        <div className={isSingle ? "flex flex-wrap -m-4" : ""}>
          {displayProducts.length === 0 ? (
            <p className="text-gray-600 mx-auto">⚠️ No products found.</p>
          ) : (
            displayProducts.map ((item, index) => {
              const { title, price, imageUrl, id } = item;
              return (
                <div
                  key={index}
                  onClick={() => (window.location.href = `/productinfo/${id}`)}
                  className="p-2 w-full drop-shadow-lg"
                >
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="w-full h-56 bg-white flex items-center justify-center overflow-hidden rounded-t-2xl " style={{
                    backgroundColor: mode === "dark" ? "#374151" : "white",
                    }}>
                    <img
                    src={imageUrl}
                    alt={title}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
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
