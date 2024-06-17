import { ToastContainer } from "react-toastify";
import { GoogleLogo, nextLogo } from "../assets";

import { Link } from "react-router-dom";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const Login = () => {

    const { handleGoogleLogin, handleSignOut } = useFirebaseAuth();

    return (
        <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
            <div className="w-full flex items-center justify-center gap-10">
                <div onClick={handleGoogleLogin} className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
                    <img className="w-10" src={GoogleLogo} alt="" />
                    <span className="text-sm text-gray-900">Sign in with Google</span>
                </div>
                <button onClick={handleSignOut} className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Sign Out</button>
            </div>
            <div className="w-full flex items-center justify-center gap-10">
                <div className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
                    <img className="w-10" src={nextLogo} alt="" />
                    <span className="text-sm text-gray-900">Sign in</span>
                </div>
                <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Sign Out</button>
            </div>
            <div>
                <Link to="/register">
                    <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Don't have an account? Register</button>

                </Link>
            </div>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Login
