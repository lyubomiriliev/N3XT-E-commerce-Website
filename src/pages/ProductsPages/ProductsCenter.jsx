import ProductCard from "../../components/ProductCard"

const ProductsCenter = ({ filteredProducts }) => {


    return (
        <div>
            <div className="w-5/6 mx-auto py-10 grid grid-cols-4 gap-10">
                {filteredProducts.map(item => (
                    <ProductCard key={item._id} product={item} />
                ))}
            </div>
        </div>
    )
}

export default ProductsCenter
