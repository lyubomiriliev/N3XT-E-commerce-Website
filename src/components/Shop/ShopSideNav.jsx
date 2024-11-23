import Brand from "./shopBy/Brand.jsx";
import Price from "./shopBy/Price.jsx";

const ShopSideNav = () => {
  return (
    <div className="flex md:flex-col gap-4">
      <Brand />
      <Price />
    </div>
  );
};

export default ShopSideNav;
