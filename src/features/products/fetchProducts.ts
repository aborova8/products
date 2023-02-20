import axios from "axios";
import { ProductsType, ProductType } from "./productTypes";

export const fetchProducts = async (): Promise<ProductType[] | undefined> => {
  try {
    const { data } = await axios.get<ProductsType>(
      "https://dummyjson.com/products"
    );
    return data?.products ?? [];
  } catch (err) {
    console.log("Error on API call", err);
  }
};
