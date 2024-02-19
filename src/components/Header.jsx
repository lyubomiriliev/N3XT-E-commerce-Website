import { ShishaLogo } from "../assets";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export default function Header() {
    return (
        <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-300 sticky top-0 z-50">
            <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
                <div>
                    <img className="w-40" src={ShishaLogo} alt="ElShisha" />
                </div>
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">Home</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">SALE</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">El Devices</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">El Flavours</li>
                        <li className="text-base text-black font-bold hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">Gift Sets</li>
                    </ul>
                    <div className=" hover:text-orange-600 hover:scale-110 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s">
                        <ShoppingBagOutlinedIcon />
                        <span className="w-6 font-semibold top-2 left-0 items-center justify-center">0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}