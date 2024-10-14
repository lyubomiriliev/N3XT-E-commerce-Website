import { Link, useNavigate } from "react-router-dom";
import { nextLogo } from "../assets";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from "react-redux";
import HeaderSubmenu from "./HeaderSubmenu";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { setSexCategory } from "../redux/nextSlice";
import { allProductsData } from "../api/Api";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineUserCircle } from "react-icons/hi2";

import useDeviceDetect from "../hooks/useDeviceDetect";
import { headerIcons } from "../utils/constants";




export default function Header() {

    const {burgerOpen, burgerClose, user, cart, wishlish, search} = headerIcons;

    const productData = useSelector((state) => state.next.productData);
    const userInfo = useSelector((state) => state.next.userInfo);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [allProducts, setAllProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const searchRef = useRef();
    const isMobile = useDeviceDetect();

    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setAllProducts(products)
        };

        fetchData();
    }, [selectedSexCategory])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);

    }

    
    useEffect(() => {
        const filtered = allProducts?.filter((product) => product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
        setFilteredProducts(filtered);

    }, [searchQuery, allProducts])

    const handleSexChange = (sex) => {
        dispatch(setSexCategory(sex))
        navigate(`/${sex}`)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setFilteredProducts([]);
                setSearchQuery("");
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [searchRef]);


    return (

        <div className='w-full h-28 md:h-40 bg-white border-b sticky top-0 z-50'>
            <div className="max-w-screen-2xl  flex flex-col md:flex-row items-center mx-auto">
                <div className="w-full flex justify-between px-5 items-center md:w-auto">
                    {/* Burger Menu & Logo */}
                    <div className="flex items-center relative gap-4">
                        {showBurgerMenu ? (
                            <AiOutlineClose className="md:hidden w-6 h-6 cursor-pointer" onClick={() => setShowBurgerMenu(false)} />
                        ) : (
                            <GiHamburgerMenu className="md:hidden w-6 h-6 cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                setShowBurgerMenu(true);
                            }} />
                        )}
                        <div onClick={() => setShowBurgerMenu(false)}>
                            <Link to="/women">
                                <img className="w-28 md:w-40 mt-1" src={nextLogo} alt="NextLogo" />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Right side - User/Fav/Shop */}
                    <div className="flex items-center justify-end gap-4 h-10 flex-1">
                        <Link to="/login">
                            <div className="hover:text-black text-gray-700 decoration-[1px] flex md:hidden cursor-pointer duration-300 ease-out 0.3s">
                            <HiOutlineUserCircle className="text-2xl" />
                            </div>
                        </Link>
                        {userInfo === null ?
                            <Link to="/register">
                                <div onClick={() => setShowBurgerMenu(false)} className=" hover:text-black text-gray-700 flex md:hidden hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                    <FavoriteBorderOutlinedIcon />
                                </div>
                            </Link>
                            :
                            <Link to="/wishlist">
                                <div onClick={() => setShowBurgerMenu(false)} className=" hover:text-black text-gray-700 flex md:hidden hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                    <FavoriteBorderOutlinedIcon />
                                </div>
                            </Link>
                        }
                        <Link to="/cart">
                            <div onClick={() => setShowBurgerMenu(false)} className=" hover:text-black text-gray-700 md:hidden hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                <ShoppingBagOutlinedIcon />
                                <span className="w-6 font-semibold top-2 left-0 items-center justify-center">{productData.length}</span>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* Women | Men DESKTOP */}
                <div className="hidden md:flex md:items-center flex-1">
                    {
                        !isMobile && (
                            <div className="flex flex-col relative">
                                <ul className="w-full flex items-center">
                                    <li
                                        onClick={() => handleSexChange("women")}
                                        className={`text-black font-bold hover:opacity-50 duration-300 px-6 py-2 cursor-pointer`}
                                    >
                                        Women
                                    </li>
                                    <div className="w-[2px] h-6 bg-black"></div>
                                    <li
                                        onClick={() => handleSexChange("men")}
                                        className={`text-black font-bold px-6 py-2 hover:opacity-50 duration-300 cursor-pointer`}
                                    >
                                        Men
                                    </li>
                                </ul>
                                <div
                                    className={`absolute bottom-0 left-0 h-[2px] w-[20%] bg-black transition-transform duration-300 ease-in-out ${selectedSexCategory === "women" ? "translate-x-9" : "translate-x-[350%]"}`}
                                />
                            </div>
                        )
                    }
                </div>

                {/* BURGER MENU */}
                <div className="flex absolute top-14 z-50 left-0 w-full">
                    {showBurgerMenu && (
                        <div className="w-full bg-white shadow-lg rounded-lg flex flex-col">
                            <HeaderSubmenu closeMenu={() => setShowBurgerMenu(false)} />
                        </div>
                    )}
                </div>

                <div ref={searchRef} className="relative w-full lg:w-[600px] h-[30px] text-base flex items-center gap-2 justify-between px-6 rounded-xl">
                    <div className="w-full flex mt-3 md:mt-0 items-center">
                    <FaSearch
                        className="w-4 h-4 absolute left-10"
                        />
                    <input
                        className="w-full pl-12 h-10 border-[1px] px-3 rounded-md"
                        type="text"
                        onChange={handleSearch}
                        value={searchQuery}
                        placeholder="Search products here..."
                        />
                        </div>

                    {/* SEARCH BAR */}
                    {searchQuery && (
                        <div className={`w-full mx-auto h-96 bg-white top-12 rounded-md md:top-10 absolute left-0 z-999 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}>
                            {searchQuery && filteredProducts.map((product) => (
                                <div onClick={() => navigate(`/product/${product.title
                                    .toLowerCase()
                                    .split(" ")
                                    .join("")}`,
                                    {
                                        state:
                                        {
                                            product: product,
                                        },
                                    }
                                ) &
                                    setShowSearchBar(true) &
                                    setSearchQuery("")
                                }
                                    key={product._id}
                                    className="max-w-[600px] bg-gray-100 mb-1 flex items-center gap-3"
                                >
                                    <img className="w-32 h-full object-cover rounded-lg" src={product.image} alt="productImg" />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold text-lg">
                                            {product.title}
                                        </p>
                                        <p className="text-xs">
                                            {product.description.length > 100 ? `${product.description.slice(0, 100)}...` : product.description}
                                        </p>
                                        <p className="text-sm">
                                            Price:{" "}
                                            <span className="font-semibold">
                                                ${product.price}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* DESKTOP USER/FAV/CART */}
                <div className="w-full md:w-1/3 flex items-center justify-center md:justify-around">
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                            <div className="hover:text-black text-gray-700 hover:scale-110 hidden md:block decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                <HiOutlineUserCircle className="text-2xl"/>
                            </div>
                            </Link>
                            {
                                userInfo && <p className="text-base font-semibold underline underline-offset-2">{userInfo.name}</p>
                            }
                        </div>
                    <div className="items-center hidden md:flex">
                        {userInfo === null ?
                            <Link to="/register">
                                <div className=" hover:text-black text-gray-700 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                    <FavoriteBorderOutlinedIcon />
                                </div>
                            </Link>
                            :
                            <Link to="/wishlist">
                                <div className="hover:text-black text-gray-700 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                    <FavoriteBorderOutlinedIcon />
                                </div>
                            </Link>
                        }
                    </div>
                    <Link to="/cart">
                        <div className=" hover:text-black text-gray-700 hover:scale-110 hidden md:flex decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                            <ShoppingBagOutlinedIcon />
                            <span className="w-6 font-semibold top-2 left-0 items-center justify-center">{productData.length}</span>
                        </div>
                    </Link>

                </div>
            </div>
            <div className='hidden md:flex w-2/3 mx-auto bg-white sticky top-0 -z-50 transition-all duration-300'>
                <HeaderSubmenu />
            </div>
        </div>
    );
}