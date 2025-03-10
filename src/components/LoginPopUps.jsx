import React from "react";
import { AppleLogo, FbLogo, GoogleLogo } from "../assets";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { Link } from "react-router-dom";

const LoginPopUps = () => {
  const { handleGoogleLogin, signInWithFacebook } = useFirebaseAuth();

  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <div
          onClick={handleGoogleLogin}
          className="text-base w-full h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-indigo-600 cursor-pointer duration-300"
        >
          <img className="w-10" src={GoogleLogo} alt="" />
          <span className="text-sm text-gray-900 pr-2">
            Continue with Google
          </span>
        </div>
        <div
          onClick={signInWithFacebook}
          className="text-base w-full h-12 tracking-wide border-[1px] mt-4 border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-indigo-600 cursor-pointer duration-300"
        >
          <img className="w-7 ml-2" src={FbLogo} alt="" />
          <span className="text-sm text-gray-900 pr-2">
            Continue with Facebook
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPopUps;
