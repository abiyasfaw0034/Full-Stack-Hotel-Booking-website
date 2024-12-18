/* eslint-disable no-unused-vars */

import { addDoc, Timestamp } from "firebase/firestore";
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
