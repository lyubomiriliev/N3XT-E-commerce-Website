import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";
import { useSelector } from "react-redux";

export default function Home() {
    const [products, setProducts] = useState([]);
    const data = useLoaderData()
    useEffect(() => {
        setProducts(data.data)
    }, [data])

    const selectedSexCategory = useSelector((state) => state.next.sexCategory);

    console.log(selectedSexCategory)

    return (
        <div>
            <Banner />
            <Products products={products} category={selectedSexCategory} />
            <FeaturedProducts products={products} category={selectedSexCategory} />
            <Newsletter />
        </div>
    );
}