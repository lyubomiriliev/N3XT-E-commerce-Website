import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../redux/nextSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

const useFirebaseAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider
    const [isSigningIn, setIsSigningIn] = useState(false);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        if (isSigningIn) return;

        setIsSigningIn(true);
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            dispatch(addUser({
                _id: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            }))
            setTimeout(() => {
                navigate(`/${selectedSexCategory}`);
            }, 600)
        }).catch((error) => {
            console.log(error);
            setIsSigningIn(false);
        }).finally(() => {
            setIsSigningIn(flase);
        })
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser());
            localStorage.removeItem("user-info");
            navigate(`/${selectedSexCategory}`);
            toast.success("Log Out Successfully");
        }).catch((error) => {
            console.log(error);
        })
    }

    const signInWithFacebook = async () => {
        const provider = new FacebookAuthProvider();

        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            const userDoc = {
                _id: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            };
            setDoc(doc(firestore, "users", user.uid), userDoc)
            dispatch(addUser(userDoc));
            localStorage.setItem("user-info", JSON.stringify(userDoc));
            toast.success("Logged In Successfully");
            setTimeout(() => {
                navigate("/women");
            }, 600)
        }).catch((error) => {
            console.log(error);
        })
    }

    return {
        handleGoogleLogin,
        handleSignOut,
        signInWithFacebook
    };
}

export default useFirebaseAuth
