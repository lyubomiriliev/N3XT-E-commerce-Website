import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ products }) => {
  const selectedSexCategory = useSelector((state) => state.next.sexCategory);
  const filteredProducts = selectedSexCategory
    ? products.filter((item) => item.category === selectedSexCategory)
    : products;

  return (
    <div className="w-full md:px-0 mx-auto flex flex-col items-center md:py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl md:text-4xl py-10 font-bold text-center">
          NEW ARRIVALS
        </h1>
      </div>
      <div className="max-w-screen-xl px-4 md:px-0 mx-auto py-2 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {filteredProducts &&
          filteredProducts
            .slice(4, 12)
            .map((item) => <ProductCard key={item._id} product={item} />)}
      </div>
      <div className="mt-5">
        <Link to={`/${selectedSexCategory}/clothing`}>
          <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center font-bold uppercase hover:cursor-pointer hover:bg-indigo-600 hover:text-white active:bg-gray-900 duration-300">
            Discover
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
