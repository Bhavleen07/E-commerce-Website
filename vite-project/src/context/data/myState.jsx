import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17 24 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  // ---------------- PRODUCT STATE ----------------
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [product, setProduct] = useState([]);

  // ---------------- ORDERS STATE ----------------
  const [order, setOrder] = useState([]); // ✅ Added order state

  // ADD PRODUCT
  const addProduct = async () => {
    if (
      !products.title ||
      !products.price ||
      !products.imageUrl ||
      !products.category ||
      !products.description
    ) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      await addDoc(collection(fireDB, "products"), products);
      toast.success("Product added successfully");
      getProductData();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    resetProductState();
  };

  const resetProductState = () => {
    setProducts({
      title: null,
      price: null,
      imageUrl: null,
      category: null,
      description: null,
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
  };

  // GET PRODUCTS (live sync)
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProduct(productsArray);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // EDIT PRODUCT
  const edithandle = (item) => setProducts(item);

  // UPDATE PRODUCT
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", item.id), item);
      toast.success("Product updated successfully");
      getProductData();
      resetProductState();
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // DELETE PRODUCT
  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted successfully");
      getProductData();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // ---------------- ORDERS SECTION ----------------
  const getOrderData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "orders"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersArray = snapshot.docs.map((doc) => {
          const data = doc.data();
          const addressInfo = data.addressInfo || {};
          const cartItems = data.cartItems || [];

          // Compute total price
         const totalPrice = cartItems.reduce(
           (sum, item) => sum + Number(item.price || 0),
           0
         );

          // Get product titles
          const productNames = cartItems.map((item) => item.title || "Unknown");

          return {
            id: doc.id,
            userName: addressInfo.name || data.name || "N/A",
            products: productNames, // array of product titles
            totalPrice, // sum of prices
            status: data.status || "Pending",
            date: data.date || "",
            userid: data.userid || "", // keep for filtering
            time: data.time || {},
          };
        });

        // Sort newest first
        const sorted = ordersArray.sort(
          (a, b) => (b.time?.seconds || 0) - (a.time?.seconds || 0)
        );

        const storedUser =
          JSON.parse(localStorage.getItem("currentUser")) ||
          JSON.parse(localStorage.getItem("user"));

        if (
          storedUser?.role === "admin" ||
          storedUser?.email === "kaurkraftshop@gmail.com" ||
          !storedUser
        ) {
          setOrder(sorted);
        } else {
          const userOrders = sorted.filter(
            (o) =>
              o.userid === storedUser?.uid || o.userid === storedUser?.userid
          );
          setOrder(userOrders);
        }

        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log("Error fetching orders:", error);
      setLoading(false);
    }
  };

  // ---------------- USERS SECTION ----------------
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser(usersArray);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // ---------------- INITIAL DATA LOAD ----------------
  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  // ---------------- FILTERS & SEARCH ----------------
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        updateProduct,
        edithandle,
        deleteProduct,
        order,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
