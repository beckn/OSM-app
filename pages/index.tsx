import dynamic from "next/dynamic";

const Category = dynamic(() => import("../components/category/Category"));

const Home = () => {
  return (
    <div>
      {/* <Carousel /> */}
      {/* <Benefits /> */}
      {/* <Offers /> */}
      <Category />
      {/* <Newest /> */}
      {/* <Banners /> */}
      {/* <Brands /> */}
    </div>
  );
};

export default Home;
