import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  favoriteProductData: [],
  checkedBrands: [],
  checkedCategorys: [],
  userInfo: null,
  error: null,
  sexCategory: "women",
  productCategory: "",
  headerSubmenu: "",
  allProducts: [],
};

export const nextSlice = createSlice({
  name: "next",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    addToFavorites: (state, action) => {
      const item = state.favoriteProductData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.favoriteProductData.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    removeFavorite: (state, action) => {
      state.favoriteProductData = state.favoriteProductData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    resetFavorites: (state) => {
      state.favoriteProductData = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        state.productData = state.productData.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        item.quantity--;
      }
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleBrand: (state, action) => {
      const brandTitle = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b.title === brandTitle
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b.title !== brandTitle
        );
      } else {
        state.checkedBrands.push({ title: brandTitle });
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },
    setSexCategory: (state, action) => {
      state.sexCategory = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    setHeaderSubmenu: (state, action) => {
      state.headerSubmenu = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const {
  addToCart,
  addToFavorites,
  deleteItem,
  removeFavorite,
  resetCart,
  resetFavorites,
  incrementQuantity,
  decrementQuantity,
  addUser,
  removeUser,
  toggleCategory,
  toggleBrand,
  setSexCategory,
  setProductCategory,
  setHeaderSubmenu,
  setAllProducts,
  setError,
  clearError,
} = nextSlice.actions;
export default nextSlice.reducer;
