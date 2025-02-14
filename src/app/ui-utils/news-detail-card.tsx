import React from "react";
import { Text } from "./text";
import { Heading } from "./heading";
import DetailPostSlider from "../components/utils/detail-photo-slider";
// import DetailPostSlider from "./detail-photo-slider";

const NewsDetailCard = ({
  images,
  title,
  publishedDate,
  content,
}: {
  images: [];
  title: string;
  publishedDate: string;
  content: string;
}) => {
  return (
    <div className="max-w-xl mx-auto rounded-2xl overflow-hidden p-4">
      {/* Image Section */}
      <Heading>{title}</Heading>
      <Text className="text-sm mt-2">
        Published on {new Date(publishedDate).toLocaleDateString()} by
        application
      </Text>
      <div className="h-full w-full mt-3">
        {/* <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        /> */}
        <DetailPostSlider images={images} />
      </div>

      {/* Content Section */}
      <div className="pt-4">
        {/* News Content */}
        <div className="text-gray-700 dark:text-gray-300 leading-7 space-y-4">
          {content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailCard;
