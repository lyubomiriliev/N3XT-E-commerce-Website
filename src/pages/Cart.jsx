import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import { nextLogoWhite } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";
import { resetCart, setOrderId } from "../redux/nextSlice";

const Cart = () => {
  const productData = useSelector((state) => state.next.productData);
  const userInfo = useSelector((state) => state.next.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState("");
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  const payment = async (token) => {
    try {
      const response = await axios.post("http://localhost:8000/pay", {
        amount: totalAmount * 100,
        token: token,
      });

      // Check if the payment was successful

      if (response.status === 200 && response.data.success) {
        const orderDoc = await addDoc(collection(firestore, "orders"), {
          userId: userInfo?.uid,
          items: productData,
          total: totalAmount,
          date: new Date().toISOString(),
          status: "Processing",
        });
        dispatch(setOrderId(orderDoc.id));
        dispatch(resetCart());
        toast.success("Payment successful!");
        navigate("/order-completed"); // Redirect on success
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during payment. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto mt-28 md:mt-32">
      <div className="w-full relative">
        <img
          className="w-full h-32 md:h-48 object-cover"
          src="https://images.pexels.com/photos/5076525/pexels-photo-5076525.jpeg"
          alt="Empty Cart"
        />
        <img
          src={nextLogoWhite}
          alt="NextLogo"
          className="w-36 md:w-44 absolute top-0 inset-0"
        />
      </div>
      <div className="w-full md:max-w-screen-xl py-4 mx-auto justify-center items-center flex flex-col md:flex-row relative">
        <div className="w-full md:w-2/3">
          <CartItem />
        </div>
        {productData.length > 0 ? (
          <div className=" bg-black md:w-[1px] md:h-60 mr-10"></div>
        ) : null}
        {productData.length > 0 ? (
          <div className="w-full flex flex-col md:w-2/3 py-6 px-4">
            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium">Cart Total:</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmount}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping{" "}
                <span className="font-titleFont font-bold text-base">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Facilis, molestias!
                </span>
              </p>
            </div>
            <div>
              <p className="font-titleFont font-semibold flex justify-between mt-6">
                Total <span className="text-xl font-bold">${totalAmount}</span>
              </p>
            </div>
            <Link to={userInfo == null ? "/register" : null}>
              <button
                onClick={handleCheckout}
                className="text-base bg-black rounded-md text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
              >
                Checkout
              </button>
            </Link>
            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51OmBj8GcPfJpi1e0eCSHHyxM3rjygJLC7LmM6X2dlJj2D1o1aYeRutuTSno97SkDTvvExzInPTkoHhIrSGxtVqqH00esPuLY5a"
                  name="Next E-Commerce"
                  amount={totalAmount * 100}
                  label="Confirm your payment"
                  description={`Your payment amount is $${totalAmount}`}
                  token={payment}
                  email={userInfo.email}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
