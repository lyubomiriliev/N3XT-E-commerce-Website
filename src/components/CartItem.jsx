import { useDispatch, useSelector } from "react-redux"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { decrementQuantity, deleteItem, incrementQuantity, resetCart } from "../redux/nextSlice";
import { ToastContainer, toast } from "react-toastify";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Link } from "react-router-dom";

const CartItem = (item) => {

    const dispatch = useDispatch()

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)


    const productData = useSelector((state) => state.next.productData)
    return (
        <div className="w-full md:w-full">
            <div className="">
                <div className="w-full justify-center items-center mx-auto">
                    {productData.length > 0
                        ?
                        <h2 className="text-2xl">Shopping Cart</h2>
                        :
                        <h1 className="text-2xl flex justify-center items-center text-black">Your cart is empty. Please go back to shopping and add products to the cart.</h1>}
                </div>
            </div>
            <div>
                {productData.map((item) => (
                    <div key={item._id} className="flex items-center justify-between gap-6 mt-6">
                        <div className="flex items-center gap-2 relative">
                            <CloseOutlinedIcon onClick={() => dispatch(deleteItem(item._id)) & toast.error(`${item.title} is removed`)} className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300 absolute top-0 right-0" />
                            <img className="w-32 h-32 object-cover" src={item.image} alt="" />
                        </div>
                        <h2 className="w-52">{item.title}</h2>
                        <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                            <p className="text-sm">Quantity</p>
                            <div className="flex items-center gap-4 text-sm font-semibold">
                                <button onClick={() => dispatch(decrementQuantity({
                                    _id: item._id,
                                    title: item.title,
                                    image: item.image,
                                    price: item.price,
                                    quantity: 1,
                                    description: item.description,
                                })
                                )
                                } className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black">
                                    -</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => dispatch(incrementQuantity({
                                    _id: item._id,
                                    title: item.title,
                                    image: item.image,
                                    price: item.price,
                                    quantity: 1,
                                    description: item.description,
                                })
                                )
                                } className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black">
                                    +</button>
                            </div>
                        </div>
                        <p className="w-14">${item.quantity * item.price}</p>
                    </div>
                ))}
            </div>
            {productData.length > 0 ?
                <button
                    onClick={() => dispatch(resetCart()) & toast.error("Your cart is empty!")}
                    className="bg-red-500 text-white mt-8 py-1 px-6 hover:bg-red-800">Empty cart
                </button>
                :
                null
            }
            <Link to={`/${selectedSexCategory}`}>
                <button className="mt-8 flex items-center gap-1 text-gray-400 hover:text-black duration-300 ">
                    <span>
                        <KeyboardBackspaceOutlinedIcon />
                    </span>
                    go shopping
                </button>
            </Link>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default CartItem
