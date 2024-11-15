import { ChevronRight, Package, X } from "lucide-react";
import React, { useState } from "react";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const mockOrders = [
    {
      id: "1",
      date: "2024-03-15",
      status: "Delivered",
      items: 2,
      total: "$129.99",
    },
    {
      id: "2",
      date: "2024-03-10",
      status: "In Transit",
      items: 1,
      total: "$79.99",
    },
    {
      id: "3",
      date: "2024-03-05",
      status: "Processing",
      items: 3,
      total: "$199.99",
    },
  ];

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-4">
      {mockOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Order #{order.id}</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{order.total}</p>
              <p className="text-sm">{order.items} items</p>
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
                <strong>Date:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Total:</strong> {selectedOrder.total}
              </p>
              <p>
                <strong>Items:</strong> {selectedOrder.items}
              </p>
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
