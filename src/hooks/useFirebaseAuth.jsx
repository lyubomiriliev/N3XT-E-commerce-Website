import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../redux/nextSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const useFirebaseAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider
    const [isSigningIn, setIsSigningIn] = useState(false);

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
                navigate("/women");
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
            toast.success("Log Out Successfully");
            dispatch(removeUser());
        }).catch((error) => {
            console.log(error);
        })
    }

    return {
        handleGoogleLogin,
        handleSignOut,
    };
}

export default useFirebaseAuth
