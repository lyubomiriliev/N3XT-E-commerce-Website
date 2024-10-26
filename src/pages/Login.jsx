import { ToastContainer } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import LoginPopUps from "../components/LoginPopUps";

const Login = () => {

    const navigate = useNavigate();
    const { handleUserLogin } = useLogin();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const [rememberUser, setRememberUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("rememberedUser");
        if (storedUser) {
            setInputs((prevInputs) => ({
                ...prevInputs,
                email: storedUser,
            }));
            setRememberUser(true);
        }
    }, [])

    const isValidEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/;

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleForgotPassword = () => {
        navigate("/forgot-password")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleUserLogin(inputs);
        if(rememberUser) {
            localStorage.setItem("rememberedUser", inputs.email);
        } else {
            localStorage.removeItem("rememberedUser");
        }

    }

    return (
        <div className="w-full flex flex-col items-center justify-between min-h-screen px-4 md:px-0">
            {/* <div className="w-full flex items-center justify-center">
                <button onClick={handleSignOut} className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Sign Out</button>
            </div> */}

            <div className="max-w-screen-xl w-full flex flex-col mx-auto items-center">
                <div className="w-full justify-center items-center flex">
                    <h1 className="text-3xl font-bold uppercase py-6">Log in</h1>
                </div>
                <div className="w-full md:w-1/2 justify-center items-center">
                <form onSubmit={handleSubmit} noValidate>
                                <div className="relative mb-5">
                                    <input
                                        required
                                        className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                        type="email"
                                        name="email"
                                        value={inputs.email}
                                        onChange={handleInputChange}
                                        // onFocus={() => setEmailFocused(true)}
                                        // onBlur={handleInputBlur}
                                    />
                                    <label
                                        className={`absolute left-4 -mt-3 transition-all duration-300  ${isEmailFocused || inputs.email ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                            }`}
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <div className="relative mb-5">
                                        <input required
                                            className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            onChange={handleInputChange}
                                            // onFocus={() => setIsPasswordFocused(true)}
                                            // onBlur={handleInputBlur}
                                        />
                                        <label
                                            className={`absolute left-4 -mt-3 transition-all duration-300  ${isPasswordFocused || inputs.password ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                }`}
                                            htmlFor="email"
                                        >
                                            Password
                                        </label>
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 bottom-6 flex items-center mr-3 -mt-5 text-gray-400 cursor-pointer">
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </button>
                                        <div className="flex justify-between px-2 items-center">
                                            <div>
                                                <label htmlFor="rememberUser">Keep me signed in</label>
                                                <input className="ml-2" type="checkbox" id="rememberUser" checked={rememberUser} onChange={(e) => setRememberUser(e.target.checked)} />
                                            </div>
                                            <div>
                                                <span>Forgot password?</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-4 items-center justify-center">
                                        <button type="submit" className="bg-black text-white text-base py-3 w-full md:w-1/3 uppercase flex justify-center items-center tracking-wide rounded-md mx-auto hover:bg-secondary duration-300">Login</button>
                                    <div className="w-full flex items-center justify-center h-[1px] my-6 bg-gray-300">
                                        <p className="bg-white p-4">or use</p>
                                    </div>
                                    <div className="w-full">
                                    <LoginPopUps />
                                    </div>
                                    <Link className="flex flex-col justify-center items-center w-full gap-2" to="/register">
                                        <button className="bg-black text-white text-base py-3 px-6 tracking-wide rounded-md hover:bg-gray-800 duration-300">Don't have an account? Register</button>
                                    </Link>
                                    </div>
                                </div>
                            </form>
                </div>
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
