import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const userInfo = useSelector((state) => state.next.userInfo);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState({
    phone: "+359 888 12-45-67",
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

  useEffect(() => {
    localStorage.setItem("accountData", JSON.stringify(accountData));
  }, [accountData]);

  const formattedDate = userInfo?.memberSince
    ? new Date(userInfo.memberSince).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      })
    : "2024";

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

  useEffect(() => {
    if (!userInfo) {
      // Redirect to home or login if user is not logged in
      navigate("/");
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold">
          Please log in to view your account details.
        </h2>
      </div>
    );
  }

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
          <p className="text-gray-600">{userInfo?.email}</p>
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
        <div className="flex flex-col p-4 rounded-lg shadow-sm">
          <h4 className="font-medium mb-2">Account Details</h4>
          <div className="space-y-2 text-sm">
            <div>
              <p className="flex w-[69%] lg:w-[88%] justify-between">
                <span className="text-gray-600">Member Since</span>
                {formattedDate}
              </p>
            </div>
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
      </div>
    </div>
  );
};

export default AccountDetails;
