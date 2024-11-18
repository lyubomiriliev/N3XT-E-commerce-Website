import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/nextSlice";
import { toast } from "react-toastify";
import Breadcrumbs from "./pageProps/Breadcrumbs";
import useFavorite from "../hooks/useFavorite";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Product = (view) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let [baseQuantity, setBaseQuantity] = useState(1);
  const [details, setDetails] = useState(null);
  const [lastSegment, setLastSegment] = useState("");

  const selectedSexCategory = useSelector((state) => state.next.sexCategory);
  const selectedSubheaderMenu = useSelector(
    (state) => state.next.headerSubmenu
  );
  const allProducts = useSelector((state) => state.next.allProducts);

  const [breadcrumbCategory, setBreadcrumbCategory] = useState("");

  console.log(details);

  useEffect(() => {
    const segments = location.pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    setLastSegment(lastSegment);

    const product = allProducts.find(
      (item) =>
        item.title.toLowerCase().split(" ").join("") === lastSegment ||
        item._id === lastSegment
    );

    if (product) {
      setDetails(product);
    } else {
      toast.error("Product not found");
      navigate(`/${selectedSexCategory}`);
    }

    if (selectedSubheaderMenu) {
      setBreadcrumbCategory(selectedSubheaderMenu);
    } else if (segments.length > 2) {
      setBreadcrumbCategory(segments[2]);
    }
  }, [location, selectedSubheaderMenu, allProducts]);

  const { isFavorite, handleFavoriteItem } = useFavorite(details);

  const handleAddToCart = () => {
    if (details) {
      dispatch(
        addToCart({
          _id: details._id,
          title: details.title,
          isNew: details.isNew,
          brand: details.brand,
          itemCategory: details.itemCategory,
          type: details.type,
          image: details.image,
          price: details.price,
          oldPrice: details.oldPrice,
          quantity: 1,
          description: details.description,
        })
      );
      toast.success(`${details.title} is added to the cart.`, {
        onClick: () => navigate("/cart"),
      });
    }
  };

  if (!details) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="w-full md:w-2/3 mx-auto flex flex-col justify-center items-center mt-28 md:mt-36">
      <div className="w-full flex justify-center items-center px-4 md:px-0 mx-auto">
        <Breadcrumbs />
      </div>
      {/* Product details */}
      <div className="w-full my-5 flex flex-col md:flex-row">
        {/* Product img */}
        <div className="w-full hidden rounded-md md:flex md:w-2/5 relative">
          <img
            className="w-auto h-[450px] md:h-full object-cover rounded-md"
            src={details?.image}
            alt="productImg"
          />
          <div>
            {details.isNew && (
              <div className="absolute top-4 left-0 bg-red-600 rounded-br-md rounded-tr-md text-white font-semibold px-6 py-1">
                <p>Sale</p>
              </div>
            )}
          </div>
          {isFavorite ? (
            <div
              onClick={handleFavoriteItem}
              className={`${
                view === "list"
                  ? "absolute top-4 left-4"
                  : "absolute md:top-0 top-0 bg-transparent cursor-pointer px-0 py-2 rounded-md right-2 md:right-3"
              }`}
            >
              <button>
                <FavoriteIcon />
              </button>
            </div>
          ) : (
            <div
              onClick={handleFavoriteItem}
              className={`${
                view === "list"
                  ? "absolute top-4 left-4"
                  : "absolute md:top-0 top-0 bg-transparent cursor-pointer px-0 py-2 rounded-md right-2 md:right-3"
              }`}
            >
              <button>
                <FavoriteBorderIcon />
              </button>
            </div>
          )}
        </div>
        {/* Product info */}
        <div className="w-full md:px-4 md:w-3/5 ml-5 md:ml-0 flex flex-col justify-center gap-6 md:gap-12">
          <div>
            <h2 className="text-xl md:text-4xl font-semibold">
              {details.title}
            </h2>

            <div className="flex items-center gap-4 mt-3"></div>
            {/* Product Image MOBILE */}
            <div className="w-full flex rounded-md md:hidden relative">
              <img
                className="w-auto h-80 rounded-md"
                src={details?.image}
                alt="productImg"
              />
              <div>
                {details.isNew && (
                  <div className="absolute top-4 left-0 bg-red-600 rounded-br-md rounded-tr-md text-white font-semibold px-6 py-1">
                    <p>Sale</p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center gap-2 mt-2">
              <p className="line-through text-gray-500">
                ${details.oldPrice * baseQuantity}
              </p>
              <p className="font-semibold">${details.price * baseQuantity}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <div className="flex">
              <StarOutlinedIcon />
              <StarOutlinedIcon />
              <StarOutlinedIcon />
              <StarOutlinedIcon />
              <StarOutlinedIcon />
            </div>
            <p className=" text-gray-500">(13 Customer Reviews)</p>
          </div>
          <div className="w-full flex flex-col justify-center gap-2">
            <p className="text-base text-gray-500">
              Category:{" "}
              <span className="font-medium capitalize">{details.category}</span>
            </p>
            <p className="text-base text-gray-500">
              Brand:{" "}
              <span className="font-medium capitalize">{details.brand}</span>
            </p>
            <p className="text-base text-gray-500">
              Type:{" "}
              <span className="font-medium capitalize">
                {details.itemCategory}
              </span>
            </p>
          </div>
          <p className="text-base text-gray-500 mt-3">{details.description}</p>
          <div className="flex gap-4">
            <div className="w-52 flex items-center justify-between rounded-md text-gray-500 gap-4 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() =>
                    setBaseQuantity(
                      baseQuantity === 1 ? (baseQuantity = 1) : baseQuantity - 1
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </button>
                <span>{baseQuantity}</span>
                <button
                  onClick={() => setBaseQuantity(baseQuantity + 1)}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-3 px-6 rounded-md active:bg-gray-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
