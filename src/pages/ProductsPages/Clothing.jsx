import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { clothingSubmenu } from "./Submenus/clothingSubmenus";
import { shoesSubmenu } from "./Submenus/shoesSubmenu";

import ShopSideNav from "../../components/Shop/ShopSideNav";
import ProductBanner from "../../components/Shop/ProductBanner";
import { acessoriesSubmenus } from "./Submenus/accesoriesSubmenu";
import { bagsSubmenus } from "./Submenus/bagsSubmenus";
import { jewellerySubmenus } from "./Submenus/jewellerySubmenus";
import ProductsCenter from "./ProductsCenter";
import Pagination from "../../components/Shop/Pagination";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { allProductsData } from "../../api/Api";

const Clothing = ({ category }) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setAllProducts(products)
            setFilteredProducts(products.filter((item) => item.category === selectedSexCategory.toLowerCase()));
        };

        fetchData();
    }, [selectedSexCategory])


    const toggleSubMenu = (clothName) => {
        setActiveSubMenu((prevActiveSubmenu) => {
            return prevActiveSubmenu === clothName ? null : clothName;
        });

        let filtered = [];

        switch (clothName) {
            case "Jackets":
                filtered = allProducts.filter(item => item.title.toLowerCase().includes('jacket') && item.category === selectedSexCategory?.toLowerCase());
                setFilteredProducts(filtered)
                break;
            case "T-Shirts":
                filtered = allProducts.filter(item => item.title.toLowerCase().includes('shirt') && item.category === selectedSexCategory?.toLowerCase());
                setFilteredProducts(filtered)
                break;
            case "Hoodies":
                filtered = allProducts.filter(item => item.title.toLowerCase().includes('hood') && item.category === selectedSexCategory.toLowerCase());
                setFilteredProducts(filtered)
                break;
            case "Jeans":
                filtered = allProducts.filter(item => item.title.toLowerCase().includes('jeans') && item.category === selectedSexCategory.toLowerCase());
                setFilteredProducts(filtered)
                break;
            case "Skirts":
                filtered = allProducts.filter(item => item.title.toLowerCase().includes('skirt') && item.category === selectedSexCategory.toLowerCase());
                setFilteredProducts(filtered)
                break;
            case "Formal":
                filtered = allProducts.filter(item => item.title.toLowerCase().includes('formal') && item.category === selectedSexCategory.toLowerCase());
                setFilteredProducts(filtered)
                break;
            default:
                filtered = allProducts;
                break;
        }
        console.log(filtered)

    }

    const closeSubMenu = () => {
        setFilteredProducts(allProducts)
        setSelectedCategory(null)
        setActiveSubMenu(null);
    }

    const submenus = {
        clothing: clothingSubmenu,
        shoes: shoesSubmenu,
        accessories: acessoriesSubmenus,
        bags: bagsSubmenus,
        jewellery: jewellerySubmenus
    }[category];


    const productCategory =
        category === 'clothing' ? "Clothing" :
            category === 'shoes' ? "Shoes" :
                category === 'accessories' ? "Accessories" :
                    category === 'bags' ? "Bags" :
                        category === 'jewellery' ? "Jewellery" : []

    return (
        <div className="max-w-screen-2xl flex-col mx-auto mt-5">
            <Breadcrumbs category={category} />
            <div className="border-b-2 w-24">
                <h1 className="text-4xl  uppercase font-bold mt-6">{selectedSexCategory}</h1>
            </div>
            <div className="flex w-full">
                <div className="flex-col">
                    <div>
                        <h1 onClick={closeSubMenu} className="font-bold cursor-pointer text-2xl py-4 mr-10">{productCategory}</h1>
                        <div className="flex-col">
                            {submenus.map((submenu) => (
                                <div key={submenu.name}>
                                    <div onClick={() => toggleSubMenu(submenu.name)} >
                                        <h1 className="border-b-[1px] py-4 border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:border-gray-400 duration-300">{submenu.name}</h1>
                                    </div>
                                    {
                                        activeSubMenu === submenu.name && submenu.sublinks && <div>
                                            <div>
                                                {submenu.sublinks.map((sublink) => (
                                                    <h1 key={sublink.name} className="hover:scale-110 duration-100 text-sm text-gray-600 my-3">
                                                        <Link to={sublink.link} className=" px-2 ml-2">{sublink.name}</Link>
                                                    </h1>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="w-[20%] lgl:w-[25%] flex h-full">
                        <ShopSideNav />
                    </div>
                </div>

                <div className="w-full flex-col -ml-10">
                    <div className="w-5/6 ml-20 justify-between flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
                        <ProductBanner />
                    </div>
                    <ProductsCenter filteredProducts={filteredProducts} selectedCategory={selectedCategory} />
                    {/* <Pagination /> */}
                </div>

            </div>

        </div>

    )
}

export default Clothing
