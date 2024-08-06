import { Categories } from "../components/Categories";
import { FeaturedServices } from "../components/FeaturedServices";
import Search from "../components/Search";

const Home = () => {
  return (
    <main className="mt-14 md:mt-20  flex-grow ">
      <Search />
      <Categories />
      <FeaturedServices />
    </main>
  );
};

export default Home;
