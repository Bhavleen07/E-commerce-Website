import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, clearCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = parseInt(100);
  const grandTotal = shipping + totalAmount;

  // delete item
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item.id));
    toast.success("Item removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    var options = {
      key: "rzp_test_RBtikKq9Oqufk7",
      key_secret: "Y2A0wuokOwxgQOSEWIbj8qnj",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "kaurkraft",
      description: "for testing purpose",

      handler: async function (response) {
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;

        // ✅ Use sessionStorage for current user
        const storedUser =
          JSON.parse(sessionStorage.getItem("user")) ||
          JSON.parse(localStorage.getItem("user")); // optional fallback

        if (!storedUser) {
          toast.error("User not found! Please log in again.");
          return;
        }

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: storedUser.email,
          userid: storedUser.uid,
          paymentId,
          status: "Pending",
        };

        try {
          await addDoc(collection(fireDB, "orders"), orderInfo);
          toast.success("Order saved successfully to Firestore!");
          dispatch(clearCart());
        } catch (error) {
          console.error("Firestore error:", error);
          toast.error("Failed to save order to Firestore!");
        }
      },

      theme: { color: "#3399cc" },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <Layout>
      <div
        className="h-auto min-h-screen bg-gray-100 pt-5"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-6 text-center text-xl sm:text-2xl font-bold">
          Cart Items
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-3 sm:px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items Section */}
          <div className="rounded-lg md:w-2/3 max-h-[500px] overflow-y-auto pr-0 sm:pr-2">
            {cartItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="mb-4 sm:mb-6 rounded-lg border drop-shadow-xl bg-white p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt="product"
                    className="w-full sm:w-32 md:w-40 rounded-lg object-cover"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between mt-4 sm:mt-0">
                    <div>
                      <h2
                        className="text-base sm:text-lg font-bold"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {item.title}
                      </h2>
                      <h2
                        className="text-xs sm:text-sm mt-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {item.description}
                      </h2>
                      <p
                        className="mt-1 text-sm sm:text-xs font-semibold"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{item.price}
                      </p>
                    </div>
                    <div
                      onClick={() => deleteCart(item)}
                      className="mt-3 sm:mt-0 flex justify-end sm:block cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 
                             48.108 0 00-3.478-.397m-12 
                             .562a48.11 48.11 0 013.478-.397m7.5 
                             0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 
                             51.964 0 00-3.32 0c-1.18.037-2.09 
                             1.022-2.09 2.201v.916m12 
                             .397L18.16 19.673a2.25 2.25 0 
                             01-2.244 2.077H8.084a2.25 2.25 0 
                             01-2.244-2.077L4.772 5.79"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Section */}
          <div
            className="mt-4 sm:mt-6 w-full md:w-1/3 rounded-lg border bg-white p-4 sm:p-6 shadow-md"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between text-sm sm:text-base">
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3 text-sm sm:text-base">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">₹{grandTotal}</p>
            </div>
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
