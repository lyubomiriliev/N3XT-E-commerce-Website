import { AiOutlineShoppingCart } from "react-icons/ai";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart, removeFavorite } from '../redux/nextSlice';
import { addToFavorites } from '../redux/nextSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useFavorite from "../hooks/useFavorite";

const ProductCard = ({ product, view }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {isFavorite, handleFavoriteItem} = useFavorite(product);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

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


    return (
        <div className={`${view === 'list' ? 'flex group relative h-96' : 'w-full group relative'}`}>
            <div onClick={handleDetails} className={`${view === "list" ? 'w-2/3 h-full cursor-pointer rounded-md overflow-hidden' : 'w-full h-60 md:h-96 cursor-pointer overflow-hidden'}`}>
                <img className={`${view === "list" ? 'w-full h-96 object-cover border-[1px] border-gray-200 group-hover:scale-110 duration-300' : 'w-full border-[1px] border-gray-200 h-80 rounded-tr-md rounded-tl-md md:h-full object-cover group-hover:scale-110 duration-300'}`} src={product.image} alt="productImage" />
            </div>
            <div className="w-full border-[1px] px-2 flex justify-center flex-col">
                <div className={`${view === 'list' ? 'flex-col flex h-full justify-between px-2' : 'flex flex-col items-center justify-center'}`}>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h2 className="text-sm md:text-base w-full py-4 h-16 items-center flex font-bold text-center">{product.title}</h2>
                        <div className="w-full text-base flex flex-col">
                            <p className="text-sm font-bold text-black">{selectedSexCategory.toUpperCase()}</p>
                            <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                            <p className="text-sm text-gray-600">Category:{product.type}</p>
                            <p className="text-sm text-gray-600">Type:{product.itemCategory}</p>
                        </div>
                        {view === 'list' ? (
                            <div className='w-full mt-4'>
                                <p className='text-base text-black'>{[product.description]}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className={`${view === 'list' ? 'flex flex-col justify-start items-start relative overflow-hidden w-full' : 'flex flex-col items-center justify-center gap-2 relative w-full text-sm'}`}>
                        <div className={`${view === 'list' ? 'flex justify-center items-center gap-2' : 'flex gap-2'}`}>
                            <p>Price:</p>
                            <p className="line-through text-gray-500">${product.oldPrice}</p>
                            <p className="font-semibold">${product.price}</p>
                        </div>
                        <div onClick={() => dispatch(addToCart({
                            _id: product._id,
                            title: product.title,
                            isNew: product.isNew,
                            brand: product.brand,
                            itemCategory: product.itemCategory,
                            type: product.type,
                            image: product.image,
                            price: product.price,
                            oldPrice: product.oldPrice,
                            quantity: 1,
                            description: product.description,
                        })
                        ) & toast.success(`${product.title} is added to the cart`, {
                            onClick: () => navigate("/cart"),
                          })
                        } className={`${view === 'list' ? 'w-1/3 mt-2 justify-between text-gray-500 flex' : 'w-full justify-between text-gray-500 text-md flex items-center top-0'}`}>
                            <div className='px-2 bg-gray-200 hover:bg-stone-300 duration-300 ease-in-out rounded-md mb-2 items-center justify-center flex w-full gap-2 py-2'>
                                <span className='font-light text-black'>Add to cart</span>
                                <button className='text-2xl text-black'><AiOutlineShoppingCart /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${view === 'list' ? 'absolute bottom-4 left-0' : 'absolute top-4 left-0'}`}>
                    {
                        product.isNew && (
                            <p className='bg-red-600 text-white rounded-tr-md rounded-br-md font-semibold uppercase px-4 py-1'>Sale</p>
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
