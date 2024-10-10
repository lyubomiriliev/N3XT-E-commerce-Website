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
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { allProductsData } from "../../api/Api";
import { setProductCategory } from "../../redux/nextSlice";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import { TbCategory } from "react-icons/tb";
import { FaSort } from "react-icons/fa";

const Clothing = ({ category }) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [view, setView] = useState('grid')
    const [sortOption, setSortOption] = useState('high-to-low');

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCategories, setShowCategories] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const location = useLocation()
    const pathname = location.pathname;
    const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1)

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const selectedProductCategory = useSelector((state) => state.next.productCategory)
    const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu)
    const checkedBrands = useSelector((state) => state.next.checkedBrands);

    const isMobile = useDeviceDetect();

    const dispatch = useDispatch()

    const handleItemsPerPageChange = (items) => {
        console.log("Items per page:", items)
        setItemsPerPage(items);
        setCurrentPage(1);
    }

    const handleSortChange = (option) => {
        setSortOption(option);
        setIsSortOpen(false);
        sortProducts(option)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);


    const sortProducts = (option) => {
        const sortedProducts = [...filteredProducts];
        if(option === 'high-to-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (option === 'low-to-high') {
            sortedProducts.sort((a, b) => a.price - b.price)
        }
        setFilteredProducts(sortedProducts)
    }

    const toggleSortDropdown = () => {
        setIsSortOpen(!isSortOpen)
    }

    useEffect(() => {
        sortProducts(sortOption);
    },[sortOption])


    const lastProductIndex = currentPage * itemsPerPage;
    const firstProductIndex = lastProductIndex - itemsPerPage;

    console.log('Displaying products from:', firstProductIndex, 'to:', lastProductIndex)

    const displayedProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);

    console.log('Displayed Products Count:', displayedProducts.length);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

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

    }, [selectedSexCategory, lastSegment, selectedProductCategory, checkedBrands, allProducts,])

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

    const handleShowCategories = () => {
        setShowCategories(!showCategories)
    }

    const filteredSubmenus = submenus.filter((submenu) => {
        if (selectedSexCategory === "women") {
            return !submenu.name.toLowerCase().includes("mocassins");
        } else if (selectedSexCategory === "men") {
            return  !submenu.name.toLowerCase().includes("skirts")&&
                    !submenu.name.toLowerCase().includes('clutch bags') &&
                    !submenu.name.toLowerCase().includes('necklaces') && 
                    !submenu.name.toLowerCase().includes('earrings');
        }
        return true;
    })

    return (
        <div className="max-w-screen-2xl flex flex-col items-center mx-auto mt-5">
            {/* Breadcrumbs*/}
            <div className="w-full flex justify-center items-center pb-4 md:pb-0 px-4">
                <Breadcrumbs category={category} />
            </div>
            <div>
                {
                    !isMobile && (
                        <h1 className="text-xl ml-5 md:ml-0 md:text-4xl uppercase font-bold mt-2 md:mt-6">{selectedSexCategory}</h1>
                    )
                }
            </div>
                        {/* Main section */}
                        <div className="w-full flex flex-col px-4 md:px-0 rounded-lg md:flex-row">
                            <div>
                                {!isMobile && (
                                <div className="flex justify-between items-center mb-4">
                                    <h1 onClick={closeSubMenu} className="font-bold cursor-pointer text-2xl py-4 mr-10 ml-5 md:ml-0">{selectedSubheaderMenu}</h1>

                                </div>
                                )}

                            <div className="w-full flex flex-col justify-center">

                            {/* Side Nav */}
                            <div className="w-full hidden md:flex flex-col justify-center  gap-4 md:gap-0 ">
                                
                                <ShopSideNav
                                products={allProducts}
                                setFilteredProducts={setFilteredProducts}
                                />
                            </div>
                        {/* SIDE NAV END */}
                    </div>
                </div>

                {/* PRODUCT SECTION */}
                <div className="w-full flex flex-col justify-start ">
                            <div className="flex w-full mb-2 h-10 justify-start space-x-2 items-center">
                                <button
                                    onClick={handleShowCategories}
                                    className="bg-transparent border-gray-300 border-[1px] hover:border-black duration-300 px-2 py-2 rounded-md flex items-center justify-center"
                                >
                                <TbCategory className="text-xl"/>
                                </button>

                                <div className="relative h-full">
                                <button
                                    className="w-10 bg-transparent border-gray-300 border-[1px] hover:border-black duration-300 px-2 py-2 rounded-md flex items-center justify-center"
                                    onClick={toggleSortDropdown}
                                    >
                                <FaSort className="text-xl"/>
                                </button>
                                {isSortOpen && (
                                    <div className="absolute top-full mt-2 left-0 bg-white border-gray-300 rounded-md shadow-lg z-50 w-48">
                                        <ul
                                            className="py-1"
                                            >
                                            <li onClick={(e) => handleSortChange("low-to-high")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >Price: Low to High:</li>
                                            <li onClick={(e) => handleSortChange("high-to-low")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >Price: High to Low:</li>
                                        </ul> 
                                    </div>
                                )}
                                </div>
                                {showCategories && (
                            <div className="flex items-center w-full gap-2 overflow-x-auto">
                                {filteredSubmenus.map((submenu) => (
                                    <div key={submenu.name}>
                                        <div
                                            className="bg-transparent border-gray-300 border-[1px] hover:border-black duration-300 px-6 py-2 rounded-md flex items-center justify-center mx-auto"
                                            onClick={() => handleCategoryChange(submenu.name)}
                                        >
                                            <h1 className="border-none font-light text-sm md:text-base">
                                                {submenu.name}
                                            </h1>
                                        </div>

                                        {/* Display sublinks */}
                                        {activeSubMenu === submenu.name && submenu.sublinks && (
                                            <div>
                                                {submenu.sublinks.map((sublink) => (
                                                    <h1 key={sublink.name} className="hover:scale-110 duration-100 text-sm text-gray-600 my-3">
                                                        <Link to={sublink.link} className="px-2 ml-2">{sublink.name}</Link>
                                                    </h1>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div>
                                    
                                </div>
                            </div>
                                )}
                                <div className="w-full flex items-center">
                                    <ProductBanner onViewChange={setView} onItemsPerPageChange={handleItemsPerPageChange} onSortChange={handleSortChange} />
                                </div>
                            </div>
                        <div>
                            <ProductsCenter filteredProducts={displayedProducts} selectedCategory={selectedCategory} view={view} />
                        </div>
                    {/* PAGINATION BUTTONS */}
                    <div className="flex  justify-center mt-4 mb-10">
                        <button
                            onClick={() => {
                                setCurrentPage(prev => Math.max(prev - 1, 1));
                            }}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">{currentPage}/{totalPages}</span>
                        <button
                            onClick={() => {
                                setCurrentPage(prev => (prev * itemsPerPage < filteredProducts.length ? prev + 1 : prev));
                            }
                            }
                            disabled={currentPage * itemsPerPage >= filteredProducts.length}
                            className='px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50'
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Clothing
