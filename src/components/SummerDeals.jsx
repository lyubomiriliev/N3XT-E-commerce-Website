import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const SummerDeals = () => {

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    return (
        <div className="w-full flex flex-col mx-auto items-center relative md:mt-10">
            <Link className="w-full h-80 object-cover" to={`/${selectedSexCategory}/sale`}>
                <img
                    className="w-full h-80 object-cover"
                    src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="SummerSaleBanner"
                />
                <div className="w-full flex flex-col justify-center mt-2 absolute top-2 left-10">
                    <h1 className="font-bold text-white text-2xl md:text-4xl">SUMMER SALE UP TO 50% OFF</h1>
                    <h3 className="font-bold text-white text-2xl mt-2">{selectedSexCategory} accessories</h3>
                    <button className="w-40 h-10 mt-2 mr-2 md:mt-5 border-[1px] rounded-3xl text-black md:text-white border-black md:border-white flex items-center justify-center hover:cursor-pointer hover:bg-gray-600 hover:text-white duration-300">SHOP NOW</button>
                </div>
                <div className="w-full flex justify-center">

                </div>
            </Link>
        </div>
    )
}

export default SummerDeals
