import Breadcrumbs from "@/app/components/utils/bread-crumb";
import NewsCard from "@/app/components/utils/news-card";
import NoPostsCard from "@/app/components/utils/no-posts-card";
import TabsComponent from "./tabs";

const fetchPosts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/posts/`,
      { cache: "no-store" } // Ensures fresh data on each request
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

const HomeComponent = async () => {
  const posts = await fetchPosts();
  // const { data } = await apiService("/site/posts/");

  // const posts = data?.data || [];

  return (
    <>
      {/* <Breadcrumbs
        className="px-2"
        breadcrumbs={[{ title: "Home", path: "/" }]}
      /> */}
      <TabsComponent />
      {posts.length ? (
        <div className="p-4 w-full">
          {posts.map((post: any) => (
            <NewsCard
              key={post._id}
              title={post.title}
              imageUrl={post?.images[0]?.url}
              slug={`${post.category}/${post.slug}`}
              subCategory={post.subcategory}
              publishedDate={post.createdAt}
              category={post.category}
            />
          ))}
        </div>
      ) : (
        <NoPostsCard />
      )}
    </>
  );
};

export default HomeComponent;
