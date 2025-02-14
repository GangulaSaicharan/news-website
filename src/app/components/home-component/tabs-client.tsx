"use client";

import { useState } from "react";
import NewsTabsSlider from "@/app/components/utils/news-tab-slider";

export default function TabsClient({ newsData }: { newsData: any }) {
  const [activeTab, setActiveTab] = useState("trendingNews"); // Default to Trending

  const tabOptions = [
    { key: "topNews", label: "Top" },
    { key: "trendingNews", label: "Trending" },
    { key: "breakingNews", label: "Breaking" },
  ];

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="mt-4 flex justify-center space-x-4 mb-4">
        {tabOptions.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 w-24 rounded-lg transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-red-500 text-white dark:bg-blue-400"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Show News Content Based on Active Tab */}
      <NewsTabsSlider articles={newsData[activeTab]} />
    </div>
  );
}
