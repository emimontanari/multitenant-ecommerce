
import { Input } from "@/components/ui/input";
import {  SearchIcon } from "lucide-react";


// SearchInputProps - Props accepted by the SearchInput component
interface SearchInputProps {
    disabled?: boolean; // Optional flag to disable the input field
    defaultValue?: string | undefined; // Optional default value for the input field
    onChange?: (value: string) => void; // Optional callback to handle input changes
  }
  
  export const SearchInput = ({
    disabled,
    // defaultValue,
    // onChange,
  }: SearchInputProps) => {



    return(
        <div className="flex items-center gap-2 w-full">
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <Input 
                className="pl-8"
                placeholder="Search products"
                disabled={disabled}
                />
            </div>

            {/* <Button
            variant="elevated"
            className="size-12 shrink-0 flex lg:hidden">   
            <ListFilterIcon />
            </Button> */}
        </div>
    )
  }
