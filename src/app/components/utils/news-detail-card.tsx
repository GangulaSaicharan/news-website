"use client";

import React from "react";
import { CustomSmallText, Text } from "../../ui-utils/text";
import { Heading } from "../../ui-utils/heading";
import DetailPostSlider from "./detail-photo-slider";
import { getSubCategoryLabel } from "@/app/utils/subcatgeogry-label";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

interface NewsDetailCardProps {
  images: { url: string }[];
  title: string;
  publishedDate: string;
  content: string;
  subCategory: string;
  category: string;
}

const NewsDetailCard = ({
  images,
  title,
  publishedDate,
  content,
  subCategory,
  category,
}: NewsDetailCardProps) => {
  // Get current URL for sharing
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  // Share Handlers
  const shareOnSocial = (platform: string) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          pageUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          pageUrl
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          title + " " + pageUrl
        )}`;
        break;
      case "instagram":
        // Instagram doesn't support direct URL sharing, so we show an alert
        alert("Instagram does not support direct URL sharing.");
        return;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto rounded-2xl overflow-hidden p-4 pt-0">
      {/* News Title and Metadata */}
      <Heading>{title}</Heading>
      <CustomSmallText className="text-xsm text-red-500">
        {getSubCategoryLabel(subCategory, category)}
      </CustomSmallText>
      <Text className="text-sm mt-2">
        Published on {new Date(publishedDate).toLocaleDateString()} by
        application
      </Text>

      {/* News Images Slider */}
      <div className="h-full w-full mt-3">
        <DetailPostSlider images={images} />
      </div>

      {/* News Content */}
      <div className="pt-4 text-gray-700 dark:text-gray-300 leading-7 space-y-4">
        {content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Social Media Share Section */}
      <div className="mt-6">
        <p className="text-center text-lg font-semibold mb-2">
          Share this article
        </p>
        <div className="flex justify-center space-x-4">
          <FaWhatsapp
            onClick={() => shareOnSocial("whatsapp")}
            className="w-7 h-7 cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <FaFacebook
            onClick={() => shareOnSocial("facebook")}
            className="w-7 h-7 cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <FaTwitter
            onClick={() => shareOnSocial("twitter")}
            className="w-7 h-7 cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <FaInstagram
            onClick={() => shareOnSocial("instagram")}
            className="w-7 h-7 cursor-pointer hover:scale-110 transition-all duration-300"
          />
        </div>
      </div>

      {/* Social Media Follow Section */}
      <div className="mt-6">
        <p className="text-center text-lg font-semibold mb-2">Follow us on</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <FaYoutube className="w-8 h-8 text-red-500 cursor-pointer hover:scale-110 transition-all duration-300" />
            <span className="mt-1 text-sm">YouTube</span>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <FaInstagram className="w-8 h-8 text-pink-500 cursor-pointer hover:scale-110 transition-all duration-300" />
            <span className="mt-1 text-sm">Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <FaFacebook className="w-8 h-8 text-blue-600 cursor-pointer hover:scale-110 transition-all duration-300" />
            <span className="mt-1 text-sm">Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailCard;
