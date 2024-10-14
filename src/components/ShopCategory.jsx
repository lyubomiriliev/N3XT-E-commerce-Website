import { useEffect, useState } from "react";
import ShopSideNav from "./Shop/ShopSideNav"
import { useSelector } from "react-redux";
import { allProductsData } from "../api/Api";
import ProductCard from "./ProductCard";
import { Link, useLocation } from "react-router-dom";

const ShopCategory = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const selectedProductCategory = useSelector((state) => state.next.productCategory)


    const location = useLocation()
    const pathname = location.pathname;
    const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1)
    const pathSplit = pathname.split("/");
    const desiredSegment = pathSplit[2];


    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setAllProducts(products);
        }

        fetchData();
    }, [])

    useEffect(() => {
        if (allProducts.length > 0) {
            setFilteredProducts(allProducts.filter((item) =>
                item.category === selectedSexCategory.toLowerCase() &&
                item.itemCategory === lastSegment));
        }

    }, [allProducts, lastSegment, selectedSexCategory])

    console.log(filteredProducts)
    console.log(selectedProductCategory)



    return (
        <div className="w-full md:max-w-screen-2xl flex flex-col justify-center mx-auto px-4">
            <div className="flex flex-col mr-10">
                <div className="border-b-2 w-36 ml-9">
                    <Link to={`/${selectedSexCategory}/${desiredSegment}`}>
                        <h1 className="text-xl text-gray-700  uppercase font-bold mt-6">{desiredSegment}</h1>
                    </Link>
                    <h1 className="text-3xl  uppercase font-bold mt-3">{lastSegment}</h1>
                </div>
                {/* <div className="w-[20%] ml-10 lgl:w-[25%] flex h-full">
                    <ShopSideNav />

                </div> */}
            </div>
            <div className="w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map(item => (
                    <ProductCard key={item._id} product={item} />
                ))}
            </div>
        </div>
    )
}

export default ShopCategory
