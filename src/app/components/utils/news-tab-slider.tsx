"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface NewsArticle {
  title: string;
  slug: string;
  imageUrl: string;
}

interface NewsSliderProps {
  articles: NewsArticle[];
}

const NewsTabsSlider: React.FC<NewsSliderProps> = ({ articles }) => {
  const router = useRouter();

  // Handle title click (navigating to the article page)
  const handleTitleClick = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-1 px-4">
      <Swiper
        modules={[Autoplay, Pagination]} // Removed Navigation module
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Auto-rotate every 5 seconds
        loop={true} // Infinite loop
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {/* Image Section */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 object-cover rounded-md"
              />
              {/* Title Banner */}
              <div
                onClick={() => handleTitleClick(article.slug)}
                className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white text-center cursor-pointer rounded-b-md"
              >
                <h3 className="text-xl font-semibold">{article.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsTabsSlider;
