import FeaturedProductCard from "./FeaturedProductCard"

const FeaturedProducts = ({ products }) => {
    return (
        <div className="py-10">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl py-2 w-160 text-center">MOST WANTED</h1>
                <h2 className="text-4xl py-2 w-160 text-center">El Cigarro</h2>
                <p className="text-sm max-w-[700px] text-gray-500 text-center">Electronic narghile in the form of a cigar.</p>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    {
                        products.slice(0, 3).map((item) => (
                            <FeaturedProductCard key={item._id} product={item} />
                        ))
                    }
                </div>
                <h2 className="text-4xl py-2 w-160 text-center">El Shisha Diamond Nicotine</h2>
                <p className="text-sm max-w-[700px] text-gray-500 text-center">Disposable vape with nicotine</p>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    {
                        products.slice(3, 6).map((item) => (
                            <FeaturedProductCard key={item._id} product={item} />
                        ))
                    }
                </div>
                <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300">Discover</button>
                <h2 className="text-4xl py-2 w-160 text-center">El Shisha Diamond</h2>
                <p className="text-sm max-w-[700px] text-gray-500 text-center">Luxurious disposable vape with 2500 puffs.</p>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    {
                        products.slice(3, 6).map((item) => (
                            <FeaturedProductCard key={item._id} product={item} />
                        ))
                    }
                </div>
                <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300">Discover</button>
                <h2 className="text-4xl py-2 w-160 text-center">El Shisha Zahir</h2>
                <p className="text-sm max-w-[700px] text-gray-500 text-center">Hybrid electronic narghile</p>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    {
                        products.slice(3, 6).map((item) => (
                            <FeaturedProductCard key={item._id} product={item} />
                        ))
                    }
                </div>
                <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300">Discover</button>
                <h2 className="text-4xl py-2 w-160 text-center">El Shisha Blink Blink</h2>
                <p className="text-sm max-w-[700px] text-gray-500 text-center">Disposable portable electronic narghile</p>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    {
                        products.slice(3, 6).map((item) => (
                            <FeaturedProductCard key={item._id} product={item} />
                        ))
                    }
                </div>
                <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300">Discover</button>
                <h2 className="text-4xl py-2 w-160 text-center">El Shisha Vogue</h2>
                <p className="text-sm max-w-[700px] text-gray-500 text-center">Rechargeable portable electronic narghile</p>
                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    {
                        products.slice(3, 6).map((item) => (
                            <FeaturedProductCard key={item._id} product={item} />
                        ))
                    }
                </div>
                <button className="w-40 h-10 border-[1px] rounded-3xl text-black border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300">Discover</button>

                <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-3 gap-10">
                    <p>Highest quality designer portable electronic shisha</p>
                    <p>The fastest and easiest way to quit smoking</p>
                    <p>You can use it everywhere - no restrictions</p>
                    <p>Portable, lightweight and easy to carry</p>
                    <p>Without burning! No nicotine, tar, no smell.</p>
                    <p>100% leak proof + child proof function</p>
                </div>
            </div>
        </div>
    )
}

export default FeaturedProducts
