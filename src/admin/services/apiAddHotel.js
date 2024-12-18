import { doc, setDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid"; // Use uuid for unique room IDs

async function doAddHotel(hotelData) {
  const {
    name,
    email,
    facilities,
    imageFiles = [], // Files for hotel images
    location,
    rooms = [], // Array of rooms
  } = hotelData;

  try {
    // Generate a unique ID for the hotel
    const hotelId = doc(collection(db, "demohotels")).id;

    // Create a folder called 'hotel' to store hotel images
    const hotelImageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const imageRef = ref(
          storage,
          `demohotels/${hotelId}/hotel/${file.name}`
        );
        await uploadBytes(imageRef, file);
        return await getDownloadURL(imageRef);
      })
    );

    // Upload each room's images and get URLs
    const roomsWithUrls = await Promise.all(
      rooms.map(async (room) => {
        const roomId = uuidv4(); // Generate a unique room ID for each room

        // Handle multiple images per room
        const roomImageUrls = await Promise.all(
          room.images.map(async (imageFile) => {
            const roomImageRef = ref(
              storage,
              `demohotels/${hotelId}/rooms/${roomId}/${imageFile.name}` // Store each room image in a separate folder
            );
            await uploadBytes(roomImageRef, imageFile);
            return await getDownloadURL(roomImageRef); // Get the image URL
          })
        );

        // Return room data with image URLs and roomId
        return {
          roomId, // Include roomId
          roomType: room.roomType,
          price: room.price,
          roomImageUrls, // Array of image URLs for the room
        };
      })
    );

    // Construct the hotel document data for Firestore
    const hotelDoc = {
      id: hotelId,
      name,
      email,
      facilities,
      hotelImageUrls, // Array of uploaded image URLs for the hotel
      rooms: roomsWithUrls, // Rooms with multiple image URLs and room IDs
      location,
    };

    const hotelRef = doc(db, "demohotels", hotelId);
    await setDoc(hotelRef, hotelDoc); // Save hotel with room data

    return hotelDoc;
  } catch (error) {
    console.error("Error adding hotel:", error);
    throw error;
  }
}

export default doAddHotel;
