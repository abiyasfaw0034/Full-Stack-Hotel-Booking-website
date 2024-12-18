/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { useParams } from "react-router-dom";
import { useHotel } from "../features/hotels/useHotel";
import Map from "../ui/Map";
import Spinner from "../ui/Spinner";
import RoomDetail from "../features/hotels/RoomDetail";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { useState } from "react";

function HotelDetail() {
  const { hotel, isLoading } = useHotel();
  if (!hotel)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    ); //it should be fetching

  const { name, roomsAvailable = [], imageUrls } = hotel;

  // carousel for the  photos

  if (isLoading) return <Spinner className="relative top-[30%]" />;
  return (
    <div className="grid h-screen grid-col-1 md:grid-cols-2 md:flex-row ">
      <div className="w-full md:w-full px-10">
        <ImageCarousel images={imageUrls} />
        {/* <img
          className="w-full mt-5 rounded-md h-[34rem]"
          src={imageUrls?.[0]}
          alt={name}
        /> */}
        <div className="text-sm sm:text-lg md:text-5xl p-8 font-black">
          {name}
        </div>
        <div className="text-sm sm:text-lg md:text-3xl py-2 px-8 font-bold">
          Rooms Available: {roomsAvailable.length}
        </div>

        {/* Render RoomDetail component for each room, this should be room.map ???? */}
        {roomsAvailable.map((room, index) => (
          <RoomDetail room={room} key={index} />
        ))}
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 h-screen md:fixed right-0 p-4 overflow-hidden">
        <Map />
      </div>
    </div>
  );
}

export default HotelDetail;
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// const ImageCarousel = ({ images }) => {
//   return (
//     <Carousel>
//       {images.map((image, index) => (
//         <div key={index}>
//           <img src={image} alt={`Slide ${index}`} />
//         </div>
//       ))}
//     </Carousel>
//   );
// };                         // have a pic like div under
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";
// const ImageCarousel = ({ images }) => {
//   return (
//     <AliceCarousel className="py-3">
//       {images.map((image, index) => (
//         <img src={image} alt={`Slide ${index}`} key={index} />
//       ))}
//     </AliceCarousel>
//   );
// };                         // the dots are far behind
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            className="h-[30rem] w-full px-5"
          />
        </div>
      ))}
    </Slider>
  );
};
