import { Edit2, MapPin, X } from "lucide-react";
import React, { useState, useEffect } from "react";

const Address = () => {
  const [editingIndex, setEditingIndex] = useState(null); // Track which address is being edited
  const [addresses, setAddresses] = useState([
    {
      title: "Home Address",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York, NY 10001",
      country: "United States",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    line1: "",
    line2: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses"));
    if (savedAddresses) {
      setAddresses(savedAddresses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleEditToggle = (index) => {
    setEditingIndex(index);
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = addresses.map((addr, i) =>
      i === index ? { ...addr, [field]: value } : addr
    );
    setAddresses(updatedAddresses);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNewAddressChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  const saveNewAddress = () => {
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      title: "New Address",
      line1: "",
      line2: "",
      city: "",
      country: "",
    });
    closeModal();
  };

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const saveEditedAddress = () => {
    setEditingIndex(null); // Exit edit mode
  };

  return (
    <div className="space-y-4">
      {addresses.map((addr, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-600 relative flex flex-col space-y-2"
        >
          <button
            onClick={() => deleteAddress(index)}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex justify-between items-start flex-col space-y-1">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={addr.title}
                  onChange={(e) =>
                    handleAddressChange(index, "title", e.target.value)
                  }
                  className="font-medium mb-1 border-b border-gray-300 focus:outline-none"
                />
                <input
                  type="text"
                  value={addr.line1}
                  onChange={(e) =>
                    handleAddressChange(index, "line1", e.target.value)
                  }
                  className="text-sm text-gray-600 mt-1 border-b border-gray-300 focus:outline-none"
                />
                <input
                  type="text"
                  value={addr.line2}
                  onChange={(e) =>
                    handleAddressChange(index, "line2", e.target.value)
                  }
                  className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none"
                />
                <input
                  type="text"
                  value={addr.city}
                  onChange={(e) =>
                    handleAddressChange(index, "city", e.target.value)
                  }
                  className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none"
                />
                <input
                  type="text"
                  value={addr.country}
                  onChange={(e) =>
                    handleAddressChange(index, "country", e.target.value)
                  }
                  className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none"
                />
              </>
            ) : (
              <>
                <p className="font-medium">{addr.title}</p>
                <p className="text-sm text-gray-600 mt-1">{addr.line1}</p>
                <p className="text-sm text-gray-600">{addr.line2}</p>
                <p className="text-sm text-gray-600">{addr.city}</p>
                <p className="text-sm text-gray-600">{addr.country}</p>
              </>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            {index === 0 ? (
              <span className="inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                Primary
              </span>
            ) : (
              <span className="inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                Secondary
              </span>
            )}
            {editingIndex === index ? (
              <button
                onClick={saveEditedAddress}
                className="text-white bg-indigo-600 px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditToggle(index)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-1" /> Edit
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={openModal}
        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors flex items-center justify-center"
      >
        <MapPin className="w-4 h-4 mr-2" />
        Add New Address
      </button>

      {isModalOpen && (
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
            <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
            <div className="space-y-2 text-sm">
              <input
                type="text"
                placeholder="Title"
                value={newAddress.title}
                onChange={(e) =>
                  handleNewAddressChange("title", e.target.value)
                }
                className="w-full border-b border-gray-300 p-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={newAddress.line1}
                onChange={(e) =>
                  handleNewAddressChange("line1", e.target.value)
                }
                className="w-full border-b border-gray-300 p-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={newAddress.line2}
                onChange={(e) =>
                  handleNewAddressChange("line2", e.target.value)
                }
                className="w-full border-b border-gray-300 p-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="City, State, ZIP"
                value={newAddress.city}
                onChange={(e) => handleNewAddressChange("city", e.target.value)}
                className="w-full border-b border-gray-300 p-2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) =>
                  handleNewAddressChange("country", e.target.value)
                }
                className="w-full border-b border-gray-300 p-2 focus:outline-none"
              />
            </div>
            <button
              onClick={saveNewAddress}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
