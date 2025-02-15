import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs, { Breadcrumb } from "@/app/components/utils/bread-crumb";
import NewsDetailCard from "@/app/components/utils/news-detail-card";
import { navigation } from "@/app/config/data";

// ✅ Fetch post data from API

const fetchPost = async (category: string, slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/post/?category=${category}&slug=${slug}`,
      { cache: "no-store" } // Ensure fresh data every request
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

// ✅ Generate Metadata (for SEO & Social Media)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  // const { category, slug } = params; // ✅ No more async issue
  const post = await fetchPost(category, slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.subtitle || "Read the latest news",
    openGraph: {
      type: "article",
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${category}/${slug}`,
      title: post.title,
      description: post.subtitle,
      images: [
        {
          url: post.images?.[0]?.url || "/default-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourtwitterhandle",
      title: post.title,
      description: post.subtitle,
      images: [post.images?.[0]?.url || "/default-image.jpg"],
    },
  };
}

// ✅ Server Component (Fixes Hydration Mismatch)
export default async function DetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params; // ✅ Await the params

  // Fetch post data on the server before rendering
  const post = await fetchPost(category, slug);

  if (!post) return notFound(); // Show 404 page if post is missing

  // Breadcrumbs navigation
  const paths: Breadcrumb[] = [
    { title: "Home", path: "/" },
    {
      title:
        navigation.find((item) => item.path === `/${category}`)?.title || "",
      path: `/${category}`,
    },
    { title: post.title, path: `/${category}/${slug}` },
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={paths} />
      <NewsDetailCard
        key={post._id}
        title={post.title}
        publishedDate={post.createdAt}
        images={post.images}
        content={post.content}
        subCategory={post.subcategory}
        category={post.category}
      />
    </div>
  );
}
