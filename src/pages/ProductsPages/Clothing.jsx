import { Link, useLocation } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { allProductsData } from "../../api/Api";
import { setProductCategory } from "../../redux/nextSlice";

const Clothing = ({ category }) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [view, setView] = useState('grid')

    const location = useLocation()
    const pathname = location.pathname;
    const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1)

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const selectedProductCategory = useSelector((state) => state.next.productCategory)
    const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu)
    const checkedBrands = useSelector((state) => state.next.checkedBrands);

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setAllProducts(products)
            filterProducts(products, selectedSexCategory, lastSegment, selectedProductCategory, checkedBrands)
        };

        fetchData();
    }, [selectedSexCategory])

    useEffect(() => {
        filterProducts(allProducts, selectedSexCategory, lastSegment, selectedProductCategory, checkedBrands);
    }, [selectedSexCategory, lastSegment, selectedProductCategory, checkedBrands, allProducts])

    const filterProducts = (products, sexCategory, type, productCategory, brands) => {
        let filtered = products.filter(item => item.category === sexCategory.toLowerCase());

        if (type) {
            filtered = filtered.filter(item => item.type === type)
        }

        if (productCategory) {
            switch (productCategory) {
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
                case "Boots":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('boot') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Mocassins":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('mocassins') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Sneakers":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('sneakers') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Flip flops & Sandals":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('sandals') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Sports shoes":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('sport') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Hats":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('hat') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Belts":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('belt') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Scarves":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('scarf') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Sunglasses":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('sunglass') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Watches":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('watch') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Rings":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('ring') && !item.title.toLowerCase().includes('ear') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Bracelets":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('bracelet') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Necklaces":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('necklace') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;
                case "Earrings":
                    filtered = allProducts.filter(item => item.title.toLowerCase().includes('earring') && item.category === selectedSexCategory.toLowerCase());
                    setFilteredProducts(filtered)
                    break;

                default:
                    filtered = allProducts;
                    break;
            }

        }

        if (brands.length > 0) {
            filtered = filtered.filter(item => brands.some(brand => item.brand === brand.title))
        }

        setFilteredProducts(filtered)
    }

    const toggleSubMenu = (selectedProductCategory) => {
        setActiveSubMenu((prevActiveSubmenu) => {
            return prevActiveSubmenu === selectedProductCategory ? null : selectedProductCategory
        });

        filterProducts(allProducts, selectedSexCategory, lastSegment, selectedProductCategory, checkedBrands);
    }

    const closeSubMenu = () => {
        setFilteredProducts(allProducts.filter((product) => product.type === lastSegment && product.category === selectedSexCategory));
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

    const handleCategoryChange = (category) => {
        if (activeSubMenu === category) {
            closeSubMenu();
        } else {
            dispatch(setProductCategory(category))
            toggleSubMenu(category);
        }
    }

    return (
        <div className="max-w-screen-2xl flex-col mx-auto mt-5">
            <Breadcrumbs category={category} />
            <div className="border-b-2 w-24">
                <h1 className="text-4xl  uppercase font-bold mt-6">{selectedSexCategory}</h1>
            </div>
            <div className="flex w-full">
                <div className="flex-col">
                    <div>
                        <h1 onClick={closeSubMenu} className="font-bold cursor-pointer text-2xl py-4 mr-10">{selectedSubheaderMenu}</h1>
                        <div className="flex-col">

                            {submenus.filter((submenu) => {
                                if (selectedSexCategory === "women") {
                                    return !submenu.name.toLowerCase().includes('mocassins')
                                } else if (selectedSexCategory === "men") {
                                    return !submenu.name.toLowerCase().includes('skirts') && !submenu.name.toLowerCase().includes('clutch bags') && !submenu.name.toLowerCase().includes('necklaces') && !submenu.name.toLowerCase().includes('earrings');
                                }
                                return true;
                            })
                                .map((submenu) => (
                                    <div key={submenu.name}>
                                        <div onClick={() => handleCategoryChange(submenu.name)}>
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

                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[20%] lgl:w-[25%] flex h-full">
                        <ShopSideNav
                            products={allProducts}
                            setFilteredProducts={setFilteredProducts}
                        />
                    </div>
                </div>

                <div className="w-full flex-col -ml-10">
                    <div className="w-5/6 ml-20 justify-between flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
                        <ProductBanner onViewChange={setView} />
                    </div>
                    <ProductsCenter filteredProducts={filteredProducts} selectedCategory={selectedCategory} view={view} />
                    {/* <Pagination /> */}
                </div>

            </div>

        </div>

    )
}

export default Clothing
