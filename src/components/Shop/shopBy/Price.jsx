import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Price = ({ products, setFilteredProducts }) => {
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

  const location = useLocation()
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1)

  const [showPrices, setShowPrices] = useState(true);
  const [activePrice, setActivePrice] = useState(null);



  const selectedSexCategory = useSelector((state) => state.next.sexCategory)
  const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu)

  const filteredProductsByPriceRange = (priceOne, priceTwo, id) => {

    if (activePrice === id) {
      setFilteredProducts(products.filter((product) => product.type === lastSegment && product.category === selectedSexCategory.toLowerCase()))
      setActivePrice(null)
    } else {
      const filteredProducts = products.filter
        ((product) =>
          product.price >= priceOne &&
          product.price <= priceTwo &&
          product.category === selectedSexCategory.toLowerCase()
          && product.type === lastSegment
        );
      setFilteredProducts(filteredProducts)
      setActivePrice(id)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }



  return (

    <div className="cursor-pointer">
      <div onClick={() => setShowPrices(!showPrices)}>
        <h1 className="font-bold text-2xl w-48 mt-10 mb-10">Shop By Price</h1>
      </div>
      {showPrices && (
        <div>
          <ul className="flex flex-col gap-3 text-sm mb-10 lg:text-base text-[#767676]">
            {priceList.map((item) => (
              <li
                key={item._id}
                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-gray-800 hover:border-gray-600 duration-300 ${activePrice === item._id ? ' text-red-600 border-gray-400' : ''
                  }`}
                onClick={() => filteredProductsByPriceRange(item.priceOne, item.priceTwo, item._id)}
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
