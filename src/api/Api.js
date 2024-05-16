import axios from "axios";
import {
  Bags,
  Belts,
  Boots,
  Formal,
  Hats,
  Hoodies,
  Jackets,
  Jeans,
  Mocassins,
  Sandals,
  Scarves,
  Sneakers,
  SportsShoes,
  Sunglasses,
  Watches,
} from "./fakeAPI/fakeAPI";

export async function productsData() {
  const products = await axios.get(
    "https://fakestoreapiserver.reactbd.com/products"
  );
  return products;
}

export async function allProductsData() {
  const products = await productsData();
  return [
    ...Bags.map((product) => ({ ...product, itemCategory: "bags" })),
    ...Jackets.map((product) => ({ ...product, itemCategory: "jackets" })),
    ...Hoodies.map((product) => ({ ...product, itemCategory: "hoodies" })),
    ...Jeans.map((product) => ({ ...product, itemCategory: "jeans" })),
    ...Formal.map((product) => ({ ...product, itemCategory: "formal" })),
    ...Boots.map((product) => ({ ...product, itemCategory: "boots" })),
    ...Mocassins.map((product) => ({ ...product, itemCategory: "mocassins" })),
    ...Sneakers.map((product) => ({ ...product, itemCategory: "sneakers" })),
    ...Sandals.map((product) => ({ ...product, itemCategory: "sandals" })),
    ...SportsShoes.map((product) => ({
      ...product,
      itemCategory: "sportShoes",
    })),
    ...Hats.map((product) => ({ ...product, itemCategory: "hats" })),
    ...Belts.map((product) => ({ ...product, itemCategory: "belts" })),
    ...Scarves.map((product) => ({ ...product, itemCategory: "scarves" })),
    ...Sunglasses.map((product) => ({
      ...product,
      itemCategory: "sunglasses",
    })),
    ...Watches.map((product) => ({ ...product, itemCategory: "watches" })),

    ...products.data,
  ];
}
