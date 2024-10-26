import { useSelector } from "react-redux";
import ProductCard from "./ProductCard"

const Products = ({ products }) => {

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const filteredProducts = selectedSexCategory ? products.filter((item) => item.category === selectedSexCategory) : products;

    return (
        <div className="w-full md:px-0 flex flex-col mx-auto md:py-10">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl md:text-4xl py-10 font-bold text-center">TRENDING THIS WEEK</h1>
            </div>
            <div className="max-w-screen-xl px-4 md:px-0 mx-auto py-2 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-10">
                {
                    filteredProducts && (
                        filteredProducts.slice(0, 4).map((item) => (
                            <ProductCard key={item._id} product={item} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Products
