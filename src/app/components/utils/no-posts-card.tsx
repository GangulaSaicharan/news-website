"use client";

import React from "react";
import { Moon, Newspaper } from "lucide-react";

export default function NoPostsCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full">
        <Newspaper className="w-8 h-8 text-gray-500 dark:text-gray-300" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        No Posts Available
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        There are no news posts to display right now. Please check back later.
      </p>
      <button
        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
}
