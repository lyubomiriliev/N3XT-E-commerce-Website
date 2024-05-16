import ProductCard from "../../components/ProductCard"
import { useState } from "react";
import { useSelector } from "react-redux";

const ProductsCenter = ({ filteredProducts }) => {

    const [products, setProducts] = useState([]);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    // const filteredProductsByCategory = () => {
    //     if (selectedCategory === 'jackets') {
    //         return Jackets.filter(item => item.category === selectedSexCategory);
    //     } else if (selectedCategory === 'hoodies') {
    //         return Hoodies.filter(item => item.category === selectedSexCategory);
    //     } else if (selectedCategory === 'formal') {
    //         return Formal.filter(item => item.category === selectedSexCategory);
    //     } else if (selectedCategory === 'boots') {
    //         return Boots.filter(item => item.category === selectedSexCategory);
    //     } else if (selectedCategory === 'mocassins') {
    //         return Mocassins.filter(item => item.category === selectedSexCategory);
    //     } else if (selectedCategory === 'sneakers') {
    //         return Sneakers.filter(item => item.category === selectedSexCategory);
    //     } else {
    //         return filteredProducts || products;
    //     }
    // };

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
