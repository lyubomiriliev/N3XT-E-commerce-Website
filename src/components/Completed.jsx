import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Completed = () => {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const storedOrderNumber = localStorage.getItem("orderNumber");

    if (storedOrderNumber) {
      setOrderNumber(storedOrderNumber);
    } else {
      const newOrderNumber = Math.floor(1000 + Math.random() * 9000);
      setOrderNumber(newOrderNumber);
      localStorage.setItem("orderNumber", newOrderNumber);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-20 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Thank you for your order!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-500 text-sm">
          Order Number:{" "}
          <span className="text-black font-semibold">#{orderNumber}</span>
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-800 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Completed;
