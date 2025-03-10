import { useSelector } from "react-redux";
import {
  balenciagaLogo,
  balmainLogo,
  dsquaredLogo,
  fendiLogo,
  givenchyLogo,
  gucciLogo,
  lvLogo,
  nextLogo,
  offWhiteLogo,
  versaceLogo,
} from "../../assets";

const Brands = () => {
  const selectedSexCategory = useSelector((state) => state.next.sexCategory);

  const womenBrands = [
    {
      _id: 900,
      title: "Louis Vuitton",
      img: lvLogo,
    },
    {
      _id: 901,
      title: "Prada",
      img: balenciagaLogo,
    },
    {
      _id: 902,
      title: "Jacquemus",
      img: versaceLogo,
    },
    {
      _id: 903,
      title: "Miu Miu",
      img: balmainLogo,
    },
    {
      _id: 904,
      title: "Saint Laurent",
      img: dsquaredLogo,
    },
  ];

  const menBrands = [
    {
      _id: 600,
      title: "Fendi",
      img: fendiLogo,
    },
    {
      _id: 601,
      title: "Balenciaga",
      img: balenciagaLogo,
    },
    {
      _id: 602,
      title: "Gucci",
      img: gucciLogo,
    },
    {
      _id: 603,
      title: "Off-White",
      img: offWhiteLogo,
    },
    {
      _id: 604,
      title: "Givenchy",
      img: givenchyLogo,
    },
  ];

  return (
    <div className="flex flex-col max-w-screen-xl items-center mx-auto mt-36 md:mt-40 px-4 lg:px-0">
      <div className="w-full gap-4 flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl lg:text-3xl uppercase">
          We are offering a wide variety of{" "}
          <span className="text-indigo-600 font-bold">PREMIUM</span> brands.
        </h1>
        <span className="font-light text-sm lg:text-lg text-gray-600">
          Select your desired brand and explore our collections!
        </span>
        <div className="w-[90%] h-[1px] bg-gray-300"></div>
      </div>
      <div className="w-full grid grid-cols-3 lg:grid-cols-5 gap-10 p-6">
        {selectedSexCategory === "women"
          ? womenBrands.map((brand) => (
              <div className="w-full flex items-center" key={brand._id}>
                <div>
                  <img className="w-40" src={brand.img} alt="BrandLogo" />
                </div>
              </div>
            ))
          : menBrands.map((brand) => (
              <div
                className="w-full h-screen flex justify-center items-center"
                key={brand._id}
              >
                <img className="w-28 h-auto" src={brand.img} alt="BrandLogo" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Brands;
