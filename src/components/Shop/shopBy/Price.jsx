import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { RiArrowDropDownLine } from "react-icons/ri";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import { setFilteredProducts } from "../../../redux/nextSlice";

const Price = () => {
  const dispatch = useDispatch();
  const selectedSexCategory = useSelector((state) => state.next.sexCategory);
  const products = useSelector((state) => state.next.allProducts);

  const priceList = [
    {
      _id: 950,
      priceOne: 0,
      priceTwo: 99,
    },
    {
      _id: 951,
      priceOne: 99,
      priceTwo: 300,
    },
    {
      _id: 952,
      priceOne: 300,
      priceTwo: 700,
    },
    {
      _id: 953,
      priceOne: 700,
      priceTwo: 1200,
    },
    {
      _id: 954,
      priceOne: 1200,
      priceTwo: 3000,
    },
    {
      _id: 955,
      priceOne: 3000,
      priceTwo: 50000,
    },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [showPrices, setShowPrices] = useState(true);
  const [activePrice, setActivePrice] = useState(null);

  const isMobile = useDeviceDetect();

  useEffect(() => {
    if (isMobile) {
      setShowPrices(false);
    }
  }, [isMobile]);

  const sortProducts = (products, option = "low-to-high") => {
    const sortedProducts = [...products];
    if (option === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    return sortedProducts;
  };

  const filteredProductsByPriceRange = (priceOne, priceTwo, id) => {
    if (activePrice === id) {
      const sorted = sortProducts(products);
      dispatch(setFilteredProducts(products));
      setActivePrice(null);
    } else {
      const filtered = products.filter(
        (product) =>
          product.price >= priceOne &&
          product.price <= priceTwo &&
          product.category === selectedSexCategory.toLowerCase()
      );
      const sortedFiltered = sortProducts(filtered);
      dispatch(setFilteredProducts(sortedFiltered));
      setActivePrice(id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="cursor-pointer">
      <div onClick={() => setShowPrices(!showPrices)}>
        <div className="flex items-center">
          <h1 className="font-bold text-sm md:text-xl w-28 md:w-48 my-2">
            Filter By Price
          </h1>
          <RiArrowDropDownLine className="font-bold text-4xl" />
        </div>
      </div>
      {showPrices && (
        <div>
          <ul className="flex flex-col gap-3 text-sm mb-10 lg:text-base text-[#767676]">
            {priceList.map((item) => (
              <li
                key={item._id}
                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-gray-800 hover:border-gray-600 duration-300 ${
                  activePrice === item._id
                    ? " text-indigo-600 border-indigo-600"
                    : ""
                }`}
                onClick={() =>
                  filteredProductsByPriceRange(
                    item.priceOne,
                    item.priceTwo,
                    item._id
                  )
                }
              >
                ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Price;
