import { Link } from "react-router-dom";
import { nextLogo } from "../assets";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from "react-redux";
import HeaderSubmenu from "./HeaderSubmenu";

export default function Header() {

    const productData = useSelector((state) => state.shisha.productData);
    const userInfo = useSelector((state) => state.shisha.userInfo);
    console.log(userInfo)

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
                <div className="flex w-1/3">
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
            <div className='w-full mt-5 border-b-gray-300 flex justify-center bg-white sticky top-0 z-50 transition-all duration-300'>
                <HeaderSubmenu />

            </div>
        </div>
    );
}