import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_WEBSITE_URL || "https://yourwebsite.com";
  const apiUrl = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/posts`;

  let posts: {
    slug: string;
    updatedAt: string;
    category: string;
    images?: { url: string }[];
  }[] = [];

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (response.ok) {
      const data = await response.json();
      posts = data?.data || [];
    }
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `https://twitter.com/yourprofile`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `https://facebook.com/yourpage`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `https://instagram.com/yourprofile`,
      lastModified: new Date(),
      priority: 0.6,
    },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/${post.category}/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "daily",
    priority: 0.7,
    images: post.images ? post.images.map((image) => image.url) : [], // ✅ Fix: Convert to string[]
  }));

  return [...staticUrls, ...postUrls];
}
