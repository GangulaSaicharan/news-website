// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import NewsCard from "../components/utils/news-card";
// import NoPostsCard from "../components/utils/no-posts-card";
// import { navigation, subCategories } from "../config/data";
// import Breadcrumbs, { Breadcrumb } from "../components/utils/bread-crumb";

// const Home = () => {
//   const [posts, setPosts] = useState<any>([]);
//   const [loading, setLoading] = useState<boolean>(true); // Store posts data
//   const [paths, setPaths] = useState<Breadcrumb[]>([]);
//   useEffect(() => {
//     const category = window.location.pathname.split("/")[1];

//     const fetchPosts = async () => {
//       if (!category) {
//         console.error("Category not found for this path");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/posts/${category}/`
//         );
//         console.log(response?.data, "response");
//         setPaths([
//           { title: "Home", path: "/" },
//           {
//             title:
//               navigation.find(
//                 (item) =>
//                   item.path === `/${window.location.pathname.split("/")[1]}`
//               )?.title || "",
//             path: `/${window.location.pathname.split("/")[1]}`,
//           },
//         ]);

//         console.log(response?.data?.data[0].createdAt, "createdAt");
//         setPosts(response?.data?.data || []); // Assuming the response contains posts array
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []); // Empty dependency array ensures this runs once when the component mounts

//   return (
//     <>
//       <Breadcrumbs breadcrumbs={paths} />

//       {loading ? (
//         <div>Loading...</div>
//       ) : posts?.length ? (
//         <div className="p-4">
//           {posts?.map((post: any) => (
//             <NewsCard
//               key={post._id}
//               title={post.title}
//               imageUrl={post?.images[0].url}
//               slug={`${post.category}/${post.slug}`}
//               publishedDate={post.createdAt}
//               subCategory={post.subcategory}
//               category={post.category}
//             />
//           ))}
//         </div>
//       ) : (
//         <NoPostsCard />
//       )}
//     </>
//   );
// };

// export default Home;

import { notFound } from "next/navigation";
import Breadcrumbs, { Breadcrumb } from "@/app/components/utils/bread-crumb";
import NewsCard from "@/app/components/utils/news-card";
import NoPostsCard from "@/app/components/utils/no-posts-card";
import { navigation } from "@/app/config/data";

// ✅ Fetch data on the server
const fetchPosts = async (category: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/posts/${category}/`,
      { cache: "no-store" } // Ensures fresh data
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

// ✅ Server Component (No Hydration Mismatch)
export default async function Home({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  // Fetch posts data on the server
  const posts = await fetchPosts(category);

  if (!posts) return notFound(); // Show 404 if no posts found

  // ✅ Breadcrumbs navigation (Ensures static titles for SSR)
  const paths: Breadcrumb[] = [
    { title: "Home", path: "/" },
    {
      title:
        navigation.find((item) => item.path === `/${category}`)?.title || "",
      path: `/${category}`,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={paths} />

      {posts.length ? (
        <div className="p-4">
          {posts.map((post: any) => (
            <NewsCard
              key={post._id}
              title={post.title}
              imageUrl={post?.images[0]?.url || ""}
              slug={`${post.category}/${post.slug}`}
              publishedDate={post.createdAt}
              subCategory={post.subcategory}
              category={post.category}
            />
          ))}
        </div>
      ) : (
        <NoPostsCard />
      )}
    </>
  );
}
