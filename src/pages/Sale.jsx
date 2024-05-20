import { useEffect, useState } from "react";
import { allProductsData } from "../api/Api";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import ProductBanner from "../components/Shop/ProductBanner";
import ProductsCenter from "./ProductsPages/ProductsCenter";

const Sale = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [view, setView] = useState('grid')
    const [sortOption, setSortOption] = useState('high-to-low');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    const handleItemsPerPageChange = (items) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    }

    const handleSortChange = (option) => {
        setSortOption(option)
        console.log(sortOption)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        const sortProducts = () => {
            if (sortOption === 'high-to-low') {
                return filteredProducts.sort((a, b) => b.price - a.price);
            } else if (sortOption === 'low-to-high') {
                return filteredProducts.sort((a, b) => a.price - b.price);
            }
            return filteredProducts
        }
        sortProducts();
    }, [sortOption])

    const lastProductIndex = currentPage * itemsPerPage;
    const firstProductIndex = lastProductIndex - itemsPerPage;
    const displayedProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)


    useEffect(() => {
        const fetchData = async () => {
            const products = await allProductsData();
            setAllProducts(products)
            setFilteredProducts(products.filter((item) => item.category === selectedSexCategory.toLowerCase()));
        };

        fetchData();
    }, [selectedSexCategory])


    return (
        <div className="max-w-screen-xl mx-auto mt-10 flex flex-col">
            <div className="w-5/6 ml-8 mx-auto flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
                <ProductBanner onViewChange={setView} onItemsPerPageChange={handleItemsPerPageChange} onSortChange={handleSortChange} />
            </div>
            <div className="w-full flex-col -ml-10">
                <ProductsCenter filteredProducts={displayedProducts} view={view} />
            </div>
            <div className="flex justify-center mt-4 mb-10">
                <button
                    onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage}/{totalPages}</span>
                <button
                    onClick={() => {
                        setCurrentPage(prev => (prev * itemsPerPage < filteredProducts.length ? prev + 1 : prev));
                    }
                    }
                    disabled={currentPage * itemsPerPage >= filteredProducts.length}
                    className='px-4 py-2 mx-2 bg-gray-800 text-white rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Sale
