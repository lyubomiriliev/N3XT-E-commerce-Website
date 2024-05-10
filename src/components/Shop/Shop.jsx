import { useState } from "react"
import Breadcrumbs from "../pageProps/Breadcrumbs";
import ShopSideNav from "./ShopSideNav";
import Pagination from "./Pagination";
import ProductBanner from "./ProductBanner";

const Shop = ({ products }) => {

    const [itemsPerPage, setItemsPerPage] = useState(48);

    const itemsPerPageFromBanner = (itemsPerPage) => {
        setItemsPerPage(itemsPerPage);
    }



    return (
        <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Products" />
            <div className="w-full h-full flex pb-20 gap-10">
                <div className="w-[20%] lg:w-[25%] hidden md:inline-flex h-full">
                    <ShopSideNav />
                </div>
                <div className="w-full md:w-[80%] lg:w-[75%] h-full flex flex-col gap-10">
                    <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
                    <Pagination itemsPerPage={itemsPerPage} products={products} />
                </div>
            </div>
            {/* Products end here */}
        </div>
    )
}

export default Shop
