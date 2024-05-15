import { useLoaderData } from "react-router-dom"
import ProductCard from "../../components/ProductCard"
import { LouisVuittonBags, WomenJackets } from "../../fakeAPI/fakeAPI"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductsCenter = ({ filteredProducts }) => {

    const [products, setProducts] = useState([]);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    const data = useLoaderData()
    useEffect(() => {
        setProducts(data.data)
    }, [data])

    const filteredWomenJackets = WomenJackets.filter(
        (item) => item.category === selectedSexCategory
    );

    return (
        <div>
            {
                filteredProducts ?
                    <div className="w-5/6 mx-auto py-10 grid grid-cols-4 gap-10">
                        {
                            filteredProducts.map((item) => (
                                <ProductCard key={item._id} product={item} />
                            ))
                        }
                        {filteredWomenJackets.map((item) => (
                            <ProductCard key={item._id} product={item} />
                        ))}
                    </div>
                    : <div className="w-5/6 mx-auto py-10 grid grid-cols-4 gap-10">
                        {
                            products.map((item) => (
                                <ProductCard key={item._id} product={item} />
                            ))
                        }
                        {
                            LouisVuittonBags.map((item) => (
                                <div key={item._id}>
                                    <div className="w-full">
                                        <img className="hover:scale-110 duration-300 overflow-hidden" src={item.img} alt="ProductImg" />
                                        <div className="flex">
                                            <h1 className="text-2xl font-bold">{item.title}</h1>
                                            <p className="mt-5">${item.price}</p>
                                        </div>
                                        <p className="mt-2">{item.category}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }


        </div>
    )
}

export default ProductsCenter
