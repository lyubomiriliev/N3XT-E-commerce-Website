import Banner from "../components/Banner";
import Products from "../components/Products";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";

export default function Home({ products }) {


    return (
        <div>
            <Banner />
            <Products products={products} />
            <FeaturedProducts products={products} />
            <Newsletter />
        </div>
    );
}