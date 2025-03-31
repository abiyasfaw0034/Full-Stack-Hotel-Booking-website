/* eslint-disable no-unused-vars */

import { addDoc, query, Timestamp, where } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore();

// const uploadBooking = async ()=>{
//     const data = await addDoc(collection(db, "booking"), {
//         startDate:
//     })
// }
export async function addBooking({
  fullName,
  startDate,
  endDate,
  numGuests,
  roomPrice,
  userId,
  roomId,
  hotelId,
}) {
  try {
    const data = await addDoc(collection(db, "bookings"), {
      fullName,
      startDate: Timestamp.fromDate(new Date(startDate)), // Ensure correct date type
      endDate: Timestamp.fromDate(new Date(endDate)),
      numGuests,
      roomPrice,
      userId,
      roomId,
      hotelId,
      createdAt: Timestamp.now(),
    });
    return data; // Return document reference
  } catch (error) {
    console.error("Error adding booking: ", error);
    throw new Error("Failed to add booking");
  }
}
export async function getBooking(userId) {
  try {
    console.log("Fetching bookings for user:", userId);

    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const bookings = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const bookingData = docSnapshot.data();
        console.log("Booking Data:", bookingData); // Debug booking data

        let hotelName = "Unknown Hotel";
        let roomType = "Unknown Room Type";

        if (bookingData.hotelId) {
          console.log("Fetching hotel for ID:", bookingData.hotelId);
          const hotelRef = doc(db, "Hotels", bookingData.hotelId);
          const hotelSnap = await getDoc(hotelRef);
          if (hotelSnap.exists()) {
            const hotelData = hotelSnap.data();
            hotelName = hotelData.name || "Unnamed Hotel";

            // Find the room inside the hotel's rooms array
            if (hotelData.rooms && bookingData.roomId) {
              const room = hotelData.rooms.find(
                (r) => r.roomId === bookingData.roomId
              );
              if (room) {
                roomType = room.roomType || "Unknown Room Type";
              } else {
                console.warn(
                  `Room ID ${bookingData.roomId} not found in hotel ${hotelData.name}`
                );
              }
            }
          } else {
            console.warn("Hotel not found for ID:", bookingData.hotelId);
          }
        }

        return {
          id: docSnapshot.id,
          ...bookingData,
          hotelName,
          roomType, // Updated to use roomType
        };
      })
    );

    console.log("Final processed bookings:", bookings);
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    throw new Error("Failed to fetch bookings");
  }
}
