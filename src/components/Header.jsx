import { Link } from "react-router-dom";
import { ShishaLogo } from "../assets";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useSelector } from "react-redux";

export default function Header() {

    const productData = useSelector((state) => state.shisha.productData);

    return (
        <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-300 sticky top-0 z-50">
            <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
                <Link to="/">
                    <div>
                        <img className="w-40" src={ShishaLogo} alt="ElShisha" />
                    </div></Link>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">Home</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">SALE</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">El Devices</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">El Flavours</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">Gift Sets</li>
                    </ul>
                    <Link to="/cart">
                        <div className=" hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                            <ShoppingBagOutlinedIcon />
                            <span className="w-6 font-semibold top-2 left-0 items-center justify-center">{productData.length}</span>
                        </div>
                    </Link>
                    <img
                        className="w-8 h-8 rounded-full"
                        src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="userLogo"
                    />
                </div>
            </div>
        </div>
    );
}