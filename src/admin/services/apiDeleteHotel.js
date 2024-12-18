import {
  doc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { ref, listAll, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";

// Function to delete a hotel by name
export async function doDeleteHotel(hotelName) {
  try {
    // Query Firestore for the hotel by name
    const hotelQuery = query(
      collection(db, "demohotels"),
      where("name", "==", hotelName)
    );
    const querySnapshot = await getDocs(hotelQuery);

    if (querySnapshot.empty) {
      throw new Error("Hotel not found");
    }

    const hotelDoc = querySnapshot.docs[0];
    const hotelId = hotelDoc.id;

    // Delete the hotel document from Firestore
    await deleteDoc(doc(db, "demohotels", hotelId));

    // Delete the images associated with the hotel from Firebase Storage
    const storageRef = ref(storage, `demohotels/${hotelId}`);
    const list = await listAll(storageRef);

    const deletePromises = list.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);

    console.log("Hotel deleted successfully");
  } catch (error) {
    console.error("Error deleting hotel:", error);
    throw error;
  }
}
