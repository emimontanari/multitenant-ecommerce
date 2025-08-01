"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";





interface CategoryDropdownProps {
    category: any; 
    isActive?: boolean;
    isNavigationHovered: boolean;
}
  
  export const CategoryDropdown = ({
    category,
    isActive,
    isNavigationHovered,
  }: CategoryDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null)
    const {getDropdownPosition} = useDropdownPosition(dropdownRef)

    const OnMouseEnter = () => {
        if(category.subcategories) {
            setIsOpen(true)
        }
    }

    const onMouseLeave = () => setIsOpen(false)

    const dropdownPosition = getDropdownPosition(); // Fetch calculated position based on the dropdown's reference

    return(
    <div
      className="relative"
      ref={dropdownRef} // Attach the ref to this container for position calculations
      onMouseEnter={OnMouseEnter}
      onMouseLeave={onMouseLeave} 
    >
      <div className="relative">
        {/* Button component to display the category */}
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary", // Highlight active button when not hovered
            isOpen &&
              "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px] transition-all" // Stay the hover shadow and offset when dropdown is open
          )}
        >
          {/* // Display the category name as a link to its respective page */}
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>

        {/* Render a triangle indicator below the button to signal dropdown visibility */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          ></div>
        )}
      </div>

      {/* Conditionally render the SubcategoryMenu based on dropdown state (open or closed)
      <SubcategoryMenu
        category={category}
        isOpen={isOpen} // Pass state to determine whether the menu should be visible
      /> */}
    </div>
    )
  }