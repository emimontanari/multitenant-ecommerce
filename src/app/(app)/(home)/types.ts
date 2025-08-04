import { Category } from "@/payload-types";

// CustomCategory - Extends the base Category type to include an array of subcategories
export type CustomCategory = Category & {
    subcategories: Category[]; // List of subcategories under the main category
};