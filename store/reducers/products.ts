import { SET_PRODUCTS } from "../actions/products";

const initialState: any = {
  availableProducts: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
      };
  }
  return state;
};
