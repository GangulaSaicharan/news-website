// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";

// // Define the type for the breadcrumb object
// export interface Breadcrumb {
//   path: string;
//   title: string;
// }

// // Define the type for the props
// export interface BreadcrumbsProps {
//   breadcrumbs: Breadcrumb[];
//   className?: string;
// }

// const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
//   breadcrumbs,
//   className,
// }) => {
//   const router = useRouter();

//   return (
//     <nav
//       aria-label="breadcrumb"
//       className={`w-full mb-2 mt-2 px-4 ${className}`}
//     >
//       <ol className="flex text-sm">
//         {breadcrumbs.map((breadcrumb, index) => (
//           <li key={index} className="flex items-center">
//             {index > 0 && (
//               <span
//                 className="text-gray-400 dark:text-gray-600 mx-2"
//                 aria-hidden="true"
//               >
//                 /
//               </span>
//             )}
//             {index === breadcrumbs.length - 1 ? (
//               <span
//                 className="text-red-500 dark:text-blue-400 font-medium whitespace-nowrap"
//                 aria-current="page"
//               >
//                 {breadcrumb.title}
//               </span>
//             ) : (
//               <button
//                 onClick={() => router.push(breadcrumb.path)}
//                 className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-blue-400 whitespace-nowrap"
//               >
//                 {breadcrumb.title}
//               </button>
//             )}
//           </li>
//         ))}
//       </ol>
//     </nav>
//   );
// };

// export default Breadcrumbs;

"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Define the type for the breadcrumb object
export interface Breadcrumb {
  path: string;
  title: string;
}

// Define the type for the props
export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbs,
  className,
}) => {
  const router = useRouter();

  return (
    <nav
      aria-label="breadcrumb"
      className={`w-full mb-2 mt-2 px-4 overflow-hidden ${className}`}
    >
      <ol className="flex text-sm flex-wrap items-center overflow-x-auto whitespace-nowrap">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center truncate max-w-[200px]">
            {index > 0 && (
              <span
                className="text-gray-400 dark:text-gray-600 mx-2"
                aria-hidden="true"
              >
                /
              </span>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span
                className="text-red-500 dark:text-blue-400 font-medium truncate"
                aria-current="page"
                title={breadcrumb.title}
              >
                {breadcrumb.title}
              </span>
            ) : (
              <button
                onClick={() => router.push(breadcrumb.path)}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-blue-400 truncate"
                title={breadcrumb.title}
              >
                {breadcrumb.title}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
