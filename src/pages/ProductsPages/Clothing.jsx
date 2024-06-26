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

import { CiFilter } from "react-icons/ci";

const Clothing = ({ category }) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [view, setView] = useState('grid')
    const [sortOption, setSortOption] = useState('high-to-low');

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
        setItemsPerPage(items);
        setCurrentPage(1);
    }

    const handleSortChange = (option) => {
        setSortOption(option)
        console.log(sortOption)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);


    useEffect(() => {
        const sortProducts = () => {
            if (sortOption === 'high-to-low') {
                return filteredProducts.sort((a, b) => b.price - a.price);
            } else if (sortOption === 'low-to-high') {
                return filteredProducts.sort((a, b) => a.price - b.price);
            }
            return filteredProducts
        }
        sortProducts();
    }, [sortOption])

    const lastProductIndex = currentPage * itemsPerPage;
    const firstProductIndex = lastProductIndex - itemsPerPage;
    const displayedProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);
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

    return (
        <div className="max-w-screen-2xl flex-col mx-auto mt-5">
            <div className="flex scale-75 md:scale-100 md:ml-0">
                <Breadcrumbs category={category} />
            </div>
            <div className="">
                {
                    !isMobile && (
                        <h1 className="text-xl ml-5 md:ml-0 md:text-4xl uppercase font-bold mt-2 md:mt-6">{selectedSexCategory}</h1>
                    )
                }
            </div>
            <div className="flex flex-col md:flex-row w-full">
                <div className="flex-col">
                    <div>
                        {!isMobile && (
                            <div>
                                <h1 onClick={closeSubMenu} className="font-bold cursor-pointer text-2xl py-4 mr-10 ml-5 md:ml-0">{selectedSubheaderMenu}</h1>
                            </div>
                        )}
                        <div className="flex justify-center gap-6 md:gap-0 md:flex-col ">
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
                    <div className="w-full flex justify-center">
                        <ShopSideNav
                            products={allProducts}
                            setFilteredProducts={setFilteredProducts}
                        />
                    </div>
                </div>

                <div className="w-full flex-col md:-ml-10">
                    <div className="w-full ml-14 -mb-5 md:w-5/6 md:ml-20 flex items-center gap-2 md:gap-6 mt-2 md:mt-0">
                        {isMobile && (
                            <div className="flex items-center">
                                <span>Filter</span>
                                <CiFilter className="text-2xl" />
                            </div>
                        )}
                        <div className="flex justify-center items-center w-full">
                            <ProductBanner onViewChange={setView} onItemsPerPageChange={handleItemsPerPageChange} onSortChange={handleSortChange} />
                        </div>
                    </div>
                    <ProductsCenter filteredProducts={displayedProducts} selectedCategory={selectedCategory} view={view} />
                    <div className="flex justify-center mt-4 mb-10">
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
