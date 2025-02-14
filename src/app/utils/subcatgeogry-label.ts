import { subCategories } from "../config/data";

// Function to get the label based on the main category slug and subcategory value
export const getSubCategoryLabel = (
  subcategoryValue: string,
  mainCategorySlug: string
): string | null => {
  // Find the subcategory list for the main category
  const subcategoryList = subCategories[mainCategorySlug];

  // If the category doesn't exist, return null
  if (!subcategoryList) {
    return null;
  }

  // Search for the subcategory with the given value
  const subcategory = subcategoryList.find(
    (sub) => sub.value === subcategoryValue
  );

  // Return the label if found, otherwise return null
  return subcategory ? subcategory.label : "Hyderabad";
};
