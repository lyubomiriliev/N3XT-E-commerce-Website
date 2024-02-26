import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useEffect, useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";

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
        </div>
    );
}