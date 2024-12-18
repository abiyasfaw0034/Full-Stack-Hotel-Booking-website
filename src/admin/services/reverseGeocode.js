// https://nominatim.openstreetmap.org/reverse?lat=LATITUDE&lon=LONGITUDE&format=json

export async function reverseGeocode({ lat, lng }) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("An error occurred:", error.message);
    return "Error fetching address";
  }
}
