import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useSelector } from 'react-redux';

const UserProfile = () => {

const {handleSignOut} = useFirebaseAuth();
const userInfo = useSelector((state) => state.next.userInfo)

console.log(userInfo)

  return (
    <div>
        <div className="w-full flex flex-col justify-center px-4 md:px-0 items-center mt-28 md:mt-36">
            <h1>My profile</h1>
            <h3>{userInfo.email}</h3>
            <button onClick={handleSignOut} className="text-gray-700 text-base">
                <LogoutIcon />
            </button>
    </div>
    </div>
  )
}

export default UserProfile