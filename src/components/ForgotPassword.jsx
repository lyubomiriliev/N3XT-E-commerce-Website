import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email || userReset);
    setEmailSent(true);
    navigate("/login");
    alert("Check your email");
  };

  const userReset = localStorage.getItem("rememberedUser");

  return (
    <div className="mt-40">
      <div className="min-h-screen flex justify-center py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-4xl font-bold text-gray-900">
              Forgot Password
            </h1>
            <div className="mt-6">
              <form
                className="mt-8 flex flex-col"
                onSubmit={handleResetPassword}
              >
                <div className="grid grid-cols-1 gap-y-4">
                  <input
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    type="email"
                    placeholder="Your email"
                    value={email || userReset}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white text-base mt-5 py-3 px-8 tracking-wide rounded-md self-center w-2/3 hover:bg-secondary duration-300"
                >
                  Reset
                </button>
              </form>
              {emailSent && <p className="mt-4 text-green-600">Reset</p>}
              <div className="flex justify-center mt-8">
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-secondary"
                >
                  Go back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
