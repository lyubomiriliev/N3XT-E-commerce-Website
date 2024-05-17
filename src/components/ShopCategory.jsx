import { useEffect, useState } from "react";
import ShopSideNav from "./Shop/ShopSideNav"
import { useSelector } from "react-redux";
import { allProductsData } from "../api/Api";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";

const ShopCategory = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const selectedProductCategory = useSelector((state) => state.next.productCategory)


    const location = useLocation()
    const pathname = location.pathname;
    const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1)

    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setAllProducts(products)
            setFilteredProducts(allProducts.filter((item) => item.category === selectedSexCategory.toLowerCase() && item.itemCategory === lastSegment));

        };

        fetchData();
    }, [lastSegment, selectedSexCategory])

    console.log(filteredProducts)
    console.log(selectedProductCategory)



    return (
        <div className="max-w-screen-2xl flex mx-auto mt-5">
            <div className="flex flex-col">
                <div className="border-b-2 w-24 ml-9">
                    <h1 className="text-2xl  uppercase font-bold mt-6">{selectedSexCategory}</h1>
                    <h1 className="text-4xl  uppercase font-bold mt-6">{lastSegment}</h1>
                </div>
                <div className="w-[20%] ml-10 lgl:w-[25%] flex h-full">
                    <ShopSideNav />

                </div>
            </div>


            <div className="w-5/6 mx-auto py-10 grid grid-cols-4 gap-10">
                {filteredProducts.map(item => (
                    <ProductCard key={item._id} product={item} />
                ))}
            </div>
        </div>
    )
}

export default ShopCategory
