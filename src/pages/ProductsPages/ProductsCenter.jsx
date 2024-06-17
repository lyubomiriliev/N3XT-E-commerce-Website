import ProductCard from "../../components/ProductCard"

const ProductsCenter = ({ filteredProducts, view }) => {


    return (
        <div>
            <div className={`w-full md:w-5/6 mx-auto py-10 ${view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'flex flex-col space-y-4'}`}>
                {filteredProducts.map(item => (
                    <ProductCard key={item._id} product={item} view={view} />
                ))}
            </div>
        </div>
    )
}

export default ProductsCenter
