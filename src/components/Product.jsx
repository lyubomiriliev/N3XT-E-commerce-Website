import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/nextSlice";
import { ToastContainer, toast } from "react-toastify";

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Breadcrumbs from "./pageProps/Breadcrumbs";


const Product = () => {

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();

    let [baseQuantity, setBaseQuantity] = useState(1);
    const [details, setDetails] = useState({});
    const [lastSegment, setLastSegment] = useState("");

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu)


    const [breadcrumbCategory, setBreadcrumbCategory] = useState("");



    useEffect(() => {
        const segments = location.pathname.split("/");
        const lastSegment = segments[segments.length - 1];
        setLastSegment(lastSegment)

        setDetails(location.state.product)

        if (selectedSubheaderMenu) {
            setBreadcrumbCategory(selectedSubheaderMenu);
        } else if (segments.length > 2) {
            setBreadcrumbCategory(segments[2])
        }

    }, [location, selectedSubheaderMenu])


    const handleAddToCart = () => {
        dispatch(addToCart({
            _id: details._id,
            title: details.title,
            image: details.image,
            price: details.price,
            quantity: baseQuantity,
            description: details.description,
        }));
        toast.success(`${details.title} is added to the cart.`);

    };


    return (
        <div className="w-full flex flex-col justify-center items-center mt-5">
            <div className="w-full flex justify-center items-center mx-auto">
                <Breadcrumbs />
            </div>
            {/* Product details */}
            <div className="max-w-screen-xl mx-auto my-5 flex flex-col md:flex-row gap-10">
                {/* Product img */}
                <div className="w-full hidden md:flex md:w-2/5 relative">
                    <img className="w-full h-[450px] md:h-[550px] object-cover" src={details?.image} alt="productImg" />
                    <div className="absolute top-4 right-0">
                        {details.isNew && (
                            <div className="absolute top-4 right-0 bg-black text-white font-semibold px-6 py-1">
                                <p>Sale</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Product info */}
                <div className="w-full md:w-3/5 ml-5 md:ml-0 flex flex-col justify-center gap-6 md:gap-12">
                    <div>
                        <h2 className="text-xl md:text-4xl font-semibold">{details.title}</h2>
                        <div className="flex items-center gap-4 mt-3">

                        </div>
                        {/* Product Image MOBILE */}
                <div className="w-full flex md:hidden relative">
                    <img className="w-auto h-80" src={details?.image} alt="productImg" />
                    <div className="absolute top-0 left-20">
                        {details.isNew && (
                            <div className="absolute -top-0 right-0 bg-red-600 rounded-br-md rounded-tr-md text-white font-semibold px-6 py-1">
                                <p>Sale</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full flex items-center gap-2 mt-2">
                <p className="line-through text-gray-500">${details.oldPrice*baseQuantity}</p>
                <p className="font-semibold">${details.price*baseQuantity}</p>
                </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <div className="flex">
                            <StarOutlinedIcon />
                            <StarOutlinedIcon />
                            <StarOutlinedIcon />
                            <StarOutlinedIcon />
                            <StarOutlinedIcon />
                        </div>
                        <p className=" text-gray-500">(13 Customer Reviews)</p>
                    </div>
                    <p className="text-base text-gray-500 mt-3">{details.description}</p>
                    <div className="flex gap-4">
                        <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                            <p className="text-sm">Quantity</p>
                            <div className="flex items-center gap-4 text-sm font-semibold">
                                <button onClick={() => setBaseQuantity(baseQuantity === 1 ? baseQuantity = 1 : baseQuantity - 1)} className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black">
                                    -</button>
                                <span>{baseQuantity}</span>
                                <button onClick={() => setBaseQuantity(baseQuantity + 1)} className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black">
                                    +</button>
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className="bg-black text-white py-3 px-6 active:bg-gray-800">Add to cart</button>
                    </div>
                    <p className="text-base text-gray-500">Category: <span className="font-medium capitalize">{details.category}</span></p>
                </div>
            </div>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                onClick={() => navigate('/cart')}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Product

