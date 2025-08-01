import { Category } from "@/payload-types"
import { CategoryDropdown } from "./category-dropdown"

interface CategoriesProps {
    data: any
  }
  
  export const Categories = ({ data }: CategoriesProps) => {

    console.log(data)
    return(
        <div>
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category} // Category object for dropdown
              isActive={false} // Mark as active if matches current active category
              isNavigationHovered={false} // Pass shared hover state
            />
          </div>
        ))}
        </div>
    )
  }