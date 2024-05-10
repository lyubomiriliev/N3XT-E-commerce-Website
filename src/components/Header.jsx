import { Link, useNavigate } from "react-router-dom";
import { nextLogo } from "../assets";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from "react-redux";
import HeaderSubmenu from "./HeaderSubmenu";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export default function Header({ products }) {

    const productData = useSelector((state) => state.next.productData);
    const userInfo = useSelector((state) => state.next.userInfo);

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate()
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setFilteredProducts([]);
                setSearchQuery("");
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [ref]);


    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        const filtered = products?.filter((product) => product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
        setFilteredProducts(filtered);
    }, [searchQuery])

    return (

        <div className='w-full h-40 bg-white border-b-[1px] border-b-gray-300 sticky top-0 z-50 transition-all duration-300'>
            <div className="flex items-center justify-evenly">
                <div className="flex justify-center items-center gap-10">
                    <Link to="/">
                        <img className="w-40 mt-1" src={nextLogo} alt="ElShisha" />
                    </Link>
                    <div className="flex items-center gap-8">
                        <ul className="w-full flex items-center justify-center gap-10">
                            <li className="text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s"> Women</li>
                            <li className=" text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">Men</li>
                        </ul>
                    </div>
                </div>
                <div ref={ref} className="relative w-full lg:w-[600px] h-[50px] text-base bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
                    <FaSearch className="w-5 h-5" />
                    <input
                        className="w-full h-10 border-[1px] px-4 rounded-md"
                        type="text"
                        onChange={handleSearch}
                        value={searchQuery}
                        placeholder="Search products here"
                    />
                    {searchQuery && (
                        <div className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-999 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}>
                            {searchQuery && filteredProducts.map((product) => (
                                <div onClick={() => navigate(`/product/${product.title
                                    .toLowerCase()
                                    .split(" ")
                                    .join("")}`,
                                    {
                                        state: {
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
                                    <img className="w-24" src={product.image} alt="productImg" />
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
                <div className="flex items-center gap-10 mx-10">
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

                    <Link to="/cart">
                        <div className=" hover:text-orange-300 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                            <ShoppingBagOutlinedIcon />
                            <span className="w-6 font-semibold top-2 left-0 items-center justify-center">{productData.length}</span>
                        </div>
                    </Link>
                    <Link to="/login">
                        <img
                            className="w-8 h-8 rounded-full"
                            src={userInfo ? userInfo.image : "https://img.freepik.com/premium-vector/user-customer-avatar-vector-illustration_276184-160.jpg?w=740"}
                            alt="userLogo"
                        /></Link>
                    {
                        userInfo && <p className="text-base font-semibold underline underline-offset-2">{userInfo.name}</p>
                    }
                </div>
            </div>
            <div className='w-full mt-5 border-b-gray-300 flex justify-center bg-white sticky top-0 -z-50 transition-all duration-300'>
                <HeaderSubmenu />
            </div>
        </div>
    );
}