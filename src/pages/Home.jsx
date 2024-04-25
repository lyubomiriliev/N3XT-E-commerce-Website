import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";

export default function Home() {
    const [products, setProducts] = useState([]);
    const data = useLoaderData()
    useEffect(() => {
        setProducts(data.data)
    }, [data])

    return (
        <div>
            <Banner />
            <Products products={products} />
            <FeaturedProducts products={products} />
            <Newsletter />
        </div>
    );
}