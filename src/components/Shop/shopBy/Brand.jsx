import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand } from "../../../redux/nextSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import useDeviceDetect from "../../../hooks/useDeviceDetect";

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);

  const checkedBrands = useSelector((state) => state.next.checkedBrands);
  const selectedSexCategory = useSelector((state) => state.next.sexCategory)

  const dispatch = useDispatch();

  const isMobile = useDeviceDetect();

  useEffect(() => {
    if (isMobile) {
      setShowBrands(false)
    }
  }, [isMobile])

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
    <div className="flex justify-center md:flex-col">
      <div
        className="cursor-pointer"
        onClick={() => setShowBrands(!showBrands)}>
        <div className="flex items-center">
          <h1 className="font-bold text-sm md:text-2xl w-28 md:w-48 my-2">Filter by Brand</h1>
          <RiArrowDropDownLine className="font-bold text-4xl" />
        </div>
      </div>
      {showBrands && (
        <ul className="flex md:flex-col gap-4 text-sm lg:text-base">
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
