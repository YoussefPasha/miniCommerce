import Product from "../../models/product";

export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await res.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].title,
            resData[key].image,
            resData[key].description,
            resData[key].price,
            resData[key].category
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (error) {
      throw error;
    }
  };
};
