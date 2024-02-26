
const FeaturedProductCard = ({ product }) => {
    return (
        <div className="group relative">
            <div className="w-full h-82 cursor-pointer overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 duration-500" src={product.image} alt="productImage" />
            </div>
        </div>
    )
}

export default FeaturedProductCard
