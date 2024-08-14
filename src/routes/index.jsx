import { Categories } from "../components/Categories";
import { FeaturedServices } from "../components/FeaturedServices";
import Search from "../components/Search";
import { useLoaderData } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

async function loader() {
  const categoriesResponse = await fetch(`${API_URL}/categories`);

  const servicesResponse = await fetch(`${API_URL}/products/random`);

  const categories = await categoriesResponse.json();
  console.log(categories);

  const services = await servicesResponse.json();

  return {
    categories,
    services,
  };
}

export default function Home() {
  const { categories, services } = useLoaderData();

  return (
    <main className=" mt-14  md:mt-20 ">
      <Search />
      <Categories categories={categories} />
      <FeaturedServices services={services} />
    </main>
  );
}

Home.loader = loader;
