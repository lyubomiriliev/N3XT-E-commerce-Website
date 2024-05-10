import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand } from "../../../redux/nextSlice";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const checkedBrands = useSelector((state) => state.next.checkedBrands);

  const dispatch = useDispatch();

  const brands = [
    {
      _id: 900,
      title: "Louis Vuitton",
    },
    {
      _id: 901,
      title: "Balenciaga",
    },
    {
      _id: 902,
      title: "Versace",
    },
    {
      _id: 903,
      title: "Balmain",
    },
    {
      _id: 904,
      title: "Dsquared",
    },
  ];

  const handleToggleBrand = (brand) => {
    dispatch(toggleBrand(brand));
  };

  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => setShowBrands(!showBrands)}
      >
        <h1 className="font-bold text-2xl w-48 mt-10 mb-10">Shop by Brand</h1>
      </div>
      {showBrands && (
        <ul className="flex flex-col gap-4 text-sm lg:text-base">
          {brands.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={item._id}
                checked={checkedBrands.some((b) => b._id === item._id)}
                onChange={() => handleToggleBrand(item)}
              />
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Brand;
