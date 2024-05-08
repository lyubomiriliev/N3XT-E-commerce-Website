import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import { clothingSubmenusMen } from "./ClothingSubmenus";
import { ShoesSubmenusMen } from "./ShoesSubmenu";

const Clothing = ({ category }) => {

    const [products, setProducts] = useState([]);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const data = useLoaderData()
    useEffect(() => {
        setProducts(data.data)
    }, [data])

    const toggleSubMenu = (clothName) => {
        setActiveSubMenu((prevActiveSubmenu) => {
            return prevActiveSubmenu === clothName ? null : clothName;
        })
    }

    const submenus = category === 'clothing' ? clothingSubmenusMen : ShoesSubmenusMen

    return (
        <div className="w-full flex-col ml-20 mt-8">
            <div className="flex gap-5">
                <Link to="/">
                    <h1 className="uppercase text-sm text-gray-600">Home page</h1>
                </Link>
                <div className="flex items-center" >
                    <ArrowForwardIosOutlinedIcon className=" scale-75 text-gray-600" />
                </div>
                <h1 className="uppercase text-sm text-gray-600">Clothing</h1>
            </div>
            <div>
                <h1 className="text-3xl uppercase font-bold mt-6">Men apparel</h1>
            </div>
            <div className="flex">
                <div className="flex-col">
                    <div>
                        <h1 className="font-bold text-2xl py-4">Clothing</h1>
                        <div className="flex-col">
                            {submenus.map((product) => (
                                <div key={product.name}>
                                    <div onClick={() => toggleSubMenu(product.name)} >
                                        <Link to={product.link}>
                                            <h1 className="py-4 decoration-[1px] cursor-pointer hover:bg-gray-300 duration-100 ease-out 0.3s">{product.name}</h1>
                                        </Link>
                                    </div>
                                    {
                                        activeSubMenu === product.name && product.sublinks && <div>
                                            <div>
                                                {product.sublinks.map((sublink) => (
                                                    <h1 key={sublink.name} className="hover:scale-110 duration-100 text-sm text-gray-600 my-3">
                                                        <Link to={sublink.link} className=" px-2 ml-2">{sublink.name}</Link>
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
