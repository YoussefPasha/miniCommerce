import { SET_CAT } from "../actions/categories";

const initialState: any = {
  categories: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CAT:
      return {
        categories: action.categories,
      };
  }
  return state;
};
