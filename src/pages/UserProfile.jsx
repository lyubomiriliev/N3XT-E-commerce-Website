import React, { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useSelector } from 'react-redux';
import AccountDetails from '../components/AccountDetails';
import Orders from '../components/Orders';
import DeliveryAddress from '../components/DeliveryAddress';
import Refer from '../components/Refer';

const UserProfile = () => {

  const { handleSignOut } = useFirebaseAuth();
  const userInfo = useSelector((state) => state.next.userInfo);
  const [selectedMenu, setSelectedMenu] = useState("account");

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  const userMenu = ["My account", "My orders", "Delivery address", "Refer a friend"];

  const renderSelectedComponent = () => {
    switch (selectedMenu) {
      case "My account":
        return <AccountDetails />;
      case "My orders":
        return <Orders />;
      case "Delivery address":
        return <DeliveryAddress />;
      case "Refer a friend":
        return <Refer />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex flex-col max-w-screen-xl mx-auto justify-start py-8 px-4 md:px-0 items-center mt-28 md:mt-36">
        <div className='flex w-full justify-between items-center'>
          <div className='flex-1 text-center'>
            <h1 className='text-xl font-semibold py-4'>Welcome, {userInfo.email}</h1>
          </div>
          <button onClick={handleSignOut} className="text-gray-700 text-base">
            <LogoutIcon />
          </button>
        </div>
        <div className='flex justify-start items-start w-full bg-gray-200 rounded-xl overflow-hidden mt-6'>
          <div className='bg-gray-300 h-96 flex flex-col text-left justify-start py-8 items-start px-4 space-y-4 w-44'>
            {userMenu.map((menu, index) => (
              <div
                onClick={() => handleSelectMenu(menu)}
                className={`flex flex-col cursor-pointer ${selectedMenu === menu ? 'font-semibold' : 'font-light'}`}
                key={index}
              >
                <p className='text-black'>{menu}</p>
              </div>
            ))}
          </div>
          <div className="flex-1 p-6">
            {renderSelectedComponent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
