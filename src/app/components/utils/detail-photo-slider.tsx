"use client"; // If using Next.js App Router (optional)

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ImageProps {
  url: string;
}

interface DetailPostSliderProps {
  images: ImageProps[];
}

const DetailPostSlider: React.FC<DetailPostSliderProps> = ({ images }) => {
  const swiperRef = useRef<any>(null); // Reference to Swiper instance

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Swiper Component */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign Swiper instance
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="relative"
      >
        {images.map((post, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex justify-center">
              <img
                src={post.url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              <div
                className="absolute top-0 left-0 w-1/3 h-full cursor-pointer"
                onClick={() => swiperRef.current?.swiper?.slidePrev()}
              />

              {/* Right Click Area (Next Slide) */}
              <div
                className="absolute top-0 right-0 w-1/3 h-full cursor-pointer"
                onClick={() => swiperRef.current?.swiper?.slideNext()}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Click Area (Previous Slide) */}
    </div>
  );
};

export default DetailPostSlider;
