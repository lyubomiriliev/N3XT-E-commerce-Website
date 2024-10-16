import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { clothingSubmenu } from "./Submenus/clothingSubmenus";
import { shoesSubmenu } from "./Submenus/shoesSubmenu";
import ProductBanner from "../../components/Shop/ProductBanner";
import { acessoriesSubmenus } from "./Submenus/accesoriesSubmenu";
import { jewellerySubmenus } from "./Submenus/jewellerySubmenus";
import ProductsCenter from "./ProductsCenter";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { allProductsData } from "../../api/Api";
import { setProductCategory, setHeaderSubmenu } from "../../redux/nextSlice";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { FaSort } from "react-icons/fa";
import { bagsSubmenus } from "./Submenus/bagsSubmenus";

const Clothing = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("high-to-low");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const sortRef = useRef();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const selectedSexCategory = useSelector((state) => state.next.sexCategory);
  const selectedProductCategory = useSelector((state) => state.next.productCategory);
  const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu);
  const checkedBrands = useSelector((state) => state.next.checkedBrands);
  const isMobile = useDeviceDetect();
  const dispatch = useDispatch();

  // Parse category and subcategory from URL path
  const pathSegments = pathname.split("/").filter(Boolean);
  const categoryFromPath = pathSegments[1]; // Main category like 'clothing', 'shoes', etc.
  const subcategoryFromPath = pathSegments[2]; // Subcategory like 'jackets', etc.

  // Set category in Redux based on path
  useEffect(() => {
    dispatch(setHeaderSubmenu(categoryFromPath));
    if (subcategoryFromPath) {
      dispatch(setProductCategory(subcategoryFromPath));
    }
  }, [categoryFromPath, subcategoryFromPath, dispatch]);

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
    sortProducts(option);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const sortProducts = (option) => {
    const sortedProducts = [...filteredProducts];
    if (option === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };

  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption]);

  const lastProductIndex = currentPage * itemsPerPage;
  const firstProductIndex = lastProductIndex - itemsPerPage;
  const displayedProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const products = await allProductsData();
      setAllProducts(products);
      filterProducts(products, selectedSexCategory, selectedSubheaderMenu, selectedProductCategory, checkedBrands);
    };

    fetchData();
  }, [selectedSexCategory, selectedSubheaderMenu, selectedProductCategory, checkedBrands]);

  const filterProducts = (products, sexCategory, selectedSubheaderMenu, selectedProductCategory, brands = []) => {
    let filtered = products.filter((item) => item.category === sexCategory.toLowerCase());

    // Filter by main category (like "clothing", "shoes", etc.)
    if (selectedSubheaderMenu) {
      filtered = filtered.filter((item) => item.type.toLowerCase() === selectedSubheaderMenu.toLowerCase());
    }

    // Filter by subcategory (like "Jackets", "T-Shirts")
    if (selectedProductCategory) {
      filtered = filtered.filter((item) => item.title.toLowerCase().includes(selectedProductCategory.toLowerCase()));
    }

    // Filter by brands (if any are selected)
    if (brands.length > 0) {
      filtered = filtered.filter((item) => brands.some((brand) => item.brand === brand.title));
    }

    setFilteredProducts(filtered);
  };

  // Safely retrieve submenus based on selectedSubheaderMenu
  const submenus = {
    clothing: clothingSubmenu,
    shoes: shoesSubmenu,
    bags: bagsSubmenus,
    accessories: acessoriesSubmenus,
    jewellery: jewellerySubmenus,
  }[selectedSubheaderMenu] || []; // Fallback to empty array if undefined

  const handleCategoryChange = (category) => {
    if (activeSubMenu === category) {
      closeSubMenu();
      navigate(`/${selectedSexCategory}/${selectedSubheaderMenu}`)
    } else {
      dispatch(setProductCategory(category));
      toggleSubMenu(category);
      navigate(`/${selectedSexCategory}/${selectedSubheaderMenu}/${category.toLowerCase()}`)
    }
  };

  const toggleSubMenu = (selectedProductCategory) => {
    if (activeSubMenu === selectedProductCategory) {
      setActiveSubMenu(null);
      setFilteredProducts(allProducts.filter((item) => item.type.toLowerCase() === selectedSubheaderMenu.toLowerCase()));
    } else {
      setActiveSubMenu(selectedProductCategory);
      filterProducts(allProducts, selectedSexCategory, selectedSubheaderMenu, selectedProductCategory, checkedBrands);
    }
  };

  const closeSubMenu = () => {
    setFilteredProducts(allProducts.filter((product) => product.type === selectedSubheaderMenu && product.category === selectedSexCategory));
    setSelectedCategory(null);
    setActiveSubMenu(null);
  };

  const filteredSubmenus = submenus.filter((submenu) => {
    if (selectedSexCategory === "women") {
      return !submenu.name.toLowerCase().includes("mocassins");
    } else if (selectedSexCategory === "men") {
      return !submenu.name.toLowerCase().includes("skirts") && !submenu.name.toLowerCase().includes("necklaces") && !submenu.name.toLowerCase().includes("earrings");
    }
    return true;
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sortRef]);

  const resetSubmenu = () => {
    setActiveSubMenu(null);
    setFilteredProducts(allProducts.filter((item) => item.type.toLowerCase() === selectedSubheaderMenu.toLowerCase()));
  };

  return (
    <div className="max-w-screen-2xl flex flex-col items-center mx-auto mt-2">
      {/* Breadcrumbs*/}
      <div className="w-full flex justify-center items-center pb-4 md:pb-0 px-4">
        <Breadcrumbs selectedSubheaderMenu={selectedSubheaderMenu} resetSubmenu={resetSubmenu} />
      </div>

      <div className="w-[90%] flex flex-col px-4 md:px-0 rounded-lg mt-5 md:flex-row">
        <div className="w-full flex flex-col justify-start">
          <div className="w-full flex items-center mb-4">
            <h1 className="font-light text-lg md:text-3xl uppercase">
              {selectedSexCategory}'s {selectedSubheaderMenu}
            </h1>
          </div>
          <div className="flex w-full mb-2 h-10 justify-start space-x-2 items-center">
            <div className="flex items-center w-full gap-2 overflow-x-auto scrollbar-hide">
              {filteredSubmenus.map((submenu) => (
                <div key={submenu.name}>
                    <div
                      className={`${activeSubMenu === submenu.name ? "bg-gray-500 text-white border-black" : "bg-transparent"} border-gray-300 border-[1px] hover:border-black duration-300 px-6 py-2 rounded-md flex items-center justify-center mx-auto`}
                      onClick={() => handleCategoryChange(submenu.name)}
                    >
                      <h1 className="border-none font-light text-sm md:text-base">{submenu.name}</h1>
                    </div>
                  {activeSubMenu === submenu.name && submenu.sublinks && (
                    <div>
                      {submenu.sublinks.map((sublink) => (
                        <h1 key={sublink.name} className="hover:scale-110 duration-100 text-sm text-gray-600 my-3">
                          <Link to={sublink.link} className="px-2 ml-2">
                            {sublink.name}
                          </Link>
                        </h1>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex gap-2 mb-2 items-center">
            <ProductBanner onViewChange={setView} onItemsPerPageChange={handleItemsPerPageChange} onSortChange={handleSortChange} />
            <div className="relative h-full" ref={sortRef}>
              <button className="w-10 bg-transparent border-gray-300 border-[1px] hover:border-black duration-300 px-2 py-2 rounded-md flex items-center justify-center" onClick={toggleSortDropdown}>
                <FaSort className="text-xl" />
              </button>
              {isSortOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border-gray-300 rounded-md shadow-lg z-50 w-44">
                  <ul className="py-1">
                    <li onClick={(e) => handleSortChange("low-to-high")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Price: Low to High:
                    </li>
                    <li onClick={(e) => handleSortChange("high-to-low")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Price: High to Low:
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <ProductsCenter filteredProducts={displayedProducts} selectedCategory={selectedCategory} view={view} />
          </div>

          {/* PAGINATION BUTTONS */}
          <div className="flex justify-center mt-4 mb-10">
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => {
                setCurrentPage((prev) => (prev * itemsPerPage < filteredProducts.length ? prev + 1 : prev));
              }}
              disabled={currentPage * itemsPerPage >= filteredProducts.length}
              className="px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothing;
