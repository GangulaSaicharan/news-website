// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import NewsTabsSlider from "@/app/components/utils/news-tab-slider";
// import StoryViewer from "@/app/components/utils/story-viewer";

// export default function TabsComponent() {
//   const [allNews, setAllNews] = useState<any>({
//     topNews: [],
//     trendingNews: [],
//     breakingNews: [],
//     stories: [],
//   }); // State to hold all categories of articles
//   const [loading, setLoading] = useState<boolean>(true); // State to show loading
//   const [activeTab, setActiveTab] = useState("trending"); // State for active tab

//   // Fetch all categories of news once, and store them
//   useEffect(() => {
//     const fetchArticles = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/category/`
//         );
//         console.log(response?.data, "response");

//         setAllNews({
//           topNews: response?.data.topNews || [],
//           trendingNews: response?.data.trendingNews || [],
//           breakingNews: response?.data.breakingNews || [],
//           stories: response?.data.stories || [],
//         });
//       } catch (error) {
//         console.error("Error fetching articles:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []); // Fetch data only once when the component mounts

//   const renderTabs = () => {
//     return (
//       <div className="w-full">
//         <StoryViewer stories={allNews.stories} />
//         <div className="mt-4 tabs flex justify-center space-x-4 mb-4">
//           {["top", "trending", "breaking"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 w-24 rounded-lg transition-all duration-300
//             ${
//               activeTab === tab
//                 ? "bg-red-500 text-white dark:bg-blue-400"
//                 : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
//             }`}
//             >
//               {tab === "top"
//                 ? "Top"
//                 : tab === "trending"
//                 ? "Trending"
//                 : "Breaking"}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Get the news for the active tab from the stored data
//   const activeNews = allNews[`${activeTab}News`];

//   return (
//     <div className="container mx-auto">
//       {/* Render Tab Navigation */}
//       {renderTabs()}

//       {/* Show loading text if articles are being fetched */}
//       {loading ? (
//         <div className="text-center my-6">Loading...</div>
//       ) : (
//         // Pass the active news articles to the NewsTabsSlider component
//         <NewsTabsSlider articles={activeNews} />
//       )}
//     </div>
//   );
// }

import StoryViewer from "@/app/components/utils/story-viewer";
import TabsClient from "./tabs-client";

// ✅ Fetch news data on the server
const fetchNewsData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/category`,
      {
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching news data:", error);
    return {
      topNews: [],
      trendingNews: [],
      breakingNews: [],
      stories: [],
    };
  }
};

export default async function TabsComponent() {
  // Fetch data before rendering
  const newsData = await fetchNewsData();

  return (
    <div className="container mx-auto">
      {/* Story Viewer */}
      <StoryViewer stories={newsData.stories} />

      {/* Client-side Tabs */}
      <TabsClient newsData={newsData} />
    </div>
  );
}
