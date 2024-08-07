import { Categories } from "../components/Categories";
import { FeaturedServices } from "../components/FeaturedServices";
import Search from "../components/Search";
import { categories } from "@/data/categories";
import { useLoaderData } from "react-router-dom";

async function loader() {
  return { categoriesFromLoader: categories };
}

export default function Home() {
  const { categoriesFromLoader } = useLoaderData();

  return (
    <main className="mt-14 md:mt-20  flex-grow ">
      <Search />
      <Categories categories={categoriesFromLoader} />
      <FeaturedServices />
    </main>
  );
}

Home.loader = loader;
