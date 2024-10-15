import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/nextSlice";
import { ToastContainer, toast } from "react-toastify";

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';


const Product = () => {

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();

    let [baseQuantity, setBaseQuantity] = useState(1);
    const [details, setDetails] = useState({});
    const [lastSegment, setLastSegment] = useState("");

    const selectedProductCategory = useSelector((state) => state.next.productCategory)
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)
    const [breadcrumbCategory, setBreadcrumbCategory] = useState("");


    useEffect(() => {
        const segments = location.pathname.split("/");
        const lastSegment = segments[segments.length - 1];
        setLastSegment(lastSegment)

        setDetails(location.state.product)

        if (selectedProductCategory) {
            setBreadcrumbCategory(selectedProductCategory);
        } else if (segments.length > 2) {
            setBreadcrumbCategory(segments[2])
        }

    }, [location, selectedProductCategory])

    

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
        <div className="flex-col w-full mx-auto mt-10">
            {/* Breadcrumbs start */}
            <div className="flex flex-wrap gap-2 justify-center items-center text-sm text-gray-600 ml-4">
                <Link to="/" className="flex items-center">
                    <h1 className="uppercase text-sm text-gray-600">Home page</h1>
                </Link>
                <div className="flex items-center" >
                    <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-600" />
                </div>
                <Link to={`/${selectedSexCategory}/${selectedProductCategory.toLowerCase()}`}>
                    <h1 className="uppercase text-sm text-gray-600">{breadcrumbCategory}</h1>
                </Link>
                <div className="flex items-center" >
                    <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-600" />
                </div>
                <h1 className="uppercase text-sm text-gray-600">{lastSegment}</h1>
            </div>
            {/* Breadcrumbs end */}

            {/* Product details */}
            <div className="max-w-screen-xl mx-auto my-10 flex flex-col md:flex-row gap-10">
                {/* Product img */}
                <div className="w-full md:w-2/5 relative">
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
                        <h2 className="text-4xl font-semibold">{details.title}</h2>
                        <div className="flex items-center gap-4 mt-3">
                            <p className="line-through text-gray-500">${details.oldPrice}</p>
                            <p className="font-semibold">${details.price}</p>
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

