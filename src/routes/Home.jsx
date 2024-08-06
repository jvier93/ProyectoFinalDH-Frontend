import { Categories } from "../components/Categories";
import { FeaturedServices } from "../components/FeaturedServices";
import Search from "../components/Search";

const Home = () => {
  return (
    <main className="pt-28  flex-grow ">
      <Search />
      <Categories />
      <FeaturedServices />
    </main>
  );
};

export default Home;
