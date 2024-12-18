import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore();

export const getHotels = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "hotels"));
    const hotels = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return hotels;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw new Error("Unable to fetch hotels");
  }
};

export const getHotel = async (hotelId) => {
  try {
    const docRef = doc(db, "hotels", hotelId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such hotel found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching hotel:", error);
    throw new Error("Unable to fetch the hotel");
  }
};
