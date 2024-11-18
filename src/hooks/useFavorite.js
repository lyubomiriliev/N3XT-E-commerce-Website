import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFavorite } from "../redux/nextSlice";
import { toast } from "react-toastify";

const useFavorite = (product) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product._id) {
      const storedFavoriteStatus = localStorage.getItem(
        `favorite-${product._id}`
      );
      if (storedFavoriteStatus) {
        setIsFavorite(JSON.parse(storedFavoriteStatus));
      }
    }
  }, [product]);

  const handleFavoriteItem = () => {
    if (!product) return;

    const updatedIsFavorite = !isFavorite;
    setIsFavorite(updatedIsFavorite);

    localStorage.setItem(
      `favorite-${product._id}`,
      JSON.stringify(updatedIsFavorite)
    );

    if (updatedIsFavorite) {
      dispatch(
        addToFavorites({
          _id: product._id,
          title: product.title,
          isNew: product.isNew,
          brand: product.brand,
          itemCategory: product.itemCategory,
          type: product.type,
          image: product.image,
          price: product.price,
          oldPrice: product.oldPrice,
          quantity: 1,
          description: product.description,
        })
      );
      toast.success(`${product.title} is added to favorites`, {
        onClick: () => navigate("/wishlist"),
      });
    } else {
      dispatch(removeFavorite(product._id));
      toast.error(`${product.title} is removed from favorites`, {});
    }
  };

  return { isFavorite, handleFavoriteItem };
};

export default useFavorite;
