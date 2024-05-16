import { useSelector } from "react-redux"
import Brand from "./shopBy/Brand.jsx"
import Color from "./shopBy/Color.jsx"
import Price from "./shopBy/Price.jsx"


const ShopSideNav = ({ products, setFilteredProducts }) => {

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

    return (
        <div>
            <Brand />
            <Color />
            <Price products={products} setFilteredProducts={setFilteredProducts} selectedSexCategory={selectedSexCategory} />
        </div>
    )
}

export default ShopSideNav
