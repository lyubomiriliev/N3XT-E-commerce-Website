import { AiOutlineShoppingCart } from "react-icons/ai";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart, removeFavorite } from '../redux/nextSlice';
import { addToFavorites } from '../redux/nextSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ProductCard = ({ product, view }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [isFavorite, setIsFavorite] = useState(false);
    // const location = useLocation()

    const _id = product.title;
    const idString = (_id) => {
        return String(_id).toLowerCase().split(" ").join("");
    }
    const rootId = idString(_id)

    const handleDetails = () => {
        const currentPath = window.location.pathname;
        const newPath = `/product/${rootId}`;
        navigate(newPath, {
            state: {
                product: product,
            }
        })
    }

    // const getLocation = window.location.pathname;

    const handleFavoriteItem = () => {
        const updatedIsFavorite = !isFavorite;
        setIsFavorite(updatedIsFavorite);

        // Save to localStorage
        localStorage.setItem(`favorite-${product._id}`, JSON.stringify(updatedIsFavorite));

        if (updatedIsFavorite) {
            dispatch(addToFavorites({
                _id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: 1,
                description: product.description,
            }));
            toast.success(`${product.title} is added to favorites`, {
                onClick: () => navigate("/wishlist")
            });
        } else {
            dispatch(removeFavorite(product._id));
            toast.error(`${product.title} is removed from favorites`);
        }
    };

    useEffect(() => {
        const storedFavoriteStatus = localStorage.getItem(`favorite-${product._id}`);
        if(storedFavoriteStatus) {
            setIsFavorite(JSON.parse(storedFavoriteStatus))
        }
    },[product._id])


    return (
        <div className={`${view === 'list' ? 'flex group relative h-96' : 'w-full group relative'}`}>
            <div onClick={handleDetails} className={`${view === "list" ? 'w-1/3 h-96 cursor-pointer overflow-hidden' : 'w-full h-60 md:h-96 cursor-pointer overflow-hidden'}`}>
                <img className={`${view === "list" ? 'w-full h-full object-cover border-[1px] border-gray-200 group-hover:scale-110 duration-300' : 'w-full border-[1px] border-gray-200 h-80 rounded-tr-md rounded-tl-md md:h-full object-cover group-hover:scale-110 duration-300'}`} src={product.image} alt="productImage" />
            </div>
            <div className="w-full border-[1px] px-2 flex justify-center flex-col">
                <div className={`${view === 'list' ? 'flex-col' : 'flex flex-col items-center justify-center'}`}>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h2 className="text-sm md:text-base w-full h-20 justify-center items-center flex font-bold text-center">{product.title}</h2>
                        {view === 'list' ? (
                            <div className='w-2/4 mb-5'>
                                <p className='text-sm text-gray-600'>{[product.description]}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className={`${view === 'list' ? 'flex relative overflow-hidden  w-full' : 'flex flex-col items-center justify-center gap-2 relative w-full text-sm'}`}>
                        <div className={`${view === 'list' ? 'flex-col' : 'flex gap-2'}`}>
                            <p>Price:</p>
                            <p className="line-through text-gray-500">${product.oldPrice}</p>
                            <p className="font-semibold">${product.price}</p>
                        </div>
                        <div onClick={() => dispatch(addToCart({
                            _id: product._id,
                            title: product.title,
                            image: product.image,
                            price: product.price,
                            oldPrice: product.oldPrice,
                            quantity: 1,
                            description: product.description,
                        })
                        ) & toast.success(`${product.title} is added to the cart`)
                        } className="w-full justify-between text-gray-500 text-md flex items-center top-0">
                            <div className='px-2 bg-gray-200 hover:bg-stone-300 duration-300 ease-in-out rounded-md mb-2 items-center justify-center flex w-full gap-2 py-2'>
                                <span className='font-light text-black'>Add to cart</span>
                                <button className='text-2xl text-black'><AiOutlineShoppingCart /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${view === 'list' ? 'absolute bottom-4 left-0' : 'absolute bottom-40 right-0'}`}>
                    {
                        product.isNew && (
                            <p className='bg-red-600 text-white rounded-tl-md rounded-bl-md font-semibold uppercase px-4 py-1'>Sale</p>
                        )
                    }
                </div>
                {isFavorite ? (
                    <div onClick={handleFavoriteItem} className={`${view === 'list' ? 'absolute top-4 left-4' : 'absolute md:top-0 top-0 bg-transparent cursor-pointer px-0 py-2 rounded-md right-2 md:right-3'}`}>
                        <button ><FavoriteIcon /></button>
                    </div>
                )
                :
                (
                    <div onClick={handleFavoriteItem} className={`${view === 'list' ? 'absolute top-4 left-4' : 'absolute md:top-0 top-0 bg-transparent cursor-pointer px-0 py-2 rounded-md right-2 md:right-3'}`}>
                        <button ><FavoriteBorderIcon /></button>
                    </div>
                )
                }
            </div >

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

export default ProductCard
