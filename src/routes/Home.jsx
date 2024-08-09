import { Categories } from "../components/Categories";
import { FeaturedServices } from "../components/FeaturedServices";
import Search from "../components/Search";
import { categories } from "@/data/categories";
import { useLoaderData } from "react-router-dom";
import { services } from "@/data/services";

async function loader() {
  return { 
    categoriesFromLoader: categories,
    servicesFromLoader: services
   };
}

export default function Home() {
  const { categoriesFromLoader, servicesFromLoader } = useLoaderData();

  return (
    <main className="flex-grow ">
      <Search/>
      <Categories categories={categoriesFromLoader} />
      <FeaturedServices services={servicesFromLoader}/>
    </main>
  );
}

Home.loader = loader;
