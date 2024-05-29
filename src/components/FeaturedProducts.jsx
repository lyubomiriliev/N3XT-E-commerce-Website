import { useSelector } from "react-redux";
import FeaturedProductCard from "./FeaturedProductCard"
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products }) => {

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)


    const filteredProducts = selectedSexCategory ? products.filter((item) => item.category === selectedSexCategory) : products;

    return (
        <div className="py-10">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-center">NEW ARRIVALS</h1>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-1 md:grid-cols-5 gap-10">
                    {
                        filteredProducts !== null ? (
                            filteredProducts.slice(0, 5).map((item) => (
                                <FeaturedProductCard key={item._id} product={item} />
                            ))
                        ) : (
                            products.slice(0, 5).map((item) => (
                                <FeaturedProductCard key={item._id} product={item} />
                            ))
                        )
                    }

                </div>
                <Link to={`/${selectedSexCategory}/clothing`}>
                    <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300">Discover</button>
                </Link>
            </div>
        </div>
    )
}

export default FeaturedProducts
