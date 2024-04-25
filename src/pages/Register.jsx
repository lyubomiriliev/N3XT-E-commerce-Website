import { useEffect, useState } from "react";
import { GoogleLogo } from "../assets";
import axios from "axios";

const Register = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://fakestoreapiserver.reactbd.com/products");
                setProducts(response.data)
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        fetchProducts();
    }, [])

    return (
        <div>
            <div className=" max-w-screen-xl mx-auto py-20 flex ">
                <div className="w-1/3 pr-10">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold">N3XT | Your only fashion world.</h1>
                        <div className="mt-6">
                            <div className="flex flex-col">
                                <label className="mb-2">Email</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Enter your email to login or register" />
                                <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Continue</button>
                            </div>
                            <div className="flex mx-auto py-5">
                                <div className=" border-[1px] h-1">
                                </div>
                                <p>OR</p>
                            </div>
                            <div className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
                                <img className="w-10" src={GoogleLogo} alt="" />
                                <span className="text-sm text-gray-900">Continue with Google</span>
                            </div>
                            <div className="text-base w-60 h-12 tracking-wide border-[1px] mt-4 border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
                                <img className="w-10" src={GoogleLogo} alt="" />
                                <span className="text-sm text-gray-900">Continue with Apple</span>
                            </div>
                            <div className="text-base w-60 h-12 tracking-wide border-[1px] mt-4 border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
                                <img className="w-10" src={GoogleLogo} alt="" />
                                <span className="text-sm text-gray-900">Continue with Facebook</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" overflow-hidden">
                    <div className="gap-3 ml-10 grid grid-cols-3 animate-loop-scroll">
                        {products.slice(0, 9).map((product, index) => (
                            <img key={index} src={product.image} className="w-60 h-60 object-cover" alt={`Product ${index}`} />
                        ))}
                    </div>
                    <div className="gap-3 mt-3 ml-10 grid grid-cols-3 animate-loop-scroll aria-hidden:">
                        {products.slice(9, 18).map((product, index) => (
                            <img key={index} src={product.image} className="w-60 h-60 object-cover" alt={`Product ${index}`} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Register
