import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import { clothingSubmenus } from "./ClothingSubmenus";

const Clothing = () => {

    const [products, setProducts] = useState([]);

    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const data = useLoaderData()
    useEffect(() => {
        setProducts(data.data)
    }, [data])


    return (
        <div className="w-full flex-col ml-20 mt-8">
            <div className="flex gap-5">
                <Link to="/">
                    <h1 className="uppercase text-sm text-gray-600">Home page</h1>
                </Link>
                <div className="flex items-center" >
                    <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-600" />
                </div>
                <h1 className="uppercase text-sm text-gray-600">Men</h1>
            </div>
            <div>
                <h1 className="text-3xl uppercase font-bold mt-6">Men apparel</h1>
            </div>
            <div className="flex">
                <div className="flex-col">
                    <div>
                        <h1 className="font-bold text-2xl py-4">Clothing</h1>
                        <div className="flex-col">
                            {clothingSubmenus.map((cloth) => (
                                <div className="">
                                    <h1 className="py-4 decoration-[1px] cursor-pointer duration-300 ease-out 0.3s"
                                        onClick={() => setActiveSubMenu(cloth.name)}
                                    >{cloth.name}</h1>
                                    {
                                        activeSubMenu === cloth.name && cloth.sublinks && <div>
                                            <div>
                                                {cloth.sublinks.map((sublink) => (
                                                    <h1 className="text-sm text-gray-600 my-3">
                                                        <Link to={sublink.link} className="hover:text-yellow-600 px-2 ml-2">{sublink.name}</Link>
                                                    </h1>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
                <div className="w-full flex-col -ml-20 mt-10">
                    <div className="w-2/5 justify-center flex ml-14 gap-8">
                        <h1>Sort by: <ExpandMoreOutlinedIcon /></h1>
                        <h1>Size <ExpandMoreOutlinedIcon /></h1>
                        <h1>Color <ExpandMoreOutlinedIcon /></h1>
                        <h1>Brand <ExpandMoreOutlinedIcon /></h1>
                        <h1>SALE</h1>
                    </div>
                    <div className="w-5/6 mx-auto py-10 grid grid-cols-4 gap-10">
                        {
                            products.map((item) => (
                                <ProductCard key={item._id} product={item} />
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Clothing
