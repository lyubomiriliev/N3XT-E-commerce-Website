import { Link } from "react-router-dom";
import { nextLogo } from "../assets";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {

    const productData = useSelector((state) => state.shisha.productData);
    const userInfo = useSelector((state) => state.shisha.userInfo);
    console.log(userInfo)

    const [isHovered, setIsHovered] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const handleMouseEnter = () => {
        setIsHovered(true)
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleMenuEnter = (menu) => {
        setActiveMenu(menu);
    }

    const handleMenuLeave = () => {
        setActiveMenu(null);
    }

    const handleBackdropClick = () => {
        setActiveMenu(null);
    }


    return (

        <div className='w-full h-40 bg-white border-b-[1px] border-b-gray-300 sticky top-0 z-50 transition-all duration-300' onClick={handleBackdropClick}>

            <div className="w-full flex items-center justify-evenly">
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
                <div className="flex w-1/4">
                    <input className="w-full h-10 border-[1px] px-4 rounded-md" type="text" placeholder="Search..." />
                </div>
                <div className="flex items-center gap-10 mx-10">
                    <Link to="/wishlist">
                        <div className=" hover:text-orange-300 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                            <FavoriteBorderOutlinedIcon />
                        </div>
                    </Link>
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
            <div className={`w-full h-${activeMenu ? '60' : '0'} border-b-gray-300 flex justify-center bg-white sticky top-0 z-50 transition-all duration-300 `}>
                <ul className="flex justify-center gap-8">
                    <li className={`text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s ${activeMenu === 'Shoes' && 'hovered'}`}
                        onMouseEnter={() => handleMenuEnter('Clothing')}
                        onMouseLeave={handleMouseLeave}>
                        Clothing
                    </li>
                    {activeMenu === 'Clothing' && (
                        <div className="w-full bg-red-200 relative">
                            <ul className="absolute top-10 -left-24 ">
                                <Link to="/coats">
                                    <li className="hover:scale-110 mt-2">Coats</li>
                                </Link>
                                <Link to="/jackets">
                                    <li className="hover:scale-110 mt-2">Jackets</li>
                                </Link>
                                <li className="hover:scale-110 mt-2">T-Shirts</li>
                                <li className="hover:scale-110 mt-2">Jeans</li>
                                <li className="hover:scale-110 mt-2">Formal</li>
                            </ul>
                        </div>
                    )}
                    <li
                        className={`text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s ${activeMenu === 'Shoes' && 'hovered'}`}
                        onMouseEnter={() => handleMenuEnter('Shoes')}
                        onMouseLeave={handleMouseLeave}
                    >
                        Shoes
                    </li>
                    {activeMenu === 'Shoes' && (
                        <div className="w-full bg-red-200 relative">
                            <ul className="absolute top-10 -left-20 ">
                                <li className="hover:scale-110 mt-2">Sneakers</li>
                                <li className="hover:scale-110 mt-2">Loafers</li>
                                <li className="hover:scale-110 mt-2">Flip Flops</li>
                                <li className="hover:scale-110 mt-2">Boots</li>
                            </ul>
                        </div>
                    )}
                    <li className="text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        Accessories
                    </li>
                    <li className="text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        Bags
                    </li>
                    <li className="text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        Jewelry
                    </li>
                    <li className="text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        Brands
                    </li>
                    <li className="text-black font-bold hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                        SALE
                    </li>
                </ul>
            </div>
        </div>
    );
}