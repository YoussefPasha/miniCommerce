import Categories from "../../models/categories";

export const SET_CAT = "SET_CAT";

export const fetchCategories = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      if (!res.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await res.json();
      const loadedCategories = [];
      loadedCategories.push(new Categories("All", "All"));
      for (const key in resData) {
        loadedCategories.push(new Categories(resData[key], key.toString()));
      }
      dispatch({
        type: SET_CAT,
        categories: loadedCategories,
      });
    } catch (error) {
      throw error;
    }
  };
};
