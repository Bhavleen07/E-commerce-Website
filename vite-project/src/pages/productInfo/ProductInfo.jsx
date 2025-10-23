import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/FirebaseConfig";

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;
  const [product, setProduct] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Fetch product from Firestore
  const getProductData = async () => {
    setLoading(true);
    try {
      console.log("Fetching product with ID:", params.id); // 🔹 debug
      const docRef = doc(fireDB, "products", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ ...docSnap.data(), id: docSnap.id });
      } else {
        toast.error("Product not found");
        navigate("/allproducts"); // fallback
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    // eslint-disable-next-line
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  if (!product) {
    return (
      <Layout>
        <div
          className="text-center py-20"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          Loading product...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={product.title}
              className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
              src={product.imageUrl || "/placeholder.png"}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>

              <p className="leading-relaxed border-b-2 mb-5 pb-5">
                {product.description || "No description available."}
              </p>

              <div className="flex items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price || "-"}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
