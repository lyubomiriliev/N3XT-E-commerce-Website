import { balenciagaLogo, balmainLogo, dsquaredLogo, lvLogo, versaceLogo } from "../../assets";

const Brands = () => {

    const brands = [
        {
            _id: 900,
            title: "Louis Vuitton",
            img: lvLogo,
        },
        {
            _id: 901,
            title: "Balenciaga",
            img: balenciagaLogo,
        },
        {
            _id: 902,
            title: "Versace",
            img: versaceLogo,
        },
        {
            _id: 903,
            title: "Balmain",
            img: balmainLogo,
        },
        {
            _id: 904,
            title: "Dsquared",
            img: dsquaredLogo,
        },
    ];


    return (
        <div className="flex flex-col max-w-screen-xl justify-center mx-auto">
            <div className="w-full  justify-center flex items-center mx-auto mb-10">
                {
                    brands.map((brand) => (
                        <div className="w-full mt-10 items-center" key={brand._id}>
                            <img className="w-28 h-auto" src={brand.img} alt="" />
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
