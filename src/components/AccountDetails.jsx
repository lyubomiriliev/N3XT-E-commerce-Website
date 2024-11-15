import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const AccountDetails = () => {
  const userInfo = useSelector((state) => state.next.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState({
    phone: "+1 (555) 123-4567",
    firstName: "Lyubomir",
    lastName: "Iliev",
    birthday: "April 15, 1990",
  });
  const [displayName, setDisplayName] = useState(
    `${accountData.firstName} ${accountData.lastName}`
  );
  const [profilePicture, setProfilePicture] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
  );

  // Load data from localStorage if available
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("accountData"));
    if (savedData) {
      setAccountData(savedData);
      setDisplayName(`${savedData.firstName} ${savedData.lastName}`);
    }
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, []);

  // Save to localStorage whenever accountData changes
  useEffect(() => {
    localStorage.setItem("accountData", JSON.stringify(accountData));
  }, [accountData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setAccountData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setDisplayName(`${accountData.firstName} ${accountData.lastName}`);
  };

  // Handle profile picture change
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
        localStorage.setItem("profilePicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleProfilePictureClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {/* Profile picture with click handler */}
        <div className="relative select-none">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg aspect-square cursor-pointer"
          />
          <div
            className="h-8 w-8 rounded-full flex justify-center items-center cursor-pointer bg-white absolute shadow-md bottom-1 right-1"
            onClick={handleProfilePictureClick}
          >
            <AddPhotoAlternateIcon className="text-indigo-600" />
          </div>
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{displayName}</h3>
          <p className="text-gray-600">{userInfo.email}</p>
          <button
            onClick={isEditing ? handleSave : handleEditToggle}
            className="mt-2 text-indigo-600 flex items-center text-sm hover:text-indigo-800"
          >
            {isEditing ? (
              <span className="mr-1">Save</span>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-1" /> Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2">Account Details</h4>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Member Since</span> March 2023
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Phone</span>
              <input
                type="text"
                value={accountData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                readOnly={!isEditing}
                className={`${
                  isEditing ? "border-b border-gray-300" : ""
                } focus:outline-none bg-transparent`}
              />
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">First Name</span>
              <input
                type="text"
                value={accountData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                readOnly={!isEditing}
                className={`${
                  isEditing ? "border-b border-gray-300" : ""
                } focus:outline-none bg-transparent`}
              />
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Last Name</span>
              <input
                type="text"
                value={accountData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                readOnly={!isEditing}
                className={`${
                  isEditing ? "border-b border-gray-300" : ""
                } focus:outline-none bg-transparent`}
              />
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Birthday</span>
              <input
                type="text"
                value={accountData.birthday}
                onChange={(e) => handleChange("birthday", e.target.value)}
                readOnly={!isEditing}
                className={`${
                  isEditing ? "border-b border-gray-300" : ""
                } focus:outline-none bg-transparent`}
              />
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2">Preferences</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded text-indigo-600"
                checked={userInfo.isSubscribed === true}
              />
              <span className="text-sm">Email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="text-sm">SMS notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded text-indigo-600" />
              <span className="text-sm">Marketing communications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
