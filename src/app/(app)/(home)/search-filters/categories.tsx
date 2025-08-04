import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";


interface CategoriesProps {
  data: any
}

// Categories - Renders a list of category dropdown buttons for filtering
export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {/* Loop through each category and render a CategoryDropdown */}
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category} // The individual category object
              isActive={false} // Currently hardcoded - can be used for active styles
              isNavigationHovered={false} // Currently hardcoded - reserved for hover state logic
            />
          </div>
        ))}
      </div>
    </div>
  );
};