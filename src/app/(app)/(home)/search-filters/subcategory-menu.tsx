import { Category } from "@/payload-types";
import Link from "next/link";

// SubcategoryMenuProps - Defines the props for the SubcategoryMenu component
interface SubcategoryMenuProps {
  category: Category; // The category object containing the subcategories to be displayed
  isOpen: boolean; // Indicates whether the dropdown menu is open or closed
  position: { top: number; left: number }; // Position where the menu should be rendered (top and left coordinates)
}

// SubcategoryMenu - Component to render the subcategory dropdown menu
export const SubcategoryMenu = ({
  category,
  isOpen,
  position,
}: SubcategoryMenuProps) => {
  // Exit early if dropdown is not open or there are no subcategories to show
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  // Use category color if provided, fallback to light gray
  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }} // Position the dropdown relative to viewport
    >
      {/* Invisible hover bridge to maintain dropdown on hover */}
      <div className="h-3 w-60" />

      {/* Dropdown content container */}
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        {/* List of subcategory links */}
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={"/"} // TODO: Replace with actual link to subcategory page
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};