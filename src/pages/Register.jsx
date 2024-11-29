import { useEffect, useState } from "react";
import axios from "axios";
import useDeviceDetect from "../hooks/useDeviceDetect";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword";
import LoginPopUps from "../components/LoginPopUps";

const Register = () => {
  const [products, setProducts] = useState([]);
  const isMobile = useDeviceDetect();
  const [isContinueClicked, setIsContinueClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { handleGoogleLogin, handleSignOut, signInWithFacebook } =
    useFirebaseAuth();
  const selectedSexCategory = useSelector((state) => state.next.sexCategory);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.next.user);
  const error = useSelector((state) => state.next.error);

  const { signUp } = useSignUpWithEmailAndPassword();

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapiserver.reactbd.com/products"
        );
        setProducts(response.data);
        setIsRendered(true);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleContinueClick = () => {
    setIsContinueClicked(true);
  };

  const handleSubscribeChange = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleSignUp = async () => {
    const userDetails = { isSubscribed };

    await signUp(email, password, userDetails);

    const storedUser = JSON.parse(localStorage.getItem("user-info"));
    if (storedUser) {
      navigate(`/${selectedSexCategory}`);
    } else {
      console.error("User registration failed");
    }
  };

  return (
    <div>
      <div className="w-full md:max-w-screen-xl mx-auto flex flex-col md:flex-row mt-28 md:mt-36">
        {isMobile && (
          <div className="overflow-hidden mx-5 h-44 flex flex-col justify-center items-center">
            <div className="gap-3 grid grid-cols-3 animate-loop-scroll">
              {products.slice(0, 9).map((product, index) => (
                <img
                  key={index}
                  src={product.image}
                  className="w-40 h-40 object-cover"
                  alt={`Product ${index}`}
                />
              ))}
            </div>
            <div className="gap-3 mt-3 grid grid-cols-3 animate-loop-scroll aria-hidden:">
              {products.slice(9, 18).map((product, index) => (
                <img
                  key={index}
                  src={product.image}
                  className="w-40 h-40 object-cover"
                  alt={`Product ${index}`}
                />
              ))}
            </div>
          </div>
        )}
        {!isContinueClicked ? (
          <div className="md:w-1/3 w-full px-4 flex">
            <div className="w-full flex flex-col">
              <h1 className="text-2xl md:text-4xl font-bold">
                N3XT | Your only fashion world.
              </h1>
              <div className="mt-6">
                <div className="flex flex-col">
                  <label className="mb-2">Email</label>
                  <input
                    className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5"
                    type="text"
                    placeholder="Enter your email to login or register"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <button
                    onClick={handleContinueClick}
                    className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
                  >
                    Continue
                  </button>
                </div>
                <div className="w-full flex items-center justify-center h-[1px] my-10 bg-gray-300">
                  <p className="bg-white p-4">or</p>
                </div>
                <div className="flex flex-col justify-center items-center mb-5">
                  <Link to="/login">
                    <span className="text-sm text-gray-900 mb-5">
                      Already registered?{" "}
                      <span className="text-indigo-600 font-bold cursor-pointer">
                        Log In with Email
                      </span>
                    </span>
                  </Link>
                </div>
                <LoginPopUps />
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-1/3 w-full px-5 flex flex-col mb-20 md:mb-0">
            <div
              onClick={() => setIsContinueClicked(false)}
              className="flex font-bold w-20 h-10 items-center cursor-pointer"
            >
              <IoChevronBackOutline className="w-4 h-4" />
              <h3 className=" w-16  rounded-md  duration-300 ">Back</h3>
            </div>

            <h2 className="text-2xl font-bold">Create an account</h2>
            <div className="flex mb-5 mt-5 ">
              <img
                className="w-16 h-16"
                src="https://img.freepik.com/premium-vector/user-customer-avatar-vector-illustration_276184-160.jpg?w=740"
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-lg  mt-2 text-gray-600 font-bold">
                  {email}
                </h3>
                <h4
                  className="font-bold underline cursor-pointer"
                  onClick={() => setIsContinueClicked(false)}
                >
                  Change
                </h4>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Create a password</label>
              <input
                type="password"
                className="border-b-[2px] bg-gray-100 px-2 py-2 mb-5"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="flex items-start mb-2">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="mr-2"
                  checked={isSubscribed}
                  onChange={handleSubscribeChange}
                />
                <label
                  className="text-sm text-gray-600 mb-2"
                  htmlFor="subscribe"
                >
                  I would like to hear about products, services, and sales,
                  including personalized email alerts from Next. You can
                  unsubscribe at any time.
                </label>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                onClick={handleSignUp}
                className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
              >
                Sign up
              </button>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="overflow-hidden">
            <div className="gap-3 ml-10 grid grid-cols-3 animate-loop-scroll">
              {products.slice(0, 9).map((product, index) => (
                <img
                  key={index}
                  src={product.image}
                  className="w-60 h-60 object-cover"
                  alt={`Product ${index}`}
                />
              ))}
            </div>
            <div className="gap-3 mt-3 ml-10 grid grid-cols-3 animate-loop-scroll aria-hidden:">
              {products.slice(9, 18).map((product, index) => (
                <img
                  key={index}
                  src={product.image}
                  className="w-60 h-60 object-cover"
                  alt={`Product ${index}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
