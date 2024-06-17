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
import useDeviceDetect from "../hooks/useDeviceDetect";


export default function Header() {

    const productData = useSelector((state) => state.next.productData);
    const userInfo = useSelector((state) => state.next.userInfo);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSexChange = (sex) => {
        dispatch(setSexCategory(sex))
        navigate(`/${sex}`)
    }

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


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);

    }

    useEffect(() => {
        const filtered = allProducts?.filter((product) => product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
        setFilteredProducts(filtered);

    }, [searchQuery, allProducts])



    return (

        <div className='w-full h-28 md:h-auto bg-white border-b-[1px] border-b-gray-300 sticky top-0 z-50 transition-all duration-300'>
            <div className="max-w-screen-2xl flex flex-col md:flex-row items-center mx-auto">
                <div className="w-full flex justify-between px-5 items-center gap-10 md:w-auto">
                    <div className="flex items-center relative">
                        {showBurgerMenu ? (
                            <AiOutlineClose className="md:hidden w-6 h-6 cursor-pointer" onClick={() => setShowBurgerMenu(false)} />
                        ) : (
                            <GiHamburgerMenu className="md:hidden w-6 h-6 cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                setShowBurgerMenu(true);
                            }} />
                        )}
                    </div>
                    {userInfo === null ?
                        <Link to="/register">
                            <div onClick={() => setShowBurgerMenu(false)} className=" hover:text-orange-300 flex md:hidden hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                <FavoriteBorderOutlinedIcon />
                            </div>
                        </Link>
                        :
                        <Link to="/wishlist">
                            <div onClick={() => setShowBurgerMenu(false)} className=" hover:text-orange-300 flex md:hidden hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                <FavoriteBorderOutlinedIcon />
                            </div>
                        </Link>
                    }
                    <div onClick={() => setShowBurgerMenu(false)}>
                        <Link to="/women">
                            <img className="w-28 md:w-40 mt-1" src={nextLogo} alt="NextLogo" />
                        </Link>
                    </div>
                    <Link to="/cart">
                        <div onClick={() => setShowBurgerMenu(false)} className=" hover:text-orange-300 md:hidden hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                            <ShoppingBagOutlinedIcon />
                            <span className="w-6 font-semibold top-2 left-0 items-center justify-center">{productData.length}</span>
                        </div>
                    </Link>

                    <Link to="/login">
                        <img
                            className="w-8 h-8 rounded-full md:hidden"
                            src={userInfo ? userInfo.image : "https://img.freepik.com/premium-vector/user-customer-avatar-vector-illustration_276184-160.jpg?w=740"}
                            alt="userLogo"
                        /></Link>
                </div>
                <div className="hidden md:flex md:items-center md:gap-10">
                    {
                        !isMobile && (
                            <div className="flex flex-col relative">
                                <ul className="flex items-center gap-2 relative">
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
                <div className="flex absolute top-14 z-50 left-0 w-full">
                    {showBurgerMenu && (
                        <div className="w-full bg-white shadow-lg rounded-lg flex flex-col">
                            <HeaderSubmenu closeMenu={() => setShowBurgerMenu(false)} />
                        </div>
                    )}
                </div>
                <div ref={searchRef} className="relative w-full lg:w-[600px] h-[30px] text-base flex items-center gap-2 justify-between px-6 rounded-xl">
                    <FaSearch
                        className="w-5 h-5 hidden md:flex"
                    />
                    <input
                        className="w-full h-10 border-[1px] px-3 rounded-md"
                        type="text"
                        onChange={handleSearch}
                        value={searchQuery}
                        placeholder="Search products here..."
                    />
                    {searchQuery && (
                        <div className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-999 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}>
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
                                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                                >
                                    <img className="w-20" src={product.image} alt="productImg" />
                                    <div className="flex flex-col gap-1">
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
                <div className="w-full md:w-1/3 flex items-center justify-center md:justify-around">
                    <div className="flex items-center relative">
                        {!isMobile && (
                            <ul className="flex items-center md:hidden gap-2 relative">
                                <li
                                    onClick={() => handleSexChange("women")}
                                    className={`text-black font-bold hover:bg-gray-100 duration-300 px-6 py-2 decoration-[1px] cursor-pointer ease-in}`}
                                >
                                    Women
                                </li>
                                <div className="w-[2px] h-6 bg-black"></div>
                                <li
                                    onClick={() => handleSexChange("men")}
                                    className={`text-black font-bold px-6 py-2 hover:bg-gray-100 duration-300 decoration-[1px] cursor-pointer ease-in $`}
                                >
                                    Men
                                </li>
                            </ul>
                        )}
                        {/* <div className={`absolute bottom-0 left-0 h-[2px] w-[40%] bg-black transition-transform duration-300 ease-in-out ${selectedSexCategory === "women" ? "translate-x-1" : "translate-x-[100%] w-[30%]"}`} /> */}
                    </div>
                    <div className="items-center hidden md:flex">
                        {userInfo === null ?
                            <Link to="/register">
                                <div className=" hover:text-orange-300 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                    <FavoriteBorderOutlinedIcon />
                                </div>
                            </Link>
                            :
                            <Link to="/wishlist">
                                <div className=" hover:text-orange-300 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                                    <FavoriteBorderOutlinedIcon />
                                </div>
                            </Link>
                        }
                    </div>
                    <Link to="/cart">
                        <div className=" hover:text-orange-300 hidden md:flex hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                            <ShoppingBagOutlinedIcon />
                            <span className="w-6 font-semibold top-2 left-0 items-center justify-center">{productData.length}</span>
                        </div>
                    </Link>

                    <Link to="/login">
                        <img
                            className="w-8 h-8 rounded-full hidden md:flex"
                            src={userInfo ? userInfo.image : "https://img.freepik.com/premium-vector/user-customer-avatar-vector-illustration_276184-160.jpg?w=740"}
                            alt="userLogo"
                        /></Link>
                    {
                        userInfo && <p className="text-base font-semibold underline underline-offset-2">{userInfo.name}</p>
                    }
                </div>
            </div>
            <div className='hidden md:flex w-2/3 mt-5 justify-evenly mx-auto border-b-gray-300 bg-white sticky top-0 -z-50 transition-all duration-300'>

                <HeaderSubmenu />
            </div>
        </div>
    );
}