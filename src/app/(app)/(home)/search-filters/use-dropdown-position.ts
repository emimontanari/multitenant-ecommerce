import { RefObject } from "react";

// useDropdownPosition - Hook to calculate the top and left coordinates for positioning a dropdown
export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () => {
        // If the ref is not attached to any element, return default position
        if (!ref.current) return { top: 0, left: 0 };

        const rect = ref.current.getBoundingClientRect(); // Get trigger element's position and size
        const dropdownWidth = 240; // Assumed dropdown width (15rem)

        // Initial left and top positions based on the trigger element
        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // Adjust left position if dropdown overflows the viewport
        if (left + dropdownWidth > window.innerWidth) {
            // Try to align it to the right edge of the trigger
            left = rect.right + scrollX - dropdownWidth;

            // If it still overflows, adjust to fit within the viewport with padding
            if (left < 0) {
                left = window.innerWidth - dropdownWidth - 16; // Add right margin to ensure dropdown fits within the screen
            }

            // As a final fallback, stick it to the left with padding
            if (left < 0) {
                left = 16; // Minimum left margin to avoid overlap with the viewport edge
            }
        }

        return { top, left };
    };

    return { getDropdownPosition };
};