// import { db } from "./firebase"; // Import your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Function to view a hotel by name
export async function doViewHotel(hotelName) {
  if (!hotelName) {
    throw new Error("Hotel name is required");
  }

  try {
    const hotelQuery = query(
      collection(db, "demohotels"),
      where("name", "==", hotelName)
    );
    const querySnapshot = await getDocs(hotelQuery);

    if (querySnapshot.empty) {
      throw new Error("Hotel not found");
    }

    const hotelDoc = querySnapshot.docs[0].data();
    // console.log("Hotel details:", hotelDoc);

    // Assuming hotelDoc contains an 'imageUrls' field with the images
    return hotelDoc || []; // Return the array of image URLs
  } catch (error) {
    console.error("Error fetching hotel:", error);
    throw error;
  }
}
