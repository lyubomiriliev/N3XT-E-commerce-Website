import { useEffect, useState } from "react";
import { allProductsData } from "../api/Api";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import ProductBanner from "../components/Shop/ProductBanner";

const Sale = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setAllProducts(products)
            setFilteredProducts(products.filter((item) => item.category === selectedSexCategory.toLowerCase()));
        };

        fetchData();
    }, [selectedSexCategory])


    return (
        <div className="max-w-screen-2xl mx-auto mt-10 flex flex-col">
            <div className="w-4/6 mx-auto  justify-between flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
                <ProductBanner />
            </div>
            <div className="w-5/6 mx-auto py-10 grid grid-cols-4 gap-10">
                {filteredProducts.map(item => (
                    <ProductCard key={item._id} product={item} />
                ))}
            </div>
        </div>
    )
}

export default Sale
