import { useState } from "react";
import { useSelector } from "react-redux";

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
      _id: 954,
      priceOne: 3000,
      priceTwo: 50000,
    },
  ];


  const [showPrices, setShowPrices] = useState(true);

  const selectedSubheaderMenu = useSelector((state) => state.next.headerSubmenu)
  console.log(selectedSubheaderMenu.toLowerCase())

  const filteredProductsByPriceRange = (priceOne, priceTwo) => {
    const filteredProducts = products.filter((product) => product.price >= priceOne && product.price <= priceTwo && product.type === selectedSubheaderMenu.toLowerCase());
    setFilteredProducts(filteredProducts)
    setActivePrice(!activePrice)
    console.log(filteredProducts)
    console.log(activePrice)
  }



  return (

    <div className="cursor-pointer">
      <div onClick={() => setShowPrices(!showPrices)}>
        <h1 className="font-bold text-2xl w-48 mt-10 mb-10">Shop By Price</h1>
      </div>
      {showPrices && (
        <div>
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {priceList.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                onClick={() => filteredProductsByPriceRange(item.priceOne, item.priceTwo)}
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
