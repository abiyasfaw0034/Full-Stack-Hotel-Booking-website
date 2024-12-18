import { onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export async function signup({ email, password }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
export async function isUserAuthenticated() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user); // Resolve the user object if authenticated
        } else {
          resolve(null); // Resolve null if not authenticated
        }
      },
      (error) => {
        console.error(error);
        reject(error); // Reject the promise if an error occurs
      }
    );
  });
}

// i didnt use this i used auth.js in firebase
