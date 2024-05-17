import Banner from "../components/Banner";
import Products from "../components/Products";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import { useEffect, useState } from "react";
import { allProductsData } from "../api/Api";
import { useSelector } from "react-redux";

export default function Home() {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)


    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setFilteredProducts(products.filter((item) => item.category === selectedSexCategory.toLowerCase()));

        };

        fetchData();
    }, [selectedSexCategory])

    return (
        <div>
            <Banner />
            <Products products={filteredProducts} />
            <FeaturedProducts products={filteredProducts} />
            <Newsletter />
        </div>
    );
}