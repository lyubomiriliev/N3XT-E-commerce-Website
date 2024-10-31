import { useDispatch, useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  addToFavorites,
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  removeFavorite,
  resetCart,
} from "../redux/nextSlice";
import { ToastContainer, toast } from "react-toastify";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CartItem = () => {
  const dispatch = useDispatch();
  const selectedSexCategory = useSelector((state) => state.next.sexCategory);
  const productData = useSelector((state) => state.next.productData);
  const navigate = useNavigate();

  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    const initialFavorites = {};
    productData.forEach((item) => {
      const storedValue = localStorage.getItem(`favorite-${item._id}`);
      initialFavorites[item._id] = storedValue
        ? JSON.parse(storedValue)
        : false;
    });

    setFavoriteStatus(initialFavorites);
  }, [productData]);

  const handleFavoriteItem = (item) => {
    const updatedIsFavorite = !favoriteStatus[item._id];
    setFavoriteStatus((prevState) => ({
      ...prevState,
      [item._id]: updatedIsFavorite,
    }));

    localStorage.setItem(
      `favorite-${item._id}`,
      JSON.stringify(updatedIsFavorite)
    );

    if (updatedIsFavorite) {
      dispatch(
        addToFavorites({
          _id: item._id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: 1,
          description: item.description,
        })
      );
      toast.success(`${item.title} is added to favorites`, {
        onClick: () => navigate("/wishlist"),
      });
    } else {
      dispatch(removeFavorite(item._id));
      toast.error(`${item.title} is removed from favorites`);
    }
  };

  return (
    <div className="w-full justify-center items-center md:items-start flex flex-col px-4 md:px-0">
      <div className="w-full justify-center items-center mx-auto">
        {productData.length > 0 ? (
          <h2 className="text-2xl uppercase">
            Shopping Cart ({productData.length}){" "}
          </h2>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <h1 className="md:text-2xl text-lg text-center flex justify-center items-center text-black">
              Your cart is empty. Please go back to shopping and add products to
              the cart.
            </h1>
            <Link to={`/${selectedSexCategory}`}>
              <button className="mt-8 flex items-center gap-1 text-gray-400 hover:text-black duration-300 ">
                <span>
                  <KeyboardBackspaceOutlinedIcon />
                </span>
                Back to shop
              </button>
            </Link>
          </div>
        )}
      </div>
      <div>
        {productData.map((item) => (
          <div
            key={item._id}
            className="flex flex-col w-full justify-between py-4"
          >
            <div className="flex items-center relative">
              <div
                onClick={() =>
                  navigate(
                    `/product/${item.title.toLowerCase().split(" ").join("")}`
                  )
                }
                className="border border-gray-100 rounded-md overflow-hidden"
              >
                <img
                  className="w-60 object-cover hover:scale-125 duration-300 ease-in-out"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="w-full p-2 flex gap-2 flex-col">
                <h2 className="text-base font-bold">{item.title}</h2>
                <p className="text-xs font-bold text-gray-500">
                  Category: <span className="uppercase">{item.type}</span>
                </p>
                <p className="text-xs font-bold text-gray-500">
                  Brand: {item.brand}
                </p>
                <p className="text-xs font-bold w-2/3 text-gray-500">Size: M</p>
                <p className="text-xs font-bold w-2/3 text-gray-500">
                  Color: Beige
                </p>
              </div>
              <div className="flex flex-col absolute right-0 bottom-2 ">
                <p className="text-gray-400 line-through">${item.oldPrice}</p>
                <p>${item.price}</p>
              </div>
            </div>
            <div className="w-full mt-2 flex justify-between items-center">
              <div className="w-1/3 gap-2 rounded-md px-2 md:px-4 flex justify-center items-center">
                <span className="text-sm md:text-base">Quantity:</span>
                <div className="gap-1 flex justify-center items-center">
                  <button
                    onClick={() =>
                      dispatch(
                        decrementQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                          description: item.description,
                        })
                      )
                    }
                    className="flex items-center justify-center px-2 hover:bg-gray-200 rounded-md hover:text-black cursor-pointer duration-300 active:bg-black"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        incrementQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                          description: item.description,
                        })
                      )
                    }
                    className="flex items-center justify-center px-2 hover:bg-gray-200 rounded-md hover:text-black cursor-pointer duration-300 active:bg-black"
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                onClick={() => handleFavoriteItem(item)}
                className="hover:bg-gray-100 rounded-md cursor-pointer px-2 md:px-4
                             py-2 gap-1 flex justify-center items-center"
              >
                <button>
                  {favoriteStatus[item._id] ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </button>
                <span className="text-sm md:text-base">
                  {favoriteStatus[item._id]
                    ? "Added to Favorites"
                    : "Add to Favorites"}
                </span>
              </div>
              <div
                onClick={() =>
                  dispatch(deleteItem(item._id)) &
                  toast.error(`${item.title} is removed`)
                }
                className="hover:bg-gray-100 rounded-md cursor-pointer px-2 md:px-4
                             py-2 gap-1 flex justify-center items-center"
              >
                <button className="text-sm">
                  <CloseOutlinedIcon />
                </button>
                <span className="text-sm md:text-base">Remove</span>
              </div>
            </div>
          </div>
        ))}
        <div>
          {productData.length > 2 ? (
            <button
              onClick={() =>
                dispatch(resetCart()) & toast.error("Your cart is empty!")
              }
              className="bg-red-500 text-white text-sm md:text-base px-4 rounded-md uppercase mt-2 py-2 hover:bg-red-800"
            >
              Remove all
            </button>
          ) : null}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartItem;
