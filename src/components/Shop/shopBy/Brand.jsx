import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand } from "../../../redux/nextSlice";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);

  const checkedBrands = useSelector((state) => state.next.checkedBrands);
  const selectedSexCategory = useSelector((state) => state.next.sexCategory)

  const dispatch = useDispatch();

  const menBrands = [
    {
      _id: 5500,
      title: "Fendi",
    },
    {
      _id: 5600,
      title: "Balenciaga",
    },
    {
      _id: 5700,
      title: "Gucci",
    },
    {
      _id: 5800,
      title: "Off-White",
    },
    {
      _id: 5900,
      title: "Givenchy",
    },
  ];

  const womenBrands = [
    {
      _id: 6500,
      title: "Louis Vuitton",
    },
    {
      _id: 6600,
      title: "Balenciaga",
    },
    {
      _id: 6700,
      title: "Versace",
    },
    {
      _id: 6800,
      title: "Balmain",
    },
    {
      _id: 6900,
      title: "Dsquared2",
    },
  ];

  const handleToggleBrand = (brandTitle) => {
    dispatch(toggleBrand(brandTitle));
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
          {selectedSexCategory === "women" ?
            womenBrands.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedBrands.some((b) => b.title === item.title)}
                  onChange={() => handleToggleBrand(item.title)}
                />
                {item.title}
              </li>
            ))
            : menBrands.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedBrands.some((b) => b.title === item.title)}
                  onChange={() => handleToggleBrand(item.title)}
                />
                {item.title}
              </li>

            ))
          }
        </ul>
      )}


    </div>
  );
};

export default Brand;
