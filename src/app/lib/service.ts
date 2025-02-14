const apiService = async (
  endpoint: string,
  options: RequestInit = {},
  cacheStrategy: "no-store" | "force-cache" | "default" = "default" // Allow dynamic caching
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/api${endpoint}`,
      {
        ...options,
        cache: cacheStrategy, // Apply dynamic cache strategy
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

export default apiService;
