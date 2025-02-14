"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image from Next.js
import { timeAgo } from "@/app/utils/time-ago";
import { CustomSmallText, SmallText } from "@/app/ui-utils/text";
import { getSubCategoryLabel } from "@/app/utils/subcatgeogry-label";

interface NewsCardProps {
  imageUrl: string;
  title: string;
  slug: string;
  publishedDate: string;
  subCategory: string;
  category: string;
}

export default function NewsCard({
  subCategory,
  imageUrl,
  title,
  slug,
  publishedDate,
  category,
}: NewsCardProps) {
  return (
    <Link href={slug} className="block w-full">
      <div className="w-full flex flex-row items-center h-24 py-3 border-b border-gray-300 dark:border-gray-700 ">
        {/* Left Side: Image */}
        <div className="flex-shrink-0 h-full w-28 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={112} // Equivalent to w-28 (28 * 4px)
            height={96} // Equivalent to h-24 (24 * 4px)
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side: Title */}
        <div
          className="ml-4 flex flex-col justify-center"
          style={{ maxWidth: "calc(100% - 8rem)" }}
        >
          <div className="flex justify-between items-center">
            <CustomSmallText className="text-xsm text-red-500">
              {getSubCategoryLabel(subCategory, category)}
            </CustomSmallText>
            <SmallText className="text-xsm">{timeAgo(publishedDate)}</SmallText>
          </div>

          {/* Title with truncation in two lines */}
          <h3
            className="w-full text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-red-500 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // Limits the title to two lines
            }}
          >
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
