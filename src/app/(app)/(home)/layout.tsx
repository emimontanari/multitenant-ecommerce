import { Category } from "@/payload-types";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilter } from "./search-filters";
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}
const LayoutHome = async ({ children }: Props) => {

  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false
      }
    },
    sort: "name"
  })

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category), // Cast to Category since depth: 1 ensures proper typing
      subcategories: undefined, // Prevent further nesting for simplicity
    })),
  }));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutHome;
