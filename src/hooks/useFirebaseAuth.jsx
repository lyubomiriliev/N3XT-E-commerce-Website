import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser, resetCart } from "../redux/nextSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

const useFirebaseAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const selectedSexCategory = useSelector((state) => state.next.sexCategory);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    if (isSigningIn) return;

    setIsSigningIn(true);

    const loginMethod = isMobile ? signInWithRedirect : signInWithPopup;

    loginMethod(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const currentDate = new Date().toISOString();
        const userDoc = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          memberSince: currentDate,
        };
        setDoc(doc(firestore, "users", user.uid), userDoc);
        dispatch(addUser(userDoc));
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        setTimeout(() => {
          navigate(`/${selectedSexCategory}`);
        }, 600);
        toast.success("Logged In Successfully");
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  };

  const signInWithFacebook = async () => {
    const loginMethod = isMobile ? signInWithRedirect : signInWithPopup;

    loginMethod(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        const userDoc = {
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        setDoc(doc(firestore, "users", user.uid), userDoc);
        dispatch(addUser(userDoc));
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        toast.success("Logged In Successfully");
        setTimeout(() => {
          navigate("/women");
        }, 600);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed. Please try again.");
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        dispatch(resetCart());
        localStorage.removeItem("user-info");
        localStorage.removeItem("profilePicture");
        localStorage.removeItem("accountData");
        toast.success("Log Out Successfully");
        navigate(`/${selectedSexCategory}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to log out. Please try again.");
      });
  };

  return {
    handleGoogleLogin,
    handleSignOut,
    signInWithFacebook,
  };
};

export default useFirebaseAuth;
