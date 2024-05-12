import FeaturedProductCard from "./FeaturedProductCard"

const FeaturedProducts = ({ products }) => {

    const filteredProducts = products.filter((item) => item.category === "men")


    return (
        <div className="py-10">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold text-center">NEW ARRIVALS</h1>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    {
                        filteredProducts !== null ? (
                            filteredProducts.slice(0, 3).map((item) => (
                                <FeaturedProductCard key={item._id} product={item} />
                            ))
                        ) : (
                            products.slice(0, 4).map((item) => (
                                <FeaturedProductCard key={item._id} product={item} />
                            ))
                        )
                    }

                </div>
                <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300">Discover</button>
            </div>
        </div>
    )
}

export default FeaturedProducts
