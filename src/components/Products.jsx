import ProductCard from "./ProductCard"

const Products = () => {
    return (
        <div className="py-10">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl py-2 w-160 text-center">Choose your El Shisha model</h1>
                <span className="w-20 h-[3px] bg-black"></span>
                <p className="max-w-[700px] text-gray-500 text-center">
                    El Shisha is the most luxurious vape brand in the world offering a whole new vape concept - a refined ritual called shisha vaping. All El Shisha models are developed by our talented engineers utilizing latest generation technologies and the highest-grade materials to deliver an unmatched user experience.
                </p>
            </div>
            <div className="max-w-screen-xl mx-au">
                <ProductCard />
            </div>
        </div>
    )
}

export default Products
