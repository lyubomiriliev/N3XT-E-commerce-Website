import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { addUser, setError } from "../redux/nextSlice";
import { auth, firestore } from "../firebase.config";
import { useDispatch } from "react-redux";

const useSignUpWithEmailAndPassword = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const signUp = async (email, password, userDetails) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const currentDate = new Date().toISOString();
      const userData = {
        uid: user.uid,
        email: user.email,
        memberSince: currentDate,
        ...userDetails,
      };

      await setDoc(doc(firestore, "users", user.uid), userData);
      dispatch(addUser(userData));
      localStorage.setItem("user-info", JSON.stringify(userData));
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
    }
  };
  return { signUp };
};

export default useSignUpWithEmailAndPassword;
