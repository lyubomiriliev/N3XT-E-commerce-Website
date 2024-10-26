import { useSelector } from "react-redux";
import { balenciagaLogo, balmainLogo, dsquaredLogo, fendiLogo, givenchyLogo, gucciLogo, lvLogo, offWhiteLogo, versaceLogo } from "../../assets";

const Brands = () => {

    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

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
        <div className="flex flex-col max-w-screen-xl justify-center mx-auto mt-28 md:mt-36">
            <div className="w-full  justify-center flex items-center mx-auto mb-10">

                {
                    selectedSexCategory === "women" ? (
                        womenBrands.map((brand) => (
                            <div className="w-full mt-10 items-center" key={brand._id}>
                                <img className="w-28 h-auto" src={brand.img} alt="BrandLogo" />
                            </div>
                        ))
                    ) : menBrands.map((brand) => (
                        <div className="w-full mt-10 items-center" key={brand._id}>
                            <img className="w-28 h-auto" src={brand.img} alt="BrandLogo" />
                        </div>
                    ))
                }
            </div>
            <div className="w-full flex justify-center">
                <h1 className="mt-10 text-2xl font-bold mb-5">FEATURED PRODUCTS</h1>
            </div>
        </div>
    )
}

export default Brands
