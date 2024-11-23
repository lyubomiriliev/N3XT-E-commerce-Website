import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Package, ChevronRight, X } from "lucide-react";
import { toast } from "react-toastify";
import { firestore } from "../firebase.config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.next.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userInfo) {
        toast.error("Please log in to view your orders.");
        return;
      }

      try {
        const ordersRef = collection(firestore, "orders");
        const q = query(ordersRef, where("userId", "==", userInfo._id));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  const handleOpenItem = (item) => {
    const _id = item.title;
    const idString = (_id) => {
      return String(_id).toLowerCase().split(" ").join("");
    };
    const rootId = idString(_id);

    navigate(`/product/${rootId}`);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Order #{order.id}</p>
              <p className="font-medium">
                {new Date(order.date).toDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${order.total}</p>
              <p className="text-sm">{order.items.length} items</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-gray-600" />
              <span
                className={`text-sm ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "In Transit"
                    ? "text-blue-600"
                    : "text-orange-600"
                }`}
              >
                {order.status}
              </span>
            </div>
            <button
              onClick={() => openModal(order)}
              className="text-indigo-600 text-sm flex items-center hover:text-indigo-800"
            >
              View Details <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      ))}

      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.date).toDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Total:</strong> ${selectedOrder.total}
              </p>
              <div>
                <strong>Products:</strong>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      onClick={() => handleOpenItem(item)}
                      key={index}
                      className="text-center"
                    >
                      <img
                        src={item.image}
                        className="w-24 h-24 object-cover rounded-lg shadow-md mx-auto cursor-pointer"
                        alt={item.title}
                      />
                      <p className="text-sm font-medium mt-2">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} pcs.
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
