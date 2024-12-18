const buttoncss =
  "bg-gray-200 p-5 px-10 hover:bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-700 rounded-lg";

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { HiLocationMarker, HiUpload, HiX } from "react-icons/hi";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { reverseGeocode } from "../../services/reverseGeocode";
import { useAddHotel } from "./useAddHotel";

function AddHotel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [location, setLocation] = useState(null);
  const [room, setRoom] = useState([]);

  const { addhotel, isLoading } = useAddHotel();

  // Handle checkbox selection for facilities
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedFacilities((prev) => [...prev, name]);
    } else {
      setSelectedFacilities((prev) =>
        prev.filter((facility) => facility !== name)
      );
    }
  };

  // Handle file input
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]); // Store file objects directly
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !name ||
      !email ||
      !selectedFacilities ||
      !location ||
      !imageFiles ||
      !room.length
    ) {
      // Ensure all required fields are filled
      // alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      name,
      email,
      facilities: selectedFacilities,
      imageFiles, // Pass the hotel images
      rooms: room,
      location,
    };

    addhotel(formData); // Submit the form data
    setName("");
    setEmail("");
    setSelectedFacilities([]);
    setImageFiles([]);
    setLocation(null);
    setRoom([]);
  };

  return (
    <div className="p-10 rounded-lg h-screen">
      <div className="px-4 text-5xl font-black my-5">Add Hotel</div>
      <hr className="h-[2px] bg-gray-300 dark:bg-gray-900 mb-3 px-5" />

      <form
        onSubmit={handleSubmit}
        className="p-10 text-3xl dark:bg-gray-800 bg-gray-100 rounded-md space-y-6"
      >
        {/* Hotel Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b-gray-200 dark:border-b-gray-700 border-b py-2">
          <label className="font-medium">Hotel Name</label>
          <input
            className="dark:bg-gray-800 border border-gray-600 p-3 shadow-sm rounded col-span-2 w-[50dvh]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Hotel Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b-gray-200 dark:border-b-gray-700 border-b">
          <label className="font-medium">Hotel Email</label>
          <input
            className="dark:bg-gray-800 border border-gray-600 p-3 shadow-sm rounded col-span-2 w-[50dvh]"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Facilities */}
        <HotelFacilities
          onChange={handleCheckboxChange}
          setSelectedFacilities={setSelectedFacilities}
        />

        {/* Image Upload */}
        <ImageUpload onFileChange={handleFileChange} imageFiles={imageFiles} />

        {/* Map */}
        <MapPage location={location} setLocation={setLocation} />

        {/* Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b-gray-200 dark:border-b-gray-700 border-b py-5">
          <label className="font-medium">Add Rooms</label>
          <div className="col-span-2">
            <AddRoom setRoom={setRoom} room={room} />
          </div>

          {/* Display Rooms */}
          <div className="col-span-3 flex gap-5">
            {Array.isArray(room) && room.length > 0
              ? room.map((r, index) => (
                  <div
                    key={index}
                    className="relative border border-gray-400 p-5 rounded-md"
                  >
                    <button
                      onClick={() => {
                        setRoom((prevRooms) =>
                          prevRooms.filter(
                            (_, roomIndex) => roomIndex !== index
                          )
                        );
                      }}
                      className="absolute top-1 right-1 text-red-600 font-bold"
                    >
                      X
                    </button>
                    <p className="py-3">Room Type: {r.roomType}</p>
                    <p>Price: {r.price}</p>
                    <div className="flex gap-2">
                      {r.images.map((imgFile, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={URL.createObjectURL(imgFile)}
                          alt="Room"
                          className="w-32 h-32 object-cover mt-2"
                        />
                      ))}
                    </div>
                  </div>
                ))
              : "No Rooms"}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end p-5 gap-10 px-10">
          <button
            onClick={() => {
              setName("");
              setEmail("");
            }}
            className="bg-gray-200 p-5 px-10 hover:bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-zinc-400 p-5 px-10 dark:hover:bg-gray-900 hover:bg-gray-500 dark:bg-zinc-700 rounded-lg"
          >
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHotel;

function ImageUpload({ onFileChange, imageFiles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center dark:text-white dark:bg-gray-800 border-b-gray-200 dark:border-b-gray-700 border-b pb-5">
      <label className="text-3xl font-medium">Upload Images</label>

      <input
        id="file-upload"
        className="hidden"
        type="file"
        multiple
        onChange={onFileChange}
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer w-[50dvh] py-3 flex gap-5 justify-center items-center bg-gray-400  hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-900 border-b-gray-200 dark:border-b-gray-700 border-b text-black dark:text-white text-center rounded-md"
      >
        <div>
          <HiUpload />
        </div>
        <div>Upload Images</div>
      </label>

      {imageFiles.length > 0 && (
        <div className=" flex gap-3 flex-wrap">
          {imageFiles.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Image ${index + 1}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
function AddRoom({ setRoom, room }) {
  const [isOpen, setIsOpen] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  // Handle multiple image file input
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleAddRoom = () => {
    // Validate inputs
    if (roomType === "" || price === "" || images.length === 0) {
      alert("Please fill out all fields and select at least one image");
      return;
    }

    // Create a room object with multiple images
    const newRoom = {
      roomType,
      price,
      images, // Store the array of image files
    };

    // Add the new room to the rooms array
    setRoom((prevRooms) => [...prevRooms, newRoom]);

    // Clear the form and close the modal
    setRoomType("");
    setPrice("");
    setImages([]);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen ? (
        <>
          <div className="col-span-2"></div>
          <div>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Room Type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end gap-5 pr-10 mt-4">
            <button className={`${buttoncss}`} onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className={`${buttoncss}`} onClick={handleAddRoom}>
              Add Room
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-200 p-5 px-10 hover:bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-700 rounded-lg"
        >
          Add room
        </button>
      )}
    </div>
  );
}

function HotelFacilities({ selectedFacilities, onChange }) {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-3 items-center dark:text-white dark:bg-gray-800 border-b-gray-200 dark:border-b-gray-700 border-b pb-5">
      <label className="mb-4 text-3xl font-medium">Facilities</label>
      <div className="border border-gray-200 dark:border-gray-700 p-5 space-y-3 col-span-2  ">
        <div>
          <input
            type="checkbox"
            name="wifi"
            onChange={onChange}
            className="mr-2"
          />
          <label>Wifi</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="swimming pool"
            onChange={onChange}
            className="mr-2"
          />
          <label>Swimming pool</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="24 hour reception"
            onChange={onChange}
            className="mr-2"
          />
          <label>24 hour reception</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="breakfast offered"
            onChange={onChange}
            className="mr-2"
          />
          <label>Breakfast offered</label>
        </div>
      </div>
    </div>
  );
}

function MapPage({ location, setLocation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocationSelect = (location) => {
    setLocation(location);
    // console.log("Selected location:", location);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b-gray-200 dark:border-b-gray-700 border-b py-5">
      <label className="font-medium">Hotel Location</label>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-3 bg-gray-400 p-5 w-[40dvh] hover:bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-700 rounded-lg"
      >
        <div>
          <HiLocationMarker />
        </div>
        <div>Set Location</div>
      </button>
      <button
        onClick={() => setLocation(null)}
        className="bg-gray-400 p-5 w-[40dvh] px-10 hover:bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-700 rounded-lg"
      >
        reset location
      </button>

      {location && (
        <>
          <label className="font-medium">Selected Location</label>
          <div className="col-span-2">
            <p className="mt-4 pt-4">Latitude: {location.lat},</p>
            <p>
              Longitude:
              {location.lng}
            </p>
          </div>
        </>
      )}
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
}
function LocationModal({ isOpen, onClose, onLocationSelect }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState(""); // State to hold the address
  const [loadingAddress, setLoadingAddress] = useState(false); // State for loading status

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });
        onLocationSelect({ lat, lng });
        fetchAddress(lat, lng);
      },
    });

    return selectedLocation ? (
      <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
    ) : null;
  };

  async function fetchAddress(lat, lng) {
    setLoadingAddress(true);
    const address = await reverseGeocode({ lat, lng });
    setAddress(address);
    setLoadingAddress(false);
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Location</h2>
          <button onClick={onClose} className="text-gray-500">
            <HiX />
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          {loadingAddress
            ? "Loading address..."
            : selectedLocation
            ? address
            : "Click on the map below to select a location."}
        </p>
        <div className="h-[70dvh] w-full mb-4">
          <MapContainer
            center={[8.9, 38.7]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker />
          </MapContainer>
        </div>

        <div className="text-center dark:text-black">
          {selectedLocation ? (
            <div className="flex gap-5">
              <p>Latitude: {selectedLocation.lat},</p>
              <p>Longitude: {selectedLocation.lng}</p>
            </div>
          ) : (
            <div>no selected location</div>
          )}
        </div>
      </div>
    </div>
  );
}
