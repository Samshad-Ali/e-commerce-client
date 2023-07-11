import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { getCategoryDataThunk } from "./redux/CategorySlice";
import Collection from "./pages/collection/Collection";
import Payment from "./components/payment/Payment";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryDataThunk());
  }, []);

  const style = {
    marginBlock: "3rem",
    textAlign: "center",
    color: "red",
    fontSize: "2.5rem",
  };
  return (
    <>
      <Toaster />
      <Navbar />
      <main>
        <Routes>
          <Route path="*" element={<h3 style={style}>Page not Found !</h3>} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId?" element={<Collection />} />
          {/* /category/:categoryId? -> here ? is for making the id is optional */}
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/payment/:status" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
export default App;
