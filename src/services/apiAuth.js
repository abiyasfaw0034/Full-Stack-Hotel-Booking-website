// import { onAuthStateChanged } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// import { db } from "../firebase/firebase"; // Import Firestore
// import { doc, setDoc } from "firebase/firestore"; // Firestore methods

// export async function signup({ email, password, additionalData }) {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Store additional user data in Firestore
//     await setDoc(doc(db, "users", user.uid), {
//       email: user.email,
//       ...additionalData, // store additional user data
//     });

//     return user;
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.message);
//   }
// }

// export async function isUserAuthenticated() {
//   return new Promise((resolve, reject) => {
//     onAuthStateChanged(
//       auth,
//       (user) => {
//         if (user) {
//           resolve(user); // Resolve the user object if authenticated
//         } else {
//           resolve(null); // Resolve null if not authenticated
//         }
//       },
//       (error) => {
//         console.error(error);
//         reject(error); // Reject the promise if an error occurs
//       }
//     );
//   });
// }

// // i didnt use this i used auth.js in firebase
