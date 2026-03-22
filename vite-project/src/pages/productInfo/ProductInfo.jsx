import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  Timestamp
} from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/FirebaseConfig";

function ProductInfo() {
  const [showModal, setShowModal] = useState(false);

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const [customData, setCustomData] = useState({
    customerName: "",
    text: "",
    date: "",
    color: "",
    message: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // 🔹 Handle input change
  const handleCustomChange = (e) => {
    setCustomData({
      ...customData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Fetch product
  const getProductData = async () => {
    setLoading(true);
    try {
      const docRef = doc(fireDB, "products", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ ...docSnap.data(), id: docSnap.id });
      } else {
        toast.error("Product not found");
        navigate("/allproducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching product");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch all products
  const getAllProducts = async () => {
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllProducts(data);
  };

  useEffect(() => {
    getProductData();
    getAllProducts();
  }, [params.id]);

  // 🔹 Normal Add To Cart (non-custom)
  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const recommendedProducts = allProducts
    .filter((item) => item.category === product?.category)
    .filter((item) => item.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20">Loading product...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            
            {/* IMAGE */}
            <img
              alt={product.title}
              className="lg:w-1/3 w-full object-cover rounded"
              src={product.imageUrl}
            />

            {/* DETAILS */}
            <div className="lg:w-1/2 w-full lg:pl-10 mt-6">
              <h1 className="text-3xl mb-2">{product.title}</h1>

              <p className="mb-5 border-b pb-5">
                {product.description}
              </p>

              {/* PRICE + BUTTON */}
              <div className="flex items-center">
                <span className="text-2xl">₹{product.price}</span>

                <button
                  onClick={() => {
                    if (product.hasCustomForm) {
                      setShowModal(true);
                    } else {
                      handleAddToCart();
                    }
                  }}
                  className="ml-auto bg-indigo-500 text-white px-6 py-2 rounded"
                >
                  {product.hasCustomForm ? "Customize" : "Add To Cart"}
                </button>
              </div>

              {/* 🔥 CUSTOM MODAL */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg w-[90%] md:w-[400px] space-y-3">

                    <h2 className="text-lg font-semibold">
                      Customize Your Product
                    </h2>

                    <input
                      name="customerName"
                      placeholder="Your Name"
                      value={customData.customerName}
                      onChange={handleCustomChange}
                      className="w-full p-2 border rounded"
                    />

                    <input
                      name="text"
                      placeholder="Bride & Groom Names"
                      value={customData.text}
                      onChange={handleCustomChange}
                      className="w-full p-2 border rounded"
                    />

                    <input
                      name="date"
                      placeholder="Wedding Date"
                      value={customData.date}
                      onChange={handleCustomChange}
                      className="w-full p-2 border rounded"
                    />

                    <input
                      type="color"
                      name="color"
                      value={customData.color}
                      onChange={handleCustomChange}
                      className="w-full h-10"
                    />

                    <textarea
                      name="message"
                      placeholder="Special Message"
                      value={customData.message}
                      onChange={handleCustomChange}
                      className="w-full p-2 border rounded"
                    />

                    <div className="flex justify-between">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={async () => {
                          if (!customData.customerName) {
                            toast.error("Please fill name");
                            return;
                          }

                          try {
                            // ✅ SAVE TO FIRESTORE
                            await addDoc(
                              collection(fireDB, "customOrders"),
                              {
                                ...customData,
                                productId: product.id,
                                productTitle: product.title,
                                createdAt: Timestamp.now(),
                              }
                            );

                            // ✅ ADD TO CART
                            let productWithCustomization = {
                              ...product,
                              customization: customData,
                            };

                            dispatch(addToCart(productWithCustomization));

                            toast.success(
                              "Customization saved & added to cart"
                            );

                            setShowModal(false);
                            navigate("/cart");
                          } catch (error) {
                            console.error(error);
                            toast.error("Error saving customization");
                          }
                        }}
                        className="px-4 py-2 bg-pink-600 text-white rounded"
                      >
                        Save & Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 RECOMMENDED PRODUCTS */}
      <div className="container mx-auto px-5 py-10">
        <h2 className="text-2xl mb-5">Recommended Products</h2>

        <div className="flex flex-wrap -m-4">
          {recommendedProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/productinfo/${item.id}`)}
              className="p-4 md:w-1/4 cursor-pointer"
            >
              <div className="border rounded shadow">
                <img
                  src={item.imageUrl}
                  className="h-60 w-full object-cover"
                  alt={item.title}
                />
                <div className="p-4">
                  <h2>{item.title}</h2>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;