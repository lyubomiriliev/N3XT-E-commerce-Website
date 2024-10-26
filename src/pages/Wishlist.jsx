import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';




const Wishlist = () => {

const favoriteProductData = useSelector((state) => state.next.favoriteProductData);
const selectedSexCategory = useSelector((state) => state.next.sexCategory);

  return (
    <div className='w-full px-4 flex flex-col max-w-screen-xl mx-auto min-h-screen'>
        <div className='w-full justify-center  items-center flex h-12 gap-4 py-10'>
            <h1 className='uppercase font-bold tracking-wide text-2xl'>favorites <span>({favoriteProductData.length})</span></h1>
        </div>
        {favoriteProductData.length > 0 ? (
            <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-2'>
            {favoriteProductData.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
        ) : (
            <div className='w-full flex flex-col items-center justify-between'>
                <div>
                    <h1 className='text-gray-600'>You still haven't favorited any products yet.</h1>
                </div>
                <Link to={`/${selectedSexCategory}`}>
                    <button className="mt-8 flex items-center gap-1 text-gray-400 hover:text-black duration-300 ">
                        <span>
                            <KeyboardBackspaceOutlinedIcon />
                        </span>
                            Back to shop
                    </button>
                </Link>
            </div>
        )}

    </div>
  )
}

export default Wishlist