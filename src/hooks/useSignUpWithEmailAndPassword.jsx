import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { addUser, setError } from "../redux/nextSlice";
import { auth, firestore } from "../firebase.config";

const useSignUpWithEmailAndPassword = () => {
  const signUp = (email, password, userDetails) => async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = {
        uid: user.uid,
        email: user.email,
        ...userDetails,
      };

      await setDoc(doc(firestore, "users", user.uid), userDoc);
      dispatch(addUser(userDoc));
      localStorage.setItem("user-info", JSON.stringify(userDoc));
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
    }
  };
  return { signUp };
};

export default useSignUpWithEmailAndPassword;
