"use client"; // If using Next.js App Router
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Image {
  url: string;
}
interface Story {
  title: string;
  images: Image[];
  slug: string;
}

interface StoryViewerProps {
  stories: Story[];
}

const StoryViewer = ({ stories }: StoryViewerProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  // Handle Back Button & Prevent Background Scroll
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
      window.history.pushState({ modalOpen: true }, ""); // Add history entry
    } else {
      document.body.style.overflow = "auto";
    }

    const handleBackButton = () => {
      setSelectedStory(null);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      document.body.style.overflow = "auto";
    };
  }, [selectedStory]);

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Story Thumbnails */}
      <div className="w-full flex space-x-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory p-2 flex-nowrap">
        {stories.map((story, index) => (
          <div
            key={index}
            className="cursor-pointer flex flex-col items-center snap-start"
            onClick={() => setSelectedStory(story)}
          >
            <div className="w-20 h-20 md:w-20 md:h-20 rounded-full border-2 border-red-500 p-1">
              <img
                src={story?.images[0]?.url}
                alt={story.title}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Full Story Viewer */}
      {selectedStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[9999]"
          onClick={() => setSelectedStory(null)} // Close on backdrop click
        >
          <div
            className="relative w-full max-w-sm mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign Swiper instance
              modules={[Autoplay, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              autoplay={
                isPlaying ? { delay: 3000, disableOnInteraction: false } : false
              }
              pagination={{ clickable: true, type: "progressbar" }}
              className="rounded-lg overflow-hidden max-h-[85vh]"
            >
              {selectedStory?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[85vh] bg-black">
                    <img
                      src={image.url}
                      alt={selectedStory.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Left & Right Clickable Areas */}
                    <div
                      className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
                      onClick={() => swiperRef.current?.slidePrev()} // Go to previous slide
                    />
                    <div
                      className="absolute top-0 right-0 w-1/2 h-full cursor-pointer"
                      onClick={() => swiperRef.current?.slideNext()} // Go to next slide
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
