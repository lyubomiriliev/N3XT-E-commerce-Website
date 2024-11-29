import React, { useState } from "react";
import { User, ShoppingBag, MapPin, Users } from "lucide-react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountDetails from "../components/AccountDetails";
import Orders from "../components/Orders";
import Address from "../components/Address";
import Refer from "../components/Refer";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.next.userInfo);
  const [activeTab, setActiveTab] = useState("profile");

  const { handleSignOut } = useFirebaseAuth();
  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "address", label: "Delivery Address", icon: MapPin },
    { id: "refer", label: "Refer a Friend", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <AccountDetails />;

      case "orders":
        return <Orders />;

      case "address":
        return <Address />;

      case "refer":
        return <Refer />;
    }
  };

  return (
    <div className="w-full justify-center items-center mt-28 lg:mt-36">
      <div className="max-w-screen-xl flex flex-col mx-auto px-4 py-8">
        <div className="flex justify-between py-2 items-center">
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <button onClick={handleSignOut} className="text-gray-700 text-base">
            Log Out <LogoutIcon />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-4 flex items-center justify-center space-x-2 text-sm font-medium transition-colors
                  ${
                    activeTab === tab.id
                      ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden lg:flex">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
